import { createRoot } from 'react-dom/client';

import App from './tailwind-components/App';
import './tailwind-components/tailwind-index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import App from './example/App';
// import App2 from './example/App2';
import { BrowserRouter } from 'react-router';
import Router from './Router';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            {/* <Router /> */}
            <App />
        </QueryClientProvider>
    </BrowserRouter>,
);
