import { FC, useMemo, useRef, useState } from 'react';
import { compose } from '../../function/compose';

import styles from './Slide.module.css';
import type { SlideButtonType, SlideConfigType } from './slide-type';

//슬라이드 생성 함수
function getSlideConfig(totalPage: number, duration: number, view: number = 1) {
    const slideLength = totalPage === 1 ? view : totalPage === 2 ? view + 2 : view + 4;
    const centerIndex = Math.ceil(slideLength / 2);
    const moveValue = parseFloat((100 / slideLength).toFixed(4));

    return {
        totalPage: totalPage,
        slideLength: slideLength, //슬라이드 배열 길이
        slideArr: Array.from({ length: slideLength }, (_, i) => i + 1), //슬라이드 배열 생성
        centerIndex: centerIndex, //중앙 슬라이드 index
        moveValue: totalPage === 1 ? 0 : moveValue, //슬라이드 1칸 이동 거리
        initMove: totalPage === 1 ? 0 : moveValue * (centerIndex - 1), //시작 시 초기 슬라이드 위치 이동 거리 (중앙)
        duration: duration, //transition 속도
    };
}

interface Props {
    totalPage: number; //전체 패이지 수
    renderItem?: FC<SlideConfigType>;
    initPage?: number; //마운트 시 첫 페이지
    duration?: number;
    slideEnabled?: boolean;
    buttonProps?: SlideButtonType;
}

const SlideGroup = ({
    totalPage,
    renderItem: Slide,
    initPage = 1,
    duration = 0.5,
    slideEnabled = false,
    buttonProps = { enabled: true, prev: undefined, next: undefined },
}: Props) => {
    //init
    const slideConfig = useMemo(() => getSlideConfig(totalPage, duration), [totalPage, duration]); //슬라이드 조정 변수

    //state
    const [move, setMove] = useState(-slideConfig.initMove); //슬라이드 이동거리
    const [direction, setDirection] = useState<keyof typeof directionValue>(''); //슬라이드 방향
    const [transition, setTransition] = useState(0.5); //애니메이션 duration

    const [prePage, setPrePage] = useState(initPage); //transition 이전 페이지
    const [page, setPage] = useState(initPage); //transition 이후 페이지

    //computed
    const directionValue = {
        morePrev: slideConfig.moveValue * 2,
        prev: slideConfig.moveValue,
        next: -slideConfig.moveValue,
        moreNext: -slideConfig.moveValue * 2,
        '': 0,
    }; //방향에 따른 이동거리 변수

    //event handelr
    const prevClick = () => {
        if (!direction) {
            setMove((prev) => prev + slideConfig.moveValue);
            setTransition(duration);
            setDirection('prev');
            setPrePage((prev) => (prev === 1 ? slideConfig.totalPage : prev - 1));
        }
    }; //prev 클릭

    const nextClick = () => {
        if (!direction) {
            setMove((prev) => prev - slideConfig.moveValue);
            setTransition(duration);
            setDirection('next');
            setPrePage((prev) => (prev === slideConfig.totalPage ? 1 : prev + 1));
        }
    }; //next 클릭

    const getPageDirection = (newPage: number) => {
        const diff = newPage - page;

        if (diff === -1) return 'prev';
        if (diff === 1) return 'next';
        if (diff < -1) return 'morePrev';
        if (diff > 1) return 'moreNext';
        return '';
    }; //페이지 클릭 시 방향 계산

    const pageClick = (newPage: number) => {
        if (!direction) {
            setTransition(duration);
            setPrePage(newPage);

            const newDirection = getPageDirection(newPage);
            setMove((prev) => prev + (directionValue[newDirection] ?? 0));
            setDirection(newDirection);
        }
    }; //페이지 버튼 클릭

    const onTransitionEnd = () => {
        setDirection('');
        setTransition(0);
        setPage(prePage);

        setMove((prev) => prev - (directionValue[direction] ?? 0));
    }; //슬라이드 이후 배열 초기화

    const getSlidePage = (index: number) => {
        const diff = index - slideConfig.centerIndex;

        if (diff < -1) {
            return direction === 'morePrev' ? prePage : page - 2 < 1 ? slideConfig.totalPage - 1 : page - 2;
        }

        if (diff === -1) {
            return page - 1 || slideConfig.totalPage;
        }

        if (diff === 0) {
            return page;
        }

        if (diff === 1) {
            return page + 1 > slideConfig.totalPage ? 1 : page + 1;
        }

        if (diff > 1) {
            return direction === 'moreNext' ? prePage : page + 2 > slideConfig.totalPage ? 2 : page + 2;
        }

        return page;
    }; //페이지 계산

    const getPageInfo = (index: number) => (slidePage: number) => {
        const pageInfo = {
            initPage: initPage,
            totalPage: slideConfig.totalPage,
            viewPage: page,
            page: slidePage,
            direction: direction,
        };

        //TODO: 나중에 view 갯수 구현할 때 5 손보기
        if (direction === 'morePrev' || direction === 'moreNext' || slideConfig.slideLength !== 5 || (index !== 1 && index !== 5)) {
            return { ...pageInfo, enabled: true };
        }

        return { ...pageInfo, enabled: slideEnabled ? true : false };
    }; //락커 리스트 api 활성화

    const onPageInfoEvent = (index: number) => compose(getPageInfo(index), getSlidePage)(index); //api 페이지 및 파라미터 통합 함수

    const getButtonInfo = (direction: 'prev' | 'next') => ({
        direction: direction,
    });

    //optionProps
    const { renderItem: LeftButton, ...prevProps } = buttonProps.prev || {};
    const { renderItem: RightButton, ...nextProps } = buttonProps.next || {};

    //drag Item
    const onDrag = useRef(false);
    const dragStartX = useRef(0);

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div
                    className={styles.slideContainer}
                    style={{
                        width: `${slideConfig.slideLength * 100}%`,
                        translate: `${move}% 0`,
                        transition: `all ${transition}s ease-in-out`,
                    }}
                    onTransitionEnd={onTransitionEnd}
                    // onMouseDown={(e) => {
                    //     if (!direction) {
                    //         onDrag.current = true;
                    //         dragStartX.current = e.clientX;
                    //     }
                    // }}
                    // onMouseMove={(e) => {
                    //     if (onDrag.current) {
                    //         e.currentTarget.style.transition = `all 0s`;
                    //         e.currentTarget.style.translate = `calc(${move}% - ${dragStartX.current - e.clientX}px) 0`;
                    //     }
                    // }}
                    // onMouseLeave={(e) => {
                    //     if (onDrag.current) {
                    //         e.currentTarget.style.transition = `all ${transition}s ease-in-out`;
                    //         nextClick();
                    //         onDrag.current = false;
                    //         dragStartX.current = 0;
                    //     }
                    // }}
                    // onMouseUp={(e) => {
                    //     if (onDrag.current) {
                    //         e.currentTarget.style.transition = `all ${transition}s ease-in-out`;
                    //         nextClick();
                    //         onDrag.current = false;
                    //         dragStartX.current = 0;
                    //     }
                    // }}
                >
                    {slideConfig.slideArr.map((slide, index) => {
                        const pageInfo = onPageInfoEvent(index + 1);

                        if (!Slide || !pageInfo.enabled) {
                            return <div key={slide} className={styles.slide}></div>;
                        }
                        return (
                            <div key={slide} className={styles.slide}>
                                <Slide pageInfo={pageInfo} slideConfig={slideConfig} />
                            </div>
                        );
                    })}
                </div>

                {buttonProps.enabled && slideConfig.totalPage > 1 && (
                    <div className={styles.buttonBox}>
                        {!LeftButton ? (
                            <button {...prevProps} className={styles.leftBtn} onClick={prevClick}>
                                PREV
                            </button>
                        ) : (
                            <LeftButton buttonInfo={getButtonInfo('prev')} slideConfig={slideConfig} onClick={prevClick} />
                        )}
                        {!RightButton ? (
                            <button {...nextProps} className={styles.rightBtn} onClick={nextClick}>
                                NEXT
                            </button>
                        ) : (
                            <RightButton buttonInfo={getButtonInfo('next')} slideConfig={slideConfig} onClick={nextClick} />
                        )}
                    </div>
                )}

                <div className={styles.pagenation}>
                    {Array.from({ length: slideConfig.totalPage }, (_, i) => i + 1).map((e) => (
                        <button
                            key={e}
                            className={styles.pageBtn}
                            onClick={() => pageClick(e)}
                            disabled={e === page}
                            style={{ backgroundColor: e === prePage ? '#5262c7' : undefined }}
                        >
                            {e}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SlideGroup;

//페이지네이션 및 옵션Props 추가
//드래그앤드롭 완성
//오토플레이 완성
//view 완성
