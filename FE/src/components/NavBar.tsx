import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import logo from '../assets/BoBHuB_logo.png';
import title from '../assets/BoBHuB_textLogo.png';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import MyParty from './MyParty';
import styled from 'styled-components';
import { theme } from './../styles/theme';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import UserGuide from './UserGuide/UserGuide';
import { getMyPartyList } from './../store/partySlice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import useMyParties from '../queries/useMyPartiesQuery';
import { isFullParty } from '../util/isFullParty';
import { loginAction, logoutAction } from '../store/loginSlice';
import useUser from '../queries/useUserQuery';
import { get } from '../api/API';
import { useQueryClient } from '@tanstack/react-query';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 32px;
  margin-top: 2px;
  margin-right: 7px;
`;

const TitleLogo = styled.img`
  width: 140px;
  margin-top: 15px;
`;

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [alarm, setAlarm] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { data: myPartyList, isSuccess: fetchingMyPartiesSuccess } = useMyParties();
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const { data: user, isSuccess: fetchingUserSuccess, isError, refetch } = useUser();
  const queryClient = useQueryClient();

  const location = useLocation();

  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);
  const closeAlarm = () => setAlarm(false);

  if (fetchingUserSuccess) dispatch(loginAction());
  else if (isError) dispatch(logoutAction());
  else dispatch(logoutAction());

  useEffect(() => {
    if (open === true) {
      setOpen(false);
    }
  }, [isLogin]);

  useEffect(() => {
    if (fetchingMyPartiesSuccess && myPartyList.find((party) => isFullParty(party))) {
      setAlarm(true);
    }
  }, [myPartyList]);

  const handleOpenToggle = () => setOpen(!open);

  const logout = async () => {
    const res = await get('/api/auth/logout');
    dispatch(logoutAction());
    queryClient.invalidateQueries(['user']);
    // window.localStorage.clear();
  };

  const handleLikedParty = () => {
    handleOpenToggle();
    dispatch(getMyPartyList());
  };

  return (
    <AppBar
      sx={{
        bgcolor: location.pathname !== '/' ? theme.colors.main : 'transparent',
        boxShadow: 'none',
        position: location.pathname !== '/' ? 'static' : 'absolute',
      }}>
      <Toolbar>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={alarm}
          onClose={closeAlarm}
          message="모임이 활성화 됐습니다. 채팅창을 확인하세요!"
          autoHideDuration={6000}>
          <Alert onClose={closeAlarm} severity="success" sx={{ width: '100%' }}>
            모임이 활성화 됐습니다. 채팅창을 확인하세요!
          </Alert>
        </Snackbar>
        <BasicLink to="/">
          <Logo src={logo} alt="BoBHuB logo" />
        </BasicLink>
        <Typography fontSize={30} component="div" sx={{ flexGrow: 1 }}>
          <BasicLink to="/">
            <TitleLogo src={title} alt="BoBHuB titleLogo" />
          </BasicLink>
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={handleOpen} sx={{ color: 'white' }}>
            밥허브 이용가이드
          </Button>
          {fetchingUserSuccess && user.role === 'admin' && (
            <BasicLink to="/admin">
              <Button color="inherit">관리자</Button>
            </BasicLink>
          )}
          {isLogin ? (
            <Fragment>
              <BasicLink to="/mypage">
                <Button color="inherit">마이페이지</Button>
              </BasicLink>
              <Button color="inherit" onClick={handleLikedParty}>
                찜 목록
              </Button>
            </Fragment>
          ) : (
            <div></div>
          )}
          {isLogin ? (
            <BasicLink to="/">
              <Button onClick={logout} color="inherit">
                로그아웃
              </Button>
            </BasicLink>
          ) : (
            <Fragment>
              <BasicLink to="/login">
                <Button color="inherit">로그인</Button>
              </BasicLink>
              <BasicLink to="/register">
                <Button color="inherit">회원가입</Button>
              </BasicLink>
            </Fragment>
          )}
        </Stack>
        <MyParty handleClose={handleOpenToggle} open={open} />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={modal}>
            <Box sx={ModalStyle}>
              <UserGuide />
            </Box>
          </Fade>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(NavBar);
