import Box from '@/components/foundation/Box/Box';
import Button from '@/components/foundation/Button/Button';
import InputArea from '@/components/foundation/InputArea/InputArea';
import Typography from '@/components/foundation/Typography/Typography';
import useQuestionAnswerMutation from '@/hooks/mutations/useQuestionAnswerMutation';
import { css } from '@emotion/react';
import { useState } from 'react';

type AnswerFormProps = {
  questionId: number;
  question: string;
};

const AnswerForm: React.FC<AnswerFormProps> = ({ questionId, question }) => {
  const [customAnswer, setCustomAnswer] = useState('');
  const { mutate } = useQuestionAnswerMutation(questionId, customAnswer);

  const handleCustomAnswerChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCustomAnswer(e.target.value);
  };

  const handleCustomAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-bottom: 1.5rem;
      `}
      onSubmit={handleCustomAnswerSubmit}
    >
      <Box
        css={css`
          padding: 1rem;
          margin-bottom: 1.5rem;
        `}
      >
        <Typography>{question}</Typography>
      </Box>

      <InputArea onChange={handleCustomAnswerChange} value={customAnswer} />
      <Button
        type="submit"
        size="sm"
        css={css`
          margin-top: 1rem;
          margin-left: auto;
        `}
      >
        답변 추가하기
      </Button>
    </form>
  );
};

export default AnswerForm;
