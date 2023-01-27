import { FcLikePlaceholder } from 'react-icons/fc';
import styled from 'styled-components';

interface LikeProps {
  onClick: () => void;
}

const HeartContainer = styled.div`
  align-items: right;
`;

const HeartButton = ({ onClick }: LikeProps) => {
  return (
    <HeartContainer onClick={onClick}>
      <FcLikePlaceholder size={50} />
    </HeartContainer>
  );
};

export default HeartButton;
