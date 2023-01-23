import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Comment from './components/Comment';
import CommentList from './components/CommentList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { initialShopState } from '../../type/utilType';
import Content from './components/Content';
import DetailSlider from './components/DetailSlider';
import { getComment, getShop, getMenu } from './foodDetailApi';
import { useParams } from 'react-router';
import React from 'react';
import { Menu } from '../../type/menuType';
import type { Tcomment } from '../../type/commentType';
import * as S from './styles/foodDetailStyle';

const FoodDetail = () => {
  const [shopState, setShopState] = useState(initialShopState);
  const [commentState, setCommentState] = useState<Tcomment[]>([]);
  const [menuState, setMenuState] = useState<Menu[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [update, setUpdated] = useState<boolean>(false);
  const scrollRef = useRef<HTMLElement>(null);
  const shopId = Number(useParams().id);

  const updateCommentState = useCallback(() => {
    setUpdated((current) => !current);
  }, []);

  const fetchCommentState = async (shopId: number) => {
    const commentState = await getComment(shopId);
    setCommentState(commentState);
  };

  const fetchShopState = async (shopId: number) => {
    const [shopState, menuState] = await Promise.all([getShop(shopId), getMenu(shopId)]);
    setShopState(shopState);
    setMenuState(menuState);
  };

  const fetchInitialData = async () => {
    await fetchCommentState(shopId);
    await fetchShopState(shopId);
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchCommentState(shopId);
  }, [update]);

  const makeImgArr = useCallback(() => {
    const imgArr = [];
    imgArr.push(shopState.shopPicture);
    imgArr.push(shopState.menu);
    menuState.forEach((menu) => {
      imgArr.push(menu.picture);
    });

    return [...imgArr];
  }, [shopState, menuState]);

  const imageArr = useMemo(() => makeImgArr(), [makeImgArr]);

  return (
    <S.Pagecontainer ref={scrollRef}>
      {isLoading ? (
        'isLoading...'
      ) : (
        <>
          <NavBar />
          <DetailSlider imageArr={imageArr} />
          {<Content shop={shopState} />}
          <Comment
            updateCommentState={updateCommentState}
            shopId={shopState.shopId}
            scrollRef={scrollRef}
          />
          <S.CommentContainer>
            {commentState.map((comment) => (
              <CommentList
                key={comment.commentId}
                commentProp={comment}
                updateCommentState={updateCommentState}
              />
            ))}
          </S.CommentContainer>
          <Footer />
        </>
      )}
    </S.Pagecontainer>
  );
};

export default React.memo(FoodDetail);
