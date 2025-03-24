import SlideGroup from '../tailwind-components/slide/Slide';
import styles from './App.module.css';

import type { SlideButtonProps, SlideConfigType, SlidePagenationProps } from '../tailwind-components/slide/slide-type';
import { Link } from 'react-router';

const data = [
    { num: 1, bgc: '#C54949' },
    { num: 2, bgc: '#C58D49' },
    { num: 3, bgc: '#49C55C' },
    { num: 4, bgc: '#4996C5' },
    { num: 5, bgc: '#8749C5' },
    { num: 6, bgc: '#2D4A7C' },
    { num: 7, bgc: '#616161' },
    { num: 8, bgc: '#BF360C' },
    { num: 9, bgc: '#1A237E' },
    { num: 10, bgc: '#827717' },
];

export default function App() {
    return (
        <>
            <Link to="/drag" viewTransition>
                드래그
            </Link>

            <div className={styles.wrap}>
                <div className={styles.wrapInner}>
                    <SlideGroup
                        totalPage={10}
                        renderItem={(props) => <Contents {...props} />}
                        buttonProps={{
                            prevBtn: { renderItem: (props) => <SlideButton {...props} /> },
                            nextBtn: { renderItem: (props) => <SlideButton {...props} /> },
                        }}
                        pagenationProps={{
                            enabled: true,
                            pagenation: { renderItem: (props) => <Pagenation {...props} item={data} /> },
                        }}
                    />
                </div>
            </div>
        </>
    );
}

function Contents({ pageInfo }: SlideConfigType) {
    return (
        <div className={styles.wrapSlider} style={{ backgroundColor: data[pageInfo.page - 1].bgc }}>
            {pageInfo.page}번
        </div>
    );
}

const SlideButton = ({ buttonInfo, onClick }: SlideButtonProps) => {
    const { direction } = buttonInfo;
    const inline = direction === 'prev' ? { left: 10 } : { right: 10 };

    return (
        <button
            style={{
                display: 'block',
                position: 'absolute',
                top: '50%',
                translate: '0 -50%',
                width: 80,
                height: 80,
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '50%',
                cursor: 'pointer',
                ...inline,
            }}
            onClick={onClick}
        >
            {direction === 'prev' ? '좌측' : '우측'}버튼
        </button>
    );
};

const Pagenation = ({ item, onClick, pageInfo }: SlidePagenationProps & { item: typeof data }) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                bottom: 10,
                translate: '-50% 0',
                display: 'flex',
                gap: 10,
            }}
        >
            {item.map((e) => (
                <button
                    key={e.num}
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        backgroundColor: pageInfo.page === e.num ? '#fff' : e.bgc,
                        border: '1px solid #fff',
                        color: pageInfo.page === e.num ? '#000' : '#fff',
                        cursor: 'pointer',
                    }}
                    onClick={() => onClick(e.num)}
                >
                    {e.num}
                </button>
            ))}
        </div>
    );
};
