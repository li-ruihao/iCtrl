/*
 * Copyright (c) 2021-2023 iCtrl Developers
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to
 *  deal in the Software without restriction, including without limitation the
 *  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 *  sell copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 *  IN THE SOFTWARE.
 */

import {SvgIcon} from '@mui/material';
import React from 'react';

export const ShortcutIcon = (props) => {
  return (
      <SvgIcon {...props}>
        <path
            d="M21,11l-6-6v5H8c-2.76,0-5,2.24-5,5v4h2v-4c0-1.65,1.35-3,3-3h7v5L21,11z"/>
      </SvgIcon>
  );
};

export const DensityIcon = (props) => {
  return (
      <SvgIcon {...props}>
        <path d="M21,8H3V4h18V8z M21,10H3v4h18V10z M21,16H3v4h18V16z"/>
      </SvgIcon>
  );
};

export const DensityCompactIcon = (props) => {
  return (
      <SvgIcon {...props}>
        <path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"/>
      </SvgIcon>
  );
};

export const DensityStandardIcon = (props) => {
  return (
      <SvgIcon {...props}>
        <path d="M21,8H3V4h18V8z M21,10H3v4h18V10z M21,16H3v4h18V16z"/>
      </SvgIcon>
  );
};

export const DensityComfortableIcon = (props) => {
  return (
      <SvgIcon {...props}>
        <path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"/>
      </SvgIcon>
  );
};

// Reference: https://materialdesignicons.com/api/download/icon/svg/DCD0A183-A5DC-43BD-BC48-8FFF0CA0FA9C
export const ConsoleIcon = (props) => {
  return (
      <SvgIcon {...props}>
        <path
            d="M20,19V7H4V19H20M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5C2,3.89 2.9,3 4,3H20M13,17V15H18V17H13M9.58,13L5.57,9H8.4L11.7,12.3C12.09,12.69 12.09,13.33 11.7,13.72L8.42,17H5.59L9.58,13Z"/>
      </SvgIcon>
  );
};

// Reference: https://materialdesignicons.com/api/download/icon/svg/A237199B-0B22-475F-93D1-DB45FA4D3205
export const RemoteDesktopIcon = (props) => {
  return (
      <SvgIcon {...props}>
        <path
            d="M3,2A2,2 0 0,0 1,4V16C1,17.11 1.9,18 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4A2,2 0 0,0 21,2M3,4H21V16H3M15,5L11.5,8.5L15,12L16.4,10.6L14.3,8.5L16.4,6.4M9,8L7.6,9.4L9.7,11.5L7.6,13.6L9,15L12.5,11.5"/>
      </SvgIcon>
  );
};

// Reference: https://fonts.gstatic.com/s/i/materialiconsoutlined/folder_open/v12/24px.svg
export const FileManagerIcon = (props) => {
  return (
      <SvgIcon {...props}>
        <path
            d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
      </SvgIcon>
  );
};

export const IPv6Icon = (props) => {
  return (
      <SvgIcon viewBox={'0 0 512 512'} {...props}>
        <g>
          <path fill="#00BF38"
                d="M256.281,498.5c-99.684,0.155-180.9-80.795-181.052-180.481c-0.011-12.94,1.369-25.977,4.141-38.74   c0.162-0.744,0.525-2.327,0.525-2.327c0.146-0.726,0.79-3.644,0.952-4.325c0.141-0.609,24.71-111.25,24.863-111.953   c0.145-0.671,9.343-42.157,9.521-42.917C128.438,57.407,187.299,13.604,255.522,13.5c68.28-0.11,127.296,43.554,140.639,103.936   c0.169,0.688,5.159,22.867,5.328,23.623c0.162,0.669,29.035,128.858,29.035,128.858c0.167,0.758,0.346,1.517,0.498,2.273   l0.947,4.135c0.188,0.815,0.373,1.617,0.545,2.441c2.81,12.735,4.233,25.744,4.256,38.684   C436.928,417.122,355.955,498.364,256.281,498.5z"/>
          <path fill="#FFFFFF"
                d="M255.902,244.089c-40.603,0-73.646,33.052-73.646,73.662c0,40.6,33.044,73.63,73.646,73.63   c40.608,0,73.642-33.03,73.642-73.63C329.544,277.141,296.511,244.089,255.902,244.089z M231.967,259.267   c-3.593,5.248-6.675,11.689-9.101,19.035H206.57C213.243,269.973,221.969,263.356,231.967,259.267z M199.765,288.766h20.26   c-1.617,7.345-2.63,15.323-2.933,23.745h-24.158C193.638,303.999,196.041,295.996,199.765,288.766z M199.765,346.693   c-3.724-7.199-6.127-15.237-6.831-23.715h24.158c0.303,8.413,1.315,16.401,2.933,23.715H199.765z M206.563,357.178h16.303   c2.426,7.354,5.508,13.788,9.101,19.022C221.969,372.089,213.243,365.479,206.563,357.178z M250.674,379.646   c-6.209-2.943-12.272-10.889-16.657-22.468h16.657V379.646z M250.674,346.693h-19.892c-1.744-7.091-2.882-15.056-3.206-23.715   h23.098V346.693z M250.674,312.511h-23.098c0.324-8.666,1.473-16.649,3.206-23.745h19.892V312.511z M250.674,278.302h-16.65   c4.378-11.59,10.447-19.538,16.65-22.48V278.302z M312.029,288.766c3.74,7.23,6.139,15.233,6.831,23.745h-24.174   c-0.282-8.422-1.29-16.4-2.923-23.745H312.029z M305.213,278.302h-16.296c-2.415-7.346-5.491-13.787-9.105-19.035   C289.82,263.356,298.551,269.973,305.213,278.302z M261.143,255.821c6.176,2.942,12.266,10.891,16.634,22.48h-16.634V255.821z    M261.143,288.766h19.854c1.743,7.096,2.896,15.079,3.225,23.745h-23.079V288.766z M261.143,322.979h23.079   c-0.329,8.659-1.481,16.624-3.225,23.715h-19.854V322.979z M261.143,379.646v-22.468h16.65   C273.408,368.757,267.318,376.702,261.143,379.646z M279.812,376.2c3.614-5.234,6.69-11.668,9.105-19.022h16.307   C298.551,365.479,289.82,372.089,279.812,376.2z M312.029,346.693h-20.266c1.633-7.313,2.641-15.302,2.923-23.715h24.174   C318.168,331.456,315.77,339.494,312.029,346.693z"/>
          <path fill="#FFFFFF"
                d="M255.902,173.122c-38.859,0-74.178,15.457-100.187,40.473c9.087-40.607,18.35-82.033,18.554-82.898   c7.048-33,41.371-56.926,81.633-56.926c40.289,0,74.634,24.036,81.709,57.269l5.731,25.62c1.462,6.488,7.897,10.601,14.403,9.115   c6.491-1.446,10.582-7.877,9.127-14.385l-5.706-25.487c-9.402-44.175-53.679-76.249-105.265-76.249   c-51.569,0-95.804,31.976-105.189,75.881c-35.378,158.137-36.002,160.92-36.002,160.92c-0.032,0.17-0.054,0.312-0.075,0.473   c-0.493,2.195-0.92,4.434-1.288,6.687c-0.042,0.277-0.104,0.543-0.157,0.812c-0.362,2.354-0.693,4.717-0.964,7.09   c-0.026,0.22-0.06,0.436-0.075,0.645c-0.255,2.316-0.449,4.66-0.596,7.01c-0.01,0.267-0.043,0.533-0.043,0.801   c-0.146,2.574-0.217,5.149-0.217,7.768c0,79.736,64.863,144.609,144.606,144.609c79.732,0,144.612-64.873,144.612-144.609   C400.515,237.991,335.635,173.122,255.902,173.122z M255.902,438.239c-66.443,0-120.496-54.058-120.496-120.502   c0-2.162,0.055-4.322,0.167-6.465c0.011-0.209,0.05-0.4,0.05-0.588c0.119-1.984,0.271-3.979,0.498-5.963   c0.01-0.119,0.036-0.232,0.036-0.344c0.222-2.049,0.515-4.094,0.85-6.141c0.012-0.146,0.044-0.314,0.082-0.456   c0.32-1.929,0.683-3.88,1.114-5.796c11.833-54.119,60.095-94.748,117.699-94.748c66.451,0,120.498,54.059,120.498,120.5   C376.4,384.182,322.354,438.239,255.902,438.239z"/>
        </g>
      </SvgIcon>
  );
};