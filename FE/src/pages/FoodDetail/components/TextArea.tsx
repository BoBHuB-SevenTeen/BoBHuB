import React from 'react';
import { useState } from 'react';
import { usePatchComment } from '../../../queries/comment/usePatchComment';
import { NullableNum } from '../../../type/utilType';
import * as S from '../styles/textAreaStyle';
import { inValidateText } from '../util/foodDetailUtil';

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

  const onSuccessCb = () => {
    updateRevise(false);
    updateReadOnly(true);
  };

  const onErrorCb = () => {
    alert('요청에 실패하였습니다.');
  };
  const { mutation: patchComment } = usePatchComment({ onSuccessCb, onErrorCb, shopId });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const reviseEnd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inValidateText(textValue, commentStar)) return;
    const reviseComment = {
      star: commentStar,
      content: textValue,
    };
    patchComment.mutate({ comment: reviseComment, commentId });
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
