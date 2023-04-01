import styled from 'styled-components';
import Slider from 'react-slick';
import { ButtonHTMLAttributes } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

interface StyledSliderProps {
  length: number;
  max: number;
}

type Size = 'sm' | 'md' | 'lg';
type Direction = 'prev' | 'next';
type Color = 'black' | 'white';

/**
 * @type size {string} - 크기를 결정
 * @type direction {string} - 이전, 다음 화살표 방향
 * @type color {string} - color 지정
 */
export interface ArrowBaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asize: Size;
  direction: Direction;
  color: Color;
}
type PickSizeColorProps = Pick<ArrowBaseButtonProps, 'asize' | 'color'>;

export const getSize = (asize: Size) => {
  switch (asize) {
    case 'sm':
      return '16px';
    case 'md':
      return '32px';
    case 'lg':
      return '100px';
    default:
      return '60px';
  }
};

/**
 * @property color {string} - color 지정
 * @property size {string} - 크기를 결정
 * @property direction {string} - 이전, 다음 화살표 방향
 */
export const ArrowBaseButton = styled.button<ArrowBaseButtonProps>`
  z-index: 1;
  color: ${({ color }) => color};
  height: ${({ asize }) => getSize(asize)};
  width: ${({ asize }) => getSize(asize)};
  &:hover {
    color: ${({ color }) => color};
  }
  /* ${({ direction }) => (direction === 'next' ? 'right: 25px' : 'left: 25px')} */
`;

export const NextArrow = styled(IoIosArrowForward)<PickSizeColorProps>`
  width: 100px;
  height: ${({ asize }) => getSize(asize)};
  color: ${({ color }) => color};
  font-size: 100px;
`;

export const PrevArrow = styled(IoIosArrowBack)<PickSizeColorProps>`
  width: 100px;
  height: ${({ asize }) => getSize(asize)};
  color: ${({ color }) => color};
  font-size: 100px;
`;

export const StyledSlider = styled(Slider)<StyledSliderProps>`
  height: 100%;
  position: relative;
  .slick-slider {
    padding: 0 15px;
  } //slider

  .slick-list {
    margin-right: -15px;
    margin-left: -15px;
  } //parent

  .slick-slide {
    border-radius: 15px;
    height: 90%;
    text-align: center;
    position: relative;
  } //item

  .slide {
    opacity: ${({ length, max }) => (length > max ? 0.5 : 1)};
    transform: ${({ length, max }) => (length > max ? 'scale(0.7)' : 'scale(1)')};
    transition: 0.3s;
    filter: blur (5px);
  }
  .slide-center {
    opacity: 1;
    transform: scale(1);
  }
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-prev:hover,
  .slick-next:hover {
    color: ${(props) => props.theme.colors.main};
  }
  .slick-prev,
  .slick-next {
    width: 100px !important;
    height: 100px !important;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 45vh;
  position: relative;
  box-sizing: border-box;
`;

export const DivNext = styled.div`
  width: 30px !important;
  height: 30px !important;
  position: absolute !important;
  text-align: right !important;
  font-size: 100px !important;
  color: ${({ theme }) => theme.font.color.description};
  right: 100px !important;
  top: 120px;
  line-height: 40px !important;
`;

export const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 120px;
  left: 25px;
  z-index: 99;
  text-align: left;
  font-size: 100px !important;
  color: ${(props) => props.theme.colors.emphasis} !important;
  line-height: 40px;
`;

export const Div = styled.div`
  // height: 100%;
  background-color: ${(props) => props.theme.colors.background};
  box-sizing: border-box;
  width: 100%;
  place-items: center;

  img {
    margin: 0 auto 10px auto;
    height: 290px;
    overflow: hidden;
    width: 100%;
    border-radius: 10px;
  }

  span {
    top: 150px;
    color: black;
    /* font-size: 2rem; */
    font-weight: bold;
    margin-bottom: 5px;
  }

  .login_msg {
    height: 30px;
    font-size: 2em;
    margin: 30px 30px 30px 30px;
    color: ${({ theme }) => theme.font.color.description};
    font-weight: bold;
    text-align: center;
    letter-spacing: 4px;
  }
`;

export const TitleBox = styled.div`
  height: 30px;
  font-size: 2em;
  margin: 30px 30px 30px 30px;
  color: ${({ theme }) => theme.font.color.description};
  font-weight: bold;
  text-align: center;
  letter-spacing: 4px;
`;
