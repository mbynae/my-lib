import { createRoot } from 'react-dom/client';

import './tailwind-index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import Router from './Router';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    </BrowserRouter>,
);
