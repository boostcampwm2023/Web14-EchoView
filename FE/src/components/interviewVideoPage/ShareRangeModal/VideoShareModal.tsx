import { truncateText } from '@/utils/textUtils';
import { css } from '@emotion/react';
import Modal from '@foundation/Modal';
import { Typography } from '@foundation/index';
import useToggleVideoPublicMutation from '@hooks/apis/mutations/useToggleVideoPublicMutation';
import ShareRangeSetting from './ShareRangeSetting';
import VideoShareModalFooter from './VideoShareModalFooter';

type VideoShareModalProps = {
  videoId: number;
  videoName: string;
  hash: string | null;
  isOpen: boolean;
  closeModal: () => void;
};
const VideoShareModal: React.FC<VideoShareModalProps> = ({
  videoId,
  videoName,
  hash,
  isOpen,
  closeModal,
}) => {
  const { mutate, data, isPending } = useToggleVideoPublicMutation(videoId);

  const handleVideoShareToggleClick = () => {
    mutate();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 1.5rem;
          padding: 1.5rem;
        `}
      >
        <Typography variant="title3">
          {`"${truncateText(videoName, 15)}" 공유`}
        </Typography>
        {isPending ? (
          '로딩중' //TODO 디자인은 임시입니다.
        ) : (
          <ShareRangeSetting
            isPublic={!!hash}
            onClick={handleVideoShareToggleClick}
          />
        )}
        <VideoShareModalFooter hash={hash} closeModal={closeModal} />
      </div>
    </Modal>
  );
};

export default VideoShareModal;