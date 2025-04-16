import { Outlet } from 'react-router';
import Aside from '../../shared/components/layout/Aside';
import MainLayout from '../../shared/components/layout/MainLayout';

const Main = () => {
    return (
        <div className="flex">
            <Aside />
            <MainLayout>
                <Outlet />
            </MainLayout>
        </div>
    );
};

export default Main;
