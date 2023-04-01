import * as S from './SliderSection.style';
import { CSSProperties } from 'styled-components';
import { MouseEventHandler } from 'react';

interface ArrowButtonProps extends S.ArrowBaseButtonProps {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ArrowButton = ({ className, style, onClick, direction, color, asize }: ArrowButtonProps) => {
  return (
    <S.ArrowBaseButton
      asize={asize}
      color={color}
      direction={direction}
      className={className}
      style={{ ...style }}
      type="button"
      onClick={onClick}>
      {direction === 'next' ? (
        <S.NextArrow asize={asize} color={color} />
      ) : (
        <S.PrevArrow asize={asize} color={color} />
      )}
    </S.ArrowBaseButton>
  );
};
export default ArrowButton;
