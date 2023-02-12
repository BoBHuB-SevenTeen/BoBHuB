import { Button, Typography, Rating } from '@mui/material';
import React, { useState } from 'react';
import { postComment } from '../foodDetailApi';
import type { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { canWriteComment } from '../util/foodDetailUtil';
import * as S from '../styles/commentStyle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostComment } from '../../../type/commentType';

interface commnetProps {
  shopId: number | undefined;
  scrollRef: React.RefObject<HTMLElement>;
}

type createCommentType = React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>;

const Comment = ({ shopId, scrollRef }: commnetProps) => {
  const [content, setContent] = useState<string>('');
  const [starValue, setStarValue] = useState<number | null>(5);
  const isLogin = useSelector<RootState>((state) => state.loginReducer.isLogin) as boolean;
  const mutateParty = useMutation((comment: PostComment) => postComment(comment));
  const queryClient = useQueryClient();

  const ratingChange = (e: React.SyntheticEvent, newValue: number | null) => setStarValue(newValue);
  const fieldChange = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  const createComment = async (e: createCommentType) => {
    e.preventDefault();
    if (canWriteComment(isLogin, content, starValue)) return;
    const newComment = {
      shopId,
      content,
      star: starValue,
    };

    mutateParty.mutate(newComment, {
      onSuccess: () => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        setContent('');
        queryClient.invalidateQueries(['comment', shopId]);
      },
      onError: () => {
        alert('댓글을 이미 작성하셨습니다.');
      },
    });
  };

  return (
    <S.CommentContainer onSubmit={createComment}>
      <S.RatingContainer>
        <Typography component="legend">식당은 어땠나요?</Typography>
        <Rating name="simple-controlled" value={starValue} onChange={ratingChange} />
      </S.RatingContainer>
      <S.CommentField
        id="outlined-basic"
        label="댓글을 입력하세요"
        variant="outlined"
        value={content}
        onChange={fieldChange}
      />
      <Button variant="outlined" onClick={createComment}>
        Enter
      </Button>
    </S.CommentContainer>
  );
};

export default React.memo(Comment);
