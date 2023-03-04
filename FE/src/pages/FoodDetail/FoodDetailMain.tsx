import { lazy, Suspense } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import Spinner from '../../components/Spinner';
import FoodDetail from './FoodDetail';

const FoodDetailMain = () => {
  return (
    <ErrorBoundary>
      <FoodDetail />
    </ErrorBoundary>
  );
};

export default FoodDetailMain;
