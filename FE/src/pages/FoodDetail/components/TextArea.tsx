import React from 'react';
import { useState } from 'react';
import { NullableNum } from '../../../type/utilType';
import { patchComment } from '../foodDetailApi';
import * as S from '../styles/textAreaStyle';

interface TextAreaProps {
  commentId: number;
  commentStar: NullableNum;
  content: string;
  canRevise: boolean;
  updateRevise: (x: boolean) => void;
  updateReadOnly: (x: boolean) => void;
}

const TextArea = ({
  commentId,
  commentStar,
  content,
  canRevise,
  updateRevise,
  updateReadOnly,
}: TextAreaProps) => {
  const [textValue, setTextValue] = useState<string>(content);

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

    await patchComment(reviseComment, commentId);
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
