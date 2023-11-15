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
  </svg>
);

export default function GlobalSVGProvider() {
  return createPortal(spliteSvgCode, document.body);
}
