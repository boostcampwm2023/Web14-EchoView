import { StartButton } from '@common/index';
import {
  GoogleLoginButton,
  LandingImage,
  LandingPageLayout,
  WelcomeBlurb,
} from '@components/landingPage';
import { css } from '@emotion/react';
import { toast } from '@foundation/Toast/toast';

const LandingPage: React.FC = () => {
  toast.success('adasdfsdfs', { autoClose: false });
  return (
    <LandingPageLayout>
      <WelcomeBlurb />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 2rem;
        `}
      >
        <StartButton />
        <GoogleLoginButton />
      </div>
      <LandingImage />
    </LandingPageLayout>
  );
};

export default LandingPage;
