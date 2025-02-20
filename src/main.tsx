import { createRoot } from 'react-dom/client';

// import App from './tailwind-components/App';
import './tailwind-components/tailwind-index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './example/App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>,
);
