import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Spinner from './components/Spinner';
import Admin from './pages/Admin/Admin';
import FoodDetail from './pages/FoodDetail/FoodDetail';
import FoodList from './pages/FoodList/FoodList';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
import MyPage from './pages/MyPage/MyPage';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';

// const Admin = lazy(() => import('./pages/Admin/Admin'));
// const FoodDetail = lazy(() => import('./pages/FoodDetail/FoodDetail'));
// const FoodList = lazy(() => import('./pages/FoodList/FoodList'));
// const Login = lazy(() => import('./pages/Login/Login'));
// const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
// const MyPage = lazy(() => import('./pages/MyPage/MyPage'));
// const Register = lazy(() => import('./pages/Register/Register'));

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Suspense fallback={Spinner}> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/foodList" element={<FoodList />} />
        <Route path="/foodList/:id" element={<FoodDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  );
};

export default Router;
