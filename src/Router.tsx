import { Route, Routes } from 'react-router';
import App from './example/App';
import App2 from './example/App2';

const Router = () => {
    return (
        <Routes>
            <Route path="slide" element={<App />} />
            <Route path="drag" element={<App2 />} />
        </Routes>
    );
};

export default Router;
