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
  </svg>
);

export default function GlobalSVGProvider() {
  return createPortal(spliteSvgCode, document.body);
}