import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SliderContainer = styled.div`
  width: 800px;
  height: 550px;
  position: relative;
  margin: 60px;
`;

export const StyledSlider = styled(Slider)`
  height: 550px;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-prev:hover {
    color: ${({ theme }) => theme.colors.main};
  }
  .slick-next:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

export const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 99;
  font-size: 100px;
  color: ${({ theme }) => theme.font.color.black};
  right: -30px;
  top: 200px;
`;

export const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 99;
  font-size: 100px;
  color: ${({ theme }) => theme.font.color.black};
  top: 200px;
  left: -100px;
`;

export const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

export const ImgContainer = styled.div`
  width: 800px;
  height: 550px;
  position: relative;
`;
