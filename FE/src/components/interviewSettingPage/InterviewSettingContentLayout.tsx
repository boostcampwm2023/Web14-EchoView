import { Button } from '@foundation/index';
import { css } from '@emotion/react';
import { InterviewSettingFooter } from '@components/interviewSettingPage/interviewSettingFooter';

type InterviewSettingContentLayoutProps = {
  onPrevClick?: () => void;
  onNextClick?: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
  children?: React.ReactNode;
};
const InterviewSettingContentLayout: React.FC<
  InterviewSettingContentLayoutProps
> = ({ onPrevClick, onNextClick, disabledPrev, disabledNext, children }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
      `}
    >
      <div>{children}</div>
      <InterviewSettingFooter>
        <div
          css={css`
            display: flex;
            column-gap: 1rem;
          `}
        >
          <Button
            onClick={onPrevClick}
            size="lg"
            css={css`
              padding: 0.6rem 2rem;
            `}
            disabled={disabledPrev}
          >
            이전
          </Button>
          <Button
            onClick={onNextClick}
            size="lg"
            css={css`
              padding: 0.6rem 2rem;
            `}
            disabled={disabledNext}
          >
            다음
          </Button>
        </div>
      </InterviewSettingFooter>
    </div>
  );
};

export default InterviewSettingContentLayout;