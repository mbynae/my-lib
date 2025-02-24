import SlideGroup from '../tailwind-components/slide/Slide';
import styles from './App.module.css';

import type { SlideButtonProps, SlideConfigType } from '../tailwind-components/slide/slide-type';

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
        <div className={styles.wrap}>
            <div className={styles.wrapInner}>
                <SlideGroup
                    totalPage={10}
                    renderItem={(props) => <Contents {...props} />}
                    buttonProps={{
                        enabled: true,
                        prev: { renderItem: (props) => <SlideButton {...props} /> },
                        next: { renderItem: (props) => <SlideButton {...props} /> },
                    }}
                />
            </div>
        </div>
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
