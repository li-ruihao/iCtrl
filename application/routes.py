import json
import os
from datetime import datetime

from flask import request, abort

from application import app, profiles
from application.Connection import Connection
from application.SFTP import SFTP
from application.Term import Term, terminal_connections
from application.VNC import VNC
from application.paths import PRIVATE_KEY_PATH
from application.codes import ICtrlStep, ICtrlError

UPLOAD_CHUNK_SIZE = 1024 * 1024


def int_to_bytes(num):
    return bytes([num])


def get_session_info(session_id):
    if session_id not in profiles['sessions']:
        abort(403, f'failed: session {session_id} does not exist')
    host = profiles['sessions'][session_id]['host']
    username = profiles['sessions'][session_id]['username']
    this_private_key_path = os.path.join(PRIVATE_KEY_PATH, session_id)
    return host, username, this_private_key_path


@app.route('/profiles')
def get_profiles():
    return profiles.query()


@app.route('/session', methods=['POST', 'PATCH', 'DELETE'])
def handle_session():
    if request.method == 'POST':
        host = request.json.get('host')
        username = request.json.get('username')
        password = request.json.get("password")

        conn = Connection()

        status, reason = conn.connect(host, username, password)
        if status is False:
            abort(403, reason)

        session_id = profiles.add_session(host, username)
        this_private_key_path = os.path.join(PRIVATE_KEY_PATH, session_id)
        status, reason = conn.save_keys(this_private_key_path)
        if status is False:
            abort(500, reason)

        return 'success'
    elif request.method == 'PATCH':
        session_id = request.json.get('session_id')
        if session_id not in profiles['sessions']:
            abort(403, f'failed: session {session_id} does not exist')

        new_host = request.json.get('new_host')
        profiles.change_host(session_id, new_host)

        return 'success'
    elif request.method == 'DELETE':
        session_id = request.args.get('session_id')
        if session_id not in profiles['sessions']:
            abort(403, f'failed: session {session_id} does not exist')

        profiles.delete_session(session_id)
        return 'success'
    else:
        abort(405)


@app.route('/exec_blocking', methods=['POST'])
def exec_blocking():
    session_id = request.form.get('session_id')
    host, username, this_private_key_path = get_session_info(session_id)

    cmd = request.form.get('cmd')

    conn = Connection()
    status, reason = conn.connect(host, username, key_filename=this_private_key_path)
    if status is False:
        abort(403, description=reason)

    # TODO: test this
    status, _, stdout, stderr = conn.exec_command_blocking(cmd)
    if status is False:
        abort(500, 'exec failed')

    return '\n'.join(stdout) + '\n'.join(stderr)


@app.route('/terminal', methods=['POST'])
def start_terminal():
    session_id = request.json.get('session_id')
    host, username, this_private_key_path = get_session_info(session_id)

    term = Term()
    status, reason = term.connect(host=host, username=username, key_filename=this_private_key_path)
    if status is False:
        abort(403, description=reason)

    return term.id


@app.route('/terminal_resize', methods=['PATCH'])
def resize_terminal():
    session_id = request.json.get('session_id')
    host, username, this_private_key_path = get_session_info(session_id)

    term_id = request.json.get('term_id')
    if term_id not in terminal_connections:
        abort(403, description='invalid term_id')

    width = request.json.get('w')
    height = request.json.get('h')

    term = terminal_connections[term_id]
    status, reason = term.resize(width, height)
    if status is False:
        abort(403, description=reason)

    return 'success'


@app.route('/vnc', methods=['POST'])
def start_vnc():
    session_id = request.json.get('session_id')
    host, username, this_private_key_path = get_session_info(session_id)

    def generate():
        yield int_to_bytes(ICtrlStep.VNC.SSH_AUTH)
        vnc = VNC()
        status, reason = vnc.connect(host=host, username=username, key_filename=this_private_key_path)
        if status is False:
            print(reason)
            # FIXME: return corresponding code according to the reason
            yield int_to_bytes(ICtrlError.SSH.GENERAL)
            return

        yield int_to_bytes(ICtrlStep.VNC.CHECK_LOAD)

        yield int_to_bytes(ICtrlStep.VNC.PARSE_PASSWD)
        status, password = vnc.get_vnc_password()
        if not status:
            yield int_to_bytes(ICtrlError.VNC.PASSWD_MISSING)
            return

        yield int_to_bytes(ICtrlStep.VNC.LAUNCH_VNC)
        yield int_to_bytes(ICtrlStep.VNC.CREATE_TUNNEL)
        port = vnc.launch_web_vnc()

        yield int_to_bytes(ICtrlStep.VNC.DONE)
        result = {
            'port': port,
            'passwd': password
        }
        yield json.dumps(result)

    return app.response_class(generate(), mimetype='application/octet-stream')


@app.route('/vncpasswd', methods=['POST'])
def change_vncpasswd():
    session_id = request.json.get('session_id')
    host, username, this_private_key_path = get_session_info(session_id)

    vnc = VNC()
    status, reason = vnc.connect(host=host, username=username, key_filename=this_private_key_path)
    if status is False:
        abort(403, description=reason)

    passwd = request.json.get('passwd')
    status, reason = vnc.reset_vnc_password(passwd)
    if not status:
        abort(403, description=reason)

    return 'success'


@app.route('/sftp_ls/<session_id>')
def sftp_ls(session_id):
    host, username, this_private_key_path = get_session_info(session_id)

    sftp = SFTP()
    status, reason = sftp.connect(host=host, username=username, key_filename=this_private_key_path)
    if status is False:
        abort(403, description=reason)

    path = request.args.get('path')
    status, cwd, file_list = sftp.ls(path)
    if status is False:
        abort(400, description=cwd)

    result = {
        'status': status,
        'cwd': cwd,
        'files': file_list
    }
    return json.dumps(result)


@app.route('/sftp_dl/<session_id>')
def sftp_dl(session_id):
    host, username, this_private_key_path = get_session_info(session_id)

    sftp = SFTP()
    status, reason = sftp.connect(host=host, username=username, key_filename=this_private_key_path)
    if status is False:
        abort(403, description=reason)

    cwd = request.args.get('cwd')
    files = json.loads(request.args.get('files'))

    sftp.sftp.chdir(cwd)

    zip_mode = True
    size = 0
    if len(files) == 1:
        is_reg, size = sftp.reg_size(files[0])
        zip_mode = not is_reg

    if zip_mode:
        r = app.response_class(sftp.zip_generator(cwd, files), mimetype='application/zip')
        dt_str = datetime.now().strftime('_%Y%m%d_%H%M%S')
        zip_name = os.path.basename(cwd) + dt_str + '.zip'
        r.headers.set('Content-Disposition', 'attachment', filename=zip_name)
    else:
        r = app.response_class(sftp.dl_generator(files[0]), mimetype='application/octet-stream')
        r.headers.set('Content-Disposition', 'attachment', filename=files[0])
        r.headers.set('Content-Length', size)

    return r


@app.route('/sftp_rename/<session_id>', methods=['PATCH'])
def sftp_rename(session_id):
    host, username, this_private_key_path = get_session_info(session_id)

    sftp = SFTP()
    status, reason = sftp.connect(host=host, username=username, key_filename=this_private_key_path)
    if status is False:
        abort(403, description=reason)

    cwd = request.json.get('cwd')
    old = request.json.get('old')
    new = request.json.get('new')

    status, reason = sftp.rename(cwd, old, new)
    if not status:
        abort(400, reason)

    return 'success'


@app.route('/sftp_ul/<session_id>', methods=['POST'])
def sftp_ul(session_id):
    host, username, this_private_key_path = get_session_info(session_id)

    sftp = SFTP()
    status, reason = sftp.connect(host=host, username=username, key_filename=this_private_key_path)
    if status is False:
        abort(403, description=reason)

    path = request.headers.get('Path')
    # no need to use secure_filename because the user should be responsible for her/his input
    #  when not using the client
    request_filename = request.headers.get('Filename')
    if request_filename == '':
        abort(400, 'Empty file handle')

    sftp.sftp.chdir(path=path)
    sftp_file = sftp.file(filename=request_filename)

    chunk = request.stream.read(UPLOAD_CHUNK_SIZE)
    while len(chunk) != 0:
        sftp_file.write(chunk)
        chunk = request.stream.read(UPLOAD_CHUNK_SIZE)

    sftp_file.close()

    return 'success'


@app.route('/sftp_rm/<session_id>', methods=['POST'])
def sftp_rm(session_id):
    host, username, this_private_key_path = get_session_info(session_id)

    sftp = SFTP()
    status, reason = sftp.connect(host=host, username=username, key_filename=this_private_key_path)
    if status is False:
        abort(403, description=reason)

    cwd = request.json.get('cwd')
    files = request.json.get('files')

    status, reason = sftp.rm(cwd, files)
    if not status:
        abort(400, description=reason)

    return 'success'
