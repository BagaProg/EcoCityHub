import './i18n.js';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from '../src/context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>
);
