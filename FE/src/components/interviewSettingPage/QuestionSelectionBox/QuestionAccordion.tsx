import { QuestionAnswerSelectionModal } from '@/atoms/modal';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@/components/foundation/Accordion';
import Icon from '@/components/foundation/Icon/Icon';
import { LeadingDot } from '@/components/foundation/LeadingDot/LeadingDot';
import Typography from '@/components/foundation/Typography/Typography';
import { QUERY_KEY } from '@/constants/queryKey';
import useSelectQuestions from '@/hooks/atoms/useSelectQuestions';
import { theme } from '@/styles/theme';
import { Question } from '@/types/question';
import { User } from '@/types/user';
import { css } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

type QuestionAccordionProps = {
  question: Question;
  categoryId: number;
};

const selectedStyle = css`
  background-color: ${theme.colors.point.secondary.default};
  color: ${theme.colors.text.white};
`;

const QuestionAccordion: React.FC<QuestionAccordionProps> = ({
  question,
  categoryId,
}) => {
  const { isSelected, toggleSelected } = useSelectQuestions({
    question: question,
    categoryId: categoryId,
  });
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<User | undefined>(QUERY_KEY.MEMBER);

  const setModal = useSetRecoilState(QuestionAnswerSelectionModal);

  const handleEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModal({
      isOpen: true,
      question: question,
      categoryId: categoryId,
    });
  };

  const handleEditGuestUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('로그인 후 이용해 주세요');
  };

  return (
    <Accordion
      onChange={toggleSelected}
      expanded={isSelected}
      css={css`
        margin-bottom: 1.2rem;
      `}
    >
      <AccordionSummary
        css={[
          css`
            background-color: ${theme.colors.surface.default};
          `,
          isSelected && selectedStyle,
        ]}
      >
        <Typography noWrap variant="body3">
          {question.questionContent}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <LeadingDot>
          <Typography noWrap variant="body3">
            {question.answerContent}
          </Typography>
        </LeadingDot>
        <Icon
          id="edit"
          css={css`
            flex-shrink: 0;
          `}
          width="2rem"
          height="2rem"
          onClick={userInfo ? handleEditModal : handleEditGuestUser}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionAccordion;
