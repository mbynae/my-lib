import { NavLink, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { classNames } from '../../../../function/className';
import { menuList } from '../../../../menuList';

import Icon from '../../../../tailwind-components/icon/Icon';
import type { IconProps } from '../../../../tailwind-components/icon/icon-type';

const Menu = () => {
    const location = useLocation();

    const pathArr = location.pathname.split('/');
    const mainMenu = pathArr?.[1];

    const [toggle, setToggle] = useState(mainMenu);

    const onToggleMenu = (menu: string) => {
        if (toggle === menu) {
            return setToggle('');
        }
        setToggle(menu);
    };

    useEffect(() => {
        if (location.pathname === '/') {
            setToggle('');
        }
    }, [location.pathname]);

    return (
        <nav>
            {menuList.map((menu) => (
                <List key={menu.path} name={menu.path} title={menu.title} toggle={toggle} icon={menu.icon} setToggle={onToggleMenu}>
                    {menu.children.map((sub) => (
                        <LinkButton key={sub.link} parent={menu.path} link={sub.link}>
                            {sub.subTitle}
                        </LinkButton>
                    ))}
                </List>
            ))}
        </nav>
    );
};

interface ListProps {
    children?: React.ReactNode;
    name: string;
    title: string;
    toggle: string;
    icon: IconProps['icon'];
    setToggle: (e: string) => void;
}
const List = ({ name, children, title, toggle, icon, setToggle }: ListProps) => {
    const focusStyle = 'bg-theme-main text-white  py-3.5 rounded-[10px]';

    return (
        <ul className="group mb-5">
            <li
                className={classNames('flex cursor-pointer items-center gap-2 px-4 font-medium', toggle === name ? focusStyle : '')}
                onClick={() => setToggle(name)}
            >
                <Icon icon={icon} width={24} color={toggle === name ? '#fff' : 'var(--color-border-main)'} /> {title}
            </li>
            {toggle === name && children}
        </ul>
    );
};

interface LinkProps {
    children: React.ReactNode;
    parent: string;
    link: string;
}
const LinkButton = ({ children, parent, link }: LinkProps) => {
    return (
        <NavLink
            to={'/' + parent + '/' + link}
            className="text-text-thin mb-2 block pl-4 text-sm first-of-type:mt-2.5"
            style={({ isActive }) => (isActive ? { fontWeight: 700, color: 'var(--color-theme-main)' } : { subTitle: children })}
        >
            {children}
        </NavLink>
    );
};

export default Menu;
