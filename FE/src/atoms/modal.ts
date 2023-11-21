import { Question } from '@/types/question';
import { atom } from 'recoil';

export const QuestionAnswerSelectionModal = atom<{
  isOpen: boolean;
  question?: Question;
}>({
  key: 'questionAnswerSelectionModal',
  default: {
    isOpen: false,
  },
});
