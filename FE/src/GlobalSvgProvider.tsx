import { css } from '@emotion/react';
import { createPortal } from 'react-dom';

const spliteSvgCode = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    css={css`
      display: none;
    `}
  >
    <symbol id="close-circle" viewBox="0 0 40 40">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM13.0808 13.0642C14.2525 11.8928 16.152 11.893 17.3234 13.0647L19.9982 15.74L22.6696 13.0686C23.8412 11.897 25.7407 11.897 26.9122 13.0686C28.0838 14.2402 28.0838 16.1397 26.9122 17.3113L24.2404 19.9831L26.9154 22.6587C28.0869 23.8304 28.0867 25.7299 26.915 26.9013C25.7433 28.0728 23.8438 28.0726 22.6724 26.9009L19.9978 24.2257L17.3282 26.8953C16.1567 28.0668 14.2572 28.0668 13.0856 26.8953C11.914 25.7237 11.914 23.8242 13.0856 22.6526L15.7556 19.9826L13.0804 17.3069C11.9089 16.1352 11.9091 14.2357 13.0808 13.0642Z"
        fill="white"
      />
    </symbol>
    <symbol id="close" viewBox="0 0 24 25">
      <g id="Frame" clipPath="url(#clip0_289_791)">
        <path
          id="Vector"
          d="M23.4772 3.35322C24.1798 2.62789 24.0679 1.55056 23.2223 0.947888C22.3767 0.345222 21.1208 0.441222 20.4182 1.16656L11.9995 9.83322L3.58085 1.16656C2.87826 0.441222 1.62231 0.345222 0.77671 0.947888C-0.0688857 1.55056 -0.180803 2.62789 0.521788 3.35322L9.40676 12.4999L0.521788 21.6466C-0.180803 22.3719 -0.0688857 23.4492 0.77671 24.0519C1.62231 24.6546 2.87826 24.5586 3.58085 23.8332L11.9995 15.1666L20.4182 23.8332C21.1208 24.5586 22.3767 24.6546 23.2223 24.0519C24.0679 23.4492 24.1798 22.3719 23.4772 21.6466L14.5923 12.4999L23.4772 3.35322Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_289_791">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </symbol>
    <symbol id="script" viewBox="5 5 40 40">
      <path
        d="M31.5994 4.41999C30.7794 3.59999 29.3594 4.15999 29.3594 5.29999V12.28C29.3594 15.2 31.8394 17.62 34.8594 17.62C36.7594 17.64 39.3994 17.64 41.6594 17.64C42.7994 17.64 43.3994 16.3 42.5994 15.5C39.7194 12.6 34.5594 7.37999 31.5994 4.41999Z"
        fill="white"
      />
      <path
        d="M41 20.38H35.22C30.48 20.38 26.62 16.52 26.62 11.78V6C26.62 4.9 25.72 4 24.62 4H16.14C9.98 4 5 8 5 15.14V32.86C5 40 9.98 44 16.14 44H31.86C38.02 44 43 40 43 32.86V22.38C43 21.28 42.1 20.38 41 20.38ZM23 35.5H15C14.18 35.5 13.5 34.82 13.5 34C13.5 33.18 14.18 32.5 15 32.5H23C23.82 32.5 24.5 33.18 24.5 34C24.5 34.82 23.82 35.5 23 35.5ZM27 27.5H15C14.18 27.5 13.5 26.82 13.5 26C13.5 25.18 14.18 24.5 15 24.5H27C27.82 24.5 28.5 25.18 28.5 26C28.5 26.82 27.82 27.5 27 27.5Z"
        fill="white"
      />
    </symbol>
    <symbol id="next" viewBox="4 4 40 40">
      <path
        d="M7.51953 14.4401V33.5801C7.51953 37.5001 11.7795 39.9601 15.1795 38.0001L23.4795 33.2201L31.7795 28.4201C35.1795 26.4601 35.1795 21.5601 31.7795 19.6001L23.4795 14.8001L15.1795 10.0201C11.7795 8.06012 7.51953 10.5001 7.51953 14.4401Z"
        fill="white"
      />
      <path
        d="M40.4805 37.8601C39.6605 37.8601 38.9805 37.1801 38.9805 36.3601V11.6401C38.9805 10.8201 39.6605 10.1401 40.4805 10.1401C41.3005 10.1401 41.9805 10.8201 41.9805 11.6401V36.3601C41.9805 37.1801 41.3205 37.8601 40.4805 37.8601Z"
        fill="white"
      />
    </symbol>
  </svg>
);

export default function GlobalSVGProvider() {
  return createPortal(spliteSvgCode, document.body);
}
