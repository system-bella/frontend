import AppRoutes from './app.routes';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
