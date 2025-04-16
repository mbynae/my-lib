import { useLocation } from 'react-router';
import { menuList } from '../../../../menuList';

interface Props {
    children: React.ReactNode;
}
const MainLayout = ({ children }: Props) => {
    const location = useLocation();
    const title = getTitme(location.pathname.split('/').filter(Boolean));

    return (
        <main className="bg-theme-thin box-border w-full px-7.5 pt-10">
            <section className="mb-5 flex items-center justify-between">
                <header>
                    <h1 className="text-[2rem] font-semibold">{title.title}</h1>
                    <h2 className="text-font-gray font-semibold">{title.subTitle}</h2>
                </header>
                <div></div>
            </section>
            <section className="box-border min-h-[800px] w-full rounded-2xl bg-white px-10 py-9">{children}</section>
        </main>
    );
};

export default MainLayout;

const getTitme = (pathArr: string[]) => {
    const title = menuList.find((menu) => menu.path === pathArr[0]);
    const subTitle = title?.children.find((sub) => sub.link === pathArr[1]);

    return { title: title?.title ?? 'Dashboard', subTitle: subTitle?.description ?? '' };
};
