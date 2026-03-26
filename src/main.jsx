import { createRoot } from 'react-dom/client';
import { StudyProvider } from './context/StudyContext';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StudyProvider>
    <App />
  </StudyProvider>
);