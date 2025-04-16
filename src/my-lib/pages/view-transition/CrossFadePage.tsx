import { useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate, useViewTransitionState } from 'react-router';
import './cross-fade-page.css';

const imgArr = [{ link: '1' }, { link: '2' }, { link: '3' }, { link: '4' }];

const CrossFadePage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();

        if (!document.startViewTransition) {
            navigate(link, { state: { ...state } });
            return;
        }

        document.startViewTransition(() => {
            navigate(link, { state: { ...state } });
        });
    };

    const ref = useRef<HTMLDivElement>(null);

    return (
        <div>
            <h4 className="mb-2.5 text-xl font-semibold">Page Menu</h4>
            <nav className="mb-16 flex gap-4">
                {imgArr.map((img) => (
                    <Link key={img.link} to={img.link} state={{ ...state }} viewTransition>
                        <img
                            src={`${import.meta.env.VITE_APP_BASE_URL}/src/assets/cross-fade${img.link}.png`}
                            alt={`사진${img.link}`}
                            className="w-30 rounded-[10px]"
                        />
                    </Link>
                ))}
            </nav>
            <Outlet />
        </div>
    );
};

export default CrossFadePage;
