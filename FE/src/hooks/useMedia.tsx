import { useRecoilState } from 'recoil';
import {
  connectStatusState,
  mediaState,
  selectedMimeTypeState,
} from '@atoms/media';
import { useCallback, useEffect, useRef } from 'react';
import { closeMedia, getMedia, getSupportedMimeTypes } from '@/utils/media';
import useModal from '@hooks/useModal';
import { MediaDisconnectedModal } from '@components/interviewPage/InterviewModal';

const useMedia = () => {
  const [media, setMedia] = useRecoilState(mediaState);
  const [connectStatus, setConnectStatus] = useRecoilState(connectStatusState);

  const [selectedMimeType, setSelectedMimeType] = useRecoilState(
    selectedMimeTypeState
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  const { openModal, closeModal } = useModal(() => {
    return <MediaDisconnectedModal closeModal={closeModal} />;
  });

  const startMedia = useCallback(async () => {
    try {
      const newMedia = await getMedia();
      setMedia(newMedia);
      setConnectStatus('connect');
      if (videoRef.current) videoRef.current.srcObject = newMedia;
    } catch (e) {
      setConnectStatus('fail');
      openModal();
    }
  }, [openModal, setConnectStatus, setMedia]);

  const connectVideo = useCallback(() => {
    if (videoRef.current) videoRef.current.srcObject = media;
    setConnectStatus('connect');
  }, [media, setConnectStatus]);

  const stopMedia = useCallback(() => {
    if (media) {
      closeMedia(media);
      setMedia(null);
      setConnectStatus('pending');
    }
  }, [media, setConnectStatus, setMedia]);

  useEffect(() => {
    const mimeTypes = getSupportedMimeTypes();
    if (mimeTypes.length > 0) setSelectedMimeType(mimeTypes[0]);
  }, [setSelectedMimeType]);

  useEffect(() => {
    const mediaStream = videoRef.current?.srcObject;
    if (mediaStream instanceof MediaStream) {
      const checkStream = () => {
        if (!mediaStream.active) {
          setConnectStatus('pending');

          mediaStream.removeEventListener('inactive', checkStream);
        }
      };

      mediaStream.addEventListener('inactive', checkStream);
    }
  }, [videoRef, media, setConnectStatus]);

  return {
    media,
    videoRef,
    connectStatus,
    selectedMimeType,
    startMedia,
    stopMedia,
    connectVideo,
  };
};

export default useMedia;
