import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import ChatApp from './components/ChatApp/ChatApp';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { muitheme } from './styles/muiTheme';
import { SocketContext, socket } from './socket/SocketContext';
import GlobalFont from './styles/GlobalFont';
import { Provider } from 'react-redux/es/exports';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={muitheme}>
        <ThemeProvider theme={theme}>
          <SocketContext.Provider value={socket}>
            <Router />
            <ChatApp />
            <GlobalStyle />
            <GlobalFont />
          </SocketContext.Provider>
        </ThemeProvider>
      </MuiThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
