import { Route, Routes } from 'react-router';
import * as Pages from './my-lib/pages/index';

const Router = () => {
    return (
        <Routes>
            <Route path="" element={<Pages.Main />}>
                <Route path="view-transition">
                    <Route path="cross-fade" element={<div>cross-fade</div>}></Route>
                    <Route path="dynamic-card" element={<div>dynamic-card</div>}></Route>
                    <Route path="zoom-in-out" element={<div>zoom-in-out</div>}></Route>
                </Route>
            </Route>
            {/* <Route path="slide" element={<App />} />
            <Route path="drag" element={<App2 />} /> */}
        </Routes>
    );
};

export default Router;
