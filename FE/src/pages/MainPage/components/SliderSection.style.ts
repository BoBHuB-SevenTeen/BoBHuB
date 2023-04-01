import styled from 'styled-components';
import Slider from 'react-slick';

interface StyledSliderProps {
  length: number;
  max: number;
}

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
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-prev:hover {
    color: ${(props) => props.theme.colors.main};
  }
  .slick-next:hover {
    color: ${(props) => props.theme.colors.main};
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
  width: 30px;
  height: 30px;
  position: absolute;
  text-align: right;
  font-size: 100px;
  color: ${({ theme }) => theme.font.color.description};
  right: 100px;
  top: 120px;
  line-height: 40px;
`;

export const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 120px;
  left: 25px;
  z-index: 99;
  text-align: left;
  font-size: 100px;
  color: ${(props) => props.theme.colors.emphasis};
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
