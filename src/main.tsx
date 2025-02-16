import { createRoot } from 'react-dom/client';

import App from './tailwind-components/App';
import './tailwind-components/tailwind-index.css';

createRoot(document.getElementById('root')!).render(<App />);
