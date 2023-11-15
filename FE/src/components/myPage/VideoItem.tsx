import Typography from '@foundation/Typography/Typography';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import React from 'react';

type VideoItemProps = {
  children?: React.ReactNode;
  videoName: string;
  date: string;
};

const VideoItem: React.FC<VideoItemProps> = ({ children, videoName, date }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      {children}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding: 1rem;
        `}
      >
        <Typography variant="body2">{videoName}</Typography>
        <div
          css={css`
            align-self: flex-end;
          `}
        >
          <Typography variant="body3" color={theme.colors.text.subStrong}>
            {date}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;