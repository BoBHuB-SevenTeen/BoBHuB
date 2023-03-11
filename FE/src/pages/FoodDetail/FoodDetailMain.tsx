import ErrorBoundary from '../../components/ErrorBoundary';
import FoodDetail from './FoodDetail';

const FoodDetailMain = () => {
  return (
    <ErrorBoundary>
      <FoodDetail />
    </ErrorBoundary>
  );
};

export default FoodDetailMain;
