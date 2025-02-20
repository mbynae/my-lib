import { useState } from 'react';
import styles from './App.module.css';

export default function App() {
    const totalPage = 10;
    const moveValue = totalPage > 2 ? 20 : 50;

    const [move, setMove] = useState(totalPage > 2 ? -40 : 0);
    const [direction, setDirection] = useState('');
    const [transition, setTransition] = useState(0.5);
    const [data, setData] = useState(
        [
            { num: 1, bgc: '#c54949' },
            { num: 2, bgc: '#c58d49' },
            { num: 3, bgc: '#49c55c' },
            { num: 4, bgc: '#4996c5' },
            { num: 5, bgc: '#8749c5' },
        ].toSpliced(totalPage > 2 ? 5 : totalPage),
    );
    const [page, setPage] = useState(5);

    const prevClick = () => {
        if (!direction) {
            setMove((prev) => prev + moveValue);
            setTransition(0.4);
            setDirection('prev');
            setPage((prev) => (prev === 1 ? totalPage : prev - 1));
        }
    };

    const nextClick = () => {
        if (!direction) {
            setMove((prev) => prev - moveValue);
            setTransition(0.4);
            setDirection('next');
            setPage((prev) => (prev === totalPage ? 1 : prev + 1));
        }
    };

    const onTransitionEnd = () => {
        setDirection('');
        setTransition(0);

        if (direction === 'prev') {
            setData((prev) => [prev[4], ...prev.filter((_, i) => i !== prev.length - 1)]);
            setMove((prev) => prev - moveValue);
            return;
        }

        if (direction === 'next') {
            setData((prev) => [...prev.filter((_, i) => i), prev[0]]);
            setMove((prev) => prev + moveValue);
            return;
        }

        if (direction === 'first') {
            setData((prev) => [prev[3], prev[4], ...prev.filter((_, i) => i !== prev.length - 1 && i !== prev.length - 2)]);
            setMove((prev) => prev - moveValue * 2);
            return;
        }

        if (direction === 'last') {
            setData((prev) => [...prev.filter((_, i) => i !== 0 && i !== 1), prev[0], prev[1]]);
            setMove((prev) => prev + moveValue * 2);
            return;
        }
    };

    const pageClick = (newPage: number) => {
        if (!direction) {
            setTransition(0.4);
            setPage(newPage);

            const diff = newPage - page;

            if (diff === -1) {
                setMove((prev) => prev + moveValue);
                setDirection('prev');
                return;
            }

            if (diff === 1) {
                setMove((prev) => prev - moveValue);
                setDirection('next');
                return;
            }

            if (diff < -1) {
                setMove((prev) => prev + moveValue * 2);
                setDirection('first');
                return;
            }

            if (diff > 1) {
                setMove((prev) => prev - moveValue * 2);
                setDirection('last');
                return;
            }
        }
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.inner}>
                    <div
                        className={styles.slideContainer}
                        style={{ width: `${data.length * 100}%`, translate: `${move}% 0`, transition: `all ${transition}s ease-in-out` }}
                        onTransitionEnd={onTransitionEnd}
                    >
                        {data.map((e) => (
                            <div key={e.num} className={styles.slide} style={{ backgroundColor: e.bgc }}>
                                {e.num}번
                            </div>
                        ))}
                    </div>

                    {totalPage > 1 && (
                        <div className={styles.buttonBox}>
                            <button className={styles.leftBtn} onClick={prevClick}>
                                PREV
                            </button>
                            <button className={styles.rightBtn} onClick={nextClick}>
                                NEXT
                            </button>
                        </div>
                    )}

                    <div className={styles.pagenation}>
                        {Array.from({ length: totalPage }, (_, i) => i + 1).map((e) => (
                            <button
                                key={e}
                                className={styles.pageBtn}
                                onClick={() => pageClick(e)}
                                disabled={e === page}
                                style={{ backgroundColor: e === page ? '#5262c7' : undefined }}
                            >
                                {e}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
