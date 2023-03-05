// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import React, { lazy, Suspense } from 'react';
import Spinner from '../../../components/Spinner';
import { NullableString } from '../../../type/utilType';
import * as S from '../styles/detailSliderStyle';

interface DetailSliderProps {
  imageArr: NullableString[];
}

const MdKeyboardArrowLeft = lazy(() => import('../styles/KeyboardArrowLeft'));
const MdKeyboardArrowRight = lazy(() => import('../styles/KeyboardArrowRight'));

const DetailSlider = ({ imageArr }: DetailSliderProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: (
      <S.Div>
        <MdKeyboardArrowRight />
      </S.Div>
    ),
    prevArrow: (
      <S.DivPre>
        <MdKeyboardArrowLeft />
      </S.DivPre>
    ),
  };

  const newImageArr = imageArr.map((x) => {
    if (x === null) return undefined;
    return x;
  });

  return (
    <Suspense fallback={<Spinner />}>
      <S.SliderContainer>
        <S.StyledSlider {...settings}>
          {newImageArr.map((imgUrl) => (
            <S.ImgContainer key={imgUrl}>
              <S.Img alt="shopImage" src={imgUrl} key={imgUrl} className="images" />
            </S.ImgContainer>
          ))}
        </S.StyledSlider>
      </S.SliderContainer>
    </Suspense>
  );
};

export default React.memo(DetailSlider);
