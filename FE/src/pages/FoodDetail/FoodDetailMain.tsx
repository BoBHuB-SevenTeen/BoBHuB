import { lazy, Suspense } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import Spinner from '../../components/Spinner';
import FoodDetail from './FoodDetail';

const FoodDetailCom = lazy(() => import('./FoodDetail'));

const FoodDetailMain = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={Spinner}>
        <FoodDetailCom />
      </Suspense>
    </ErrorBoundary>
  );
};

export default FoodDetailMain;
