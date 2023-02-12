import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Comment from './components/Comment';
import CommentList from './components/CommentList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { initialShopState } from '../../type/utilType';
import Content from './components/Content';
import DetailSlider from './components/DetailSlider';
import { getShop, getMenu } from './foodDetailApi';
import { useParams } from 'react-router';
import React from 'react';
import { Shops } from '../../type/shopType';
import { Menu } from '../../type/menuType';
import type { Tcomment } from '../../type/commentType';
import * as S from './styles/foodDetailStyle';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { fetchComments } from '../../queries/comment/useCommentQuery';

const FoodDetail = () => {
  const [update, setUpdated] = useState<boolean>(false);
  const scrollRef = useRef<HTMLElement>(null);
  const shopId = Number(useParams().id);

  const {
    isLoading: commentLoading,
    isError: isCommentError,
    data: commentState,
  } = useQuery<Tcomment[], AxiosError>(['comment', shopId], () => fetchComments(shopId), {});

  const {
    isLoading: menuLoading,
    isError: isMenuError,
    data: menuState,
  } = useQuery<Menu[], AxiosError>(['menu', shopId], () => getMenu(shopId), {});

  const {
    isLoading: shopLoading,
    isError: isShopError,
    data: shopState,
  } = useQuery<Shops, AxiosError>(['shop', shopId], () => getShop(shopId), {});

  const updateCommentState = useCallback(() => {
    setUpdated((current) => !current);
  }, []);

  // const fetchShopState = async (shopId: number) => {
  //   const [shopState, menuState] = await Promise.all([getShop(shopId), getMenu(shopId)]);
  //   setShopState(shopState);
  //   setMenuState(menuState);
  // // };

  // const fetchInitialData = async () => {
  //   await fetchCommentState(shopId);
  //   await fetchShopState(shopId);
  // };

  // useEffect(() => {
  //   fetchInitialData();
  // }, []);

  // useEffect(() => {
  //   fetchCommentState(shopId);
  // }, [update]);

  const makeImgArr = useCallback(
    (shopState: Shops, menuState: Menu[]) => {
      const imgArr = [];
      imgArr.push(shopState?.shopPicture);
      imgArr.push(shopState?.menu);
      menuState.forEach((menu) => {
        imgArr.push(menu.picture);
      });

      return [...imgArr];
    },
    [menuState, shopState],
  );

  if (commentLoading || menuLoading || shopLoading) {
    return <S.CommentContainer>로딩중</S.CommentContainer>;
  }

  if (isCommentError || isMenuError || isShopError) {
    return <S.CommentContainer>Error 발생</S.CommentContainer>;
  }

  return (
    <S.Pagecontainer ref={scrollRef}>
      <NavBar />
      <DetailSlider imageArr={makeImgArr(shopState, menuState)} />
      {<Content shop={shopState} />}
      <Comment
        updateCommentState={updateCommentState}
        shopId={shopState?.shopId}
        scrollRef={scrollRef}
      />
      <S.CommentContainer>
        {commentState?.map((comment) => (
          <CommentList
            key={comment.commentId}
            commentProp={comment}
            updateCommentState={updateCommentState}
          />
        ))}
      </S.CommentContainer>
      <Footer />
    </S.Pagecontainer>
  );
};

export default React.memo(FoodDetail);
