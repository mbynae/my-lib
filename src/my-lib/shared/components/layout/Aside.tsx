import { useNavigate } from 'react-router';
import Menu from '../menu/Menu';

const Aside = () => {
    const navigate = useNavigate();

    return (
        <aside className="box-border h-[100vh] w-[300px] flex-shrink-0">
            <div className="border-border-thin fixed box-border h-[100vh] w-[300px] border-r-1 px-7.5 py-9">
                <div className="mb-10 flex cursor-pointer items-center gap-3.5" onClick={() => navigate('/')}>
                    <span className="bg-theme-main block size-14 flex-shrink-0 rounded-full" />
                    <span className="text-theme-main text-3xl font-semibold whitespace-nowrap">My Library</span>
                </div>
                <span className="mb-8 block h-px w-full border-0 bg-[0_100%] bg-[linear-gradient(to_right,_#44656e_50%,_transparent_50%)] bg-[length:10px_1px] bg-repeat-x" />
                <Menu />
            </div>
        </aside>
    );
};

export default Aside;
