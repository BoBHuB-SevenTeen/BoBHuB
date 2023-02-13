import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { PostComment } from '../../../type/commentType';
import { NullableNum } from '../../../type/utilType';
import { patchComment } from '../foodDetailApi';
import * as S from '../styles/textAreaStyle';

interface TextAreaProps {
  commentId: number;
  shopId: number;
  commentStar: NullableNum;
  content: string;
  canRevise: boolean;
  updateRevise: (x: boolean) => void;
  updateReadOnly: (x: boolean) => void;
}

const TextArea = ({
  commentId,
  shopId,
  commentStar,
  content,
  canRevise,
  updateRevise,
  updateReadOnly,
}: TextAreaProps) => {
  const [textValue, setTextValue] = useState<string>(content);
  const mutateComment = useMutation(patchComment);
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const reviseEnd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (textValue === '') {
      alert('댓글을 입력해주세요');
      return;
    }
    if (commentStar === null) {
      alert('별점을 입력해주세요');
      return;
    }
    const reviseComment = {
      star: commentStar,
      content: textValue,
    };

    mutateComment.mutate(
      { comment: reviseComment, commentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['comment', shopId], { exact: true });
        },
        onError: () => {
          alert('요청에 실패하였습니다.');
        },
      },
    );
    updateRevise(false);
    updateReadOnly(true);
  };

  return (
    <S.TextContainer>
      <S.CommentArea
        value={textValue}
        onChange={handleChange}
        disabled={!canRevise}
        maxLength={100}
      />
      {canRevise && <S.Button onClick={reviseEnd}>수정완료</S.Button>}
    </S.TextContainer>
  );
};

export default React.memo(TextArea);
