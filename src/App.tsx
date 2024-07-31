import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import light from './styles/themes/light';
import AppRoutes from './routes/index';

export default function App() {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyles />
      <AppRoutes />
    </ThemeProvider>
  );
}
