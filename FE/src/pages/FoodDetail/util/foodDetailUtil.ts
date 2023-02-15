import { Menu } from '../../../type/menuType';
import { Shops } from '../../../type/shopType';
import { NullableNum } from '../../../type/utilType';

export const canWriteComment = (isLogin: boolean, content: string, starValue: NullableNum) => {
  if (!isLogin) {
    alert('로그인을 해주세요');
    return true;
  }
  if (content === '') {
    alert('댓글을 입력해주세요.');
    return true;
  }
  if (starValue === null) {
    alert('별점을 입력해주세요.');
    return true;
  }
  return false;
};

export const validateText = (textValue: string, commentStar: NullableNum) => {
  if (textValue === '') {
    alert('댓글을 입력해주세요');
    return true;
  }
  if (commentStar === null) {
    alert('별점을 입력해주세요');
    return true;
  }
  return false;
};

export const makeImgArr = (shopState: Shops, menuState: Menu[]) => {
  const imgArr = [];
  imgArr.push(shopState?.shopPicture);
  imgArr.push(shopState?.menu);
  menuState.forEach((menu) => {
    imgArr.push(menu.picture);
  });

  return [...imgArr];
};

export const onRender = (
  id: string,
  phase: string,
  actualTime: number,
  baseTime: number,
  startTime: number,
  commitTime: number,
) => console.table({ id, phase, actualTime, baseTime, startTime, commitTime });
