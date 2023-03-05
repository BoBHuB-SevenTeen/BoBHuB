import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Comment from './components/Comment';
import CommentList from './components/CommentList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import Content from './components/Content';
import DetailSlider from './components/DetailSlider';
import { useParams } from 'react-router';
import * as S from './styles/foodDetailStyle';
import { useCommentQuery } from '../../queries/comment/useCommentQuery';
import { useMenuQuery } from '../../queries/menu/useMenuQuery';
import { makeImgArr } from './util/foodDetailUtil';
import { useShopQuery } from '../../queries/shop/useShopQuery';

const FoodDetail = () => {
  const scrollRef = useRef<HTMLElement>(null);
  const shopId = Number(useParams().id);

  const { commentState } = useCommentQuery(shopId);
  const { menuState } = useMenuQuery(shopId);
  const { shopState } = useShopQuery(shopId);

  return (
    <S.Pagecontainer ref={scrollRef}>
      <NavBar />
      <DetailSlider imageArr={makeImgArr(shopState, menuState)} />
      <Content shop={shopState} />
      <Comment shopId={shopState?.shopId} scrollRef={scrollRef} />
      <S.CommentContainer>
        {commentState?.map((comment) => (
          <CommentList key={comment.commentId} commentProp={comment} shopId={shopId} />
        ))}
      </S.CommentContainer>
      <Footer />
    </S.Pagecontainer>
  );
};

export default FoodDetail;
