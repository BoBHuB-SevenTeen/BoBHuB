import { Avatar, Typography, Rating } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { useCallback, useState } from 'react';
import TextArea from './TextArea';
import React from 'react';
import type { Tcomment } from '../../../type/commentType';
import * as S from '../styles/commentListStyle';
import useUser from './../../../queries/useUserQuery';
import { useDeleteComment } from '../../../queries/comment/useDeleteComment';

interface CommentList {
  commentProp: Tcomment;
  shopId: number;
}

const CommentList = ({
  commentProp: { commentId, userId, content, star, profile, nickname },
  shopId,
}: CommentList) => {
  const [canRevise, setRevise] = useState<boolean>(false);
  const [canReadOnly, setReadOnly] = useState<boolean>(true);
  const [commentStar, setCommentStar] = useState<number | null>(star);
  const { data: user, isSuccess } = useUser();
  const onSuccessCb = () => {
    alert('댓글을 삭제하였습니다.');
  };
  const onErrorCb = () => {
    alert('요청에 실패하였습니다.');
  };

  const { mutation: deleteComment } = useDeleteComment({ onSuccessCb, onErrorCb, shopId });

  const handleRevise = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRevise(true);
    setReadOnly(false);
  };

  const ratingChange = (e: React.SyntheticEvent, newValue: number | null) =>
    setCommentStar(newValue);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, commentId: number) => {
    deleteComment.mutate(commentId);
  };

  const updateRevise = useCallback((bool: boolean) => {
    setRevise(bool);
  }, []);

  const updateReadOnly = useCallback((bool: boolean) => {
    setReadOnly(bool);
  }, []);

  const userProfile = profile === null ? undefined : profile;

  return (
    <>
      <S.ListContainer>
        <S.AvatarContainer>
          <Avatar alt="userProfile" src={userProfile} sx={{ width: 55, height: 50 }} />
        </S.AvatarContainer>
        <S.ContentContainer>
          <Typography component="legend">{nickname}</Typography>
          <Rating
            name="read-only"
            value={commentStar}
            readOnly={canReadOnly}
            onChange={ratingChange}
          />
          <TextArea
            commentId={commentId}
            shopId={shopId}
            commentStar={commentStar}
            content={content}
            canRevise={canRevise}
            updateRevise={updateRevise}
            updateReadOnly={updateReadOnly}
          />
          {userId === user?.userId && (
            <div className="buttonWrap">
              <S.CustomButton
                variant="contained"
                color="info"
                size="small"
                startIcon={<CreateIcon />}
                onClick={handleRevise}>
                수정
              </S.CustomButton>
              <S.CustomButton
                variant="contained"
                color="error"
                size="small"
                onClick={(e) => handleDelete(e, commentId)}
                startIcon={<DeleteIcon />}>
                삭제
              </S.CustomButton>
            </div>
          )}
        </S.ContentContainer>
      </S.ListContainer>
    </>
  );
};

export default React.memo(CommentList);
