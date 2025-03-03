import { type FC, useEffect, useMemo, useRef, useState } from 'react';
import { classNames } from '../../function/className';
import { compose } from '../../function/compose';

import styles from './Slide.module.css';
import type { SlideButtonType, SlideConfigType, SlideOptionProps, SlidePagenationType } from './slide-type';
import { splitVendorChunkPlugin } from 'vite';

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
    pagenationProps?: SlidePagenationType;
    optionProps?: SlideOptionProps;
}

const SlideGroup = ({
    totalPage,
    renderItem: Slide,
    initPage = 1,
    duration = 0.5,
    slideEnabled = false,
    buttonProps: { enabled: btnEnabled = true, prevBtn, nextBtn } = {},
    pagenationProps: { enabled: pagingEnabled = false, pagenation } = {},
    optionProps: { wrap: wrapProps, inner: innerProps, slide: slideProps } = {},
}: Props) => {
    //init
    const slideContainer = useRef<HTMLDivElement>(null);
    const slideConfig = useMemo(() => getSlideConfig(totalPage, duration), [totalPage, duration, slideContainer.current]); //슬라이드 조정 변수

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

    //optionProps
    const { renderItem: PrevButton, ...prevProps } = prevBtn || {};
    const { renderItem: NextButton, ...nextProps } = nextBtn || {};
    const { renderItem: Pagenation, ...pagingProps } = pagenation || {};

    //drag Item

    const onDrag = useRef(false);
    const slideWidth = useRef(0);
    const dragStartX = useRef(0);
    const dragTime = useRef(0);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!direction) {
            slideWidth.current = e.currentTarget.clientWidth / slideConfig.slideLength;
            onDrag.current = true;
            dragStartX.current = e.clientX;
            dragTime.current = new Date().getTime();
        }
    };

    const onMouseMove = (e: MouseEvent) => {
        if (onDrag.current) {
            slideContainer.current!.style.transition = `all 0s`;
            slideContainer.current!.style.translate = `calc(${move}% - ${dragStartX.current - e.clientX}px) 0`;
        }
    };

    const onMouseUp = (e: MouseEvent) => {
        if (onDrag.current) {
            onDrag.current = false;

            if (new Date().getTime() - dragTime.current < 250) {
                if (dragStartX.current - e.clientX > 50) nextClick();
                else if (dragStartX.current - e.clientX < -50) prevClick();
                else slideContainer.current!.style.translate = `calc(${move}%) 0`;
                slideContainer.current!.style.transition = `all ${transition}s ease-in-out`;
                dragStartX.current = 0;
                dragTime.current = 0;
                return;
            }

            if (dragStartX.current - e.clientX > slideWidth.current / 2) {
                nextClick();
            } else if (dragStartX.current - e.clientX < -slideWidth.current / 2) {
                prevClick();
            } else {
                slideContainer.current!.style.transition = `all ${transition}s ease-in-out`;
                slideContainer.current!.style.translate = `calc(${move}%) 0`;
            }

            dragStartX.current = 0;
            dragTime.current = 0;
        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <div {...wrapProps} className={classNames(styles.container, wrapProps?.className)}>
            <div {...innerProps} className={classNames(styles.inner, innerProps?.className)}>
                <div
                    className={styles.slideContainer}
                    style={{
                        width: `${slideConfig.slideLength * 100}%`,
                        translate: `${move}% 0`,
                        transition: `all ${transition}s ease-in-out`,
                    }}
                    ref={slideContainer}
                    onTransitionEnd={onTransitionEnd}
                    onMouseDown={onMouseDown}
                >
                    {slideConfig.slideArr.map((slide, index) => {
                        const pageInfo = onPageInfoEvent(index + 1);

                        if (!Slide || !pageInfo.enabled) {
                            return <div {...slideProps} key={slide} className={classNames(styles.slide, slideProps?.className)}></div>;
                        }
                        return (
                            <div {...slideProps} key={slide} className={classNames(styles.slide, slideProps?.className)}>
                                <Slide pageInfo={pageInfo} slideConfig={slideConfig} />
                            </div>
                        );
                    })}
                </div>

                <DefaultButton
                    enabled={btnEnabled && slideConfig.totalPage > 1}
                    prevClick={prevClick}
                    nextClick={nextClick}
                    prevProps={prevProps}
                    nextProps={nextProps}
                    slideConfig={slideConfig}
                    PrevButton={PrevButton}
                    NextButton={NextButton}
                />

                <DefaultPagenation
                    enabled={pagingEnabled}
                    totalPage={slideConfig.totalPage}
                    page={page}
                    prePage={prePage}
                    initPage={initPage}
                    direction={direction}
                    slideConfig={slideConfig}
                    pageClick={pageClick}
                    optionProps={pagingProps}
                    Pagenation={Pagenation}
                />
            </div>
        </div>
    );
};

export default SlideGroup;

type ButtonType = NonNullable<SlideButtonType['nextBtn']>;
interface ButtonRrops {
    enabled: boolean;
    prevClick: () => void;
    nextClick: () => void;
    slideConfig: SlideConfigType['slideConfig'];
    prevProps?: Omit<ButtonType, 'renderItem'>;
    nextProps?: Omit<ButtonType, 'renderItem'>;
    PrevButton?: ButtonType['renderItem'];
    NextButton?: ButtonType['renderItem'];
}
const DefaultButton = ({ enabled, prevClick, nextClick, prevProps, nextProps, slideConfig, PrevButton, NextButton }: ButtonRrops) => {
    if (!enabled) return;

    const getButtonInfo = (direction: 'prev' | 'next') => ({
        direction: direction,
    });

    return (
        <>
            {!PrevButton ? (
                <button {...prevProps} className={classNames(styles.leftBtn, prevProps?.className)} onClick={prevClick}>
                    PREV
                </button>
            ) : (
                <PrevButton buttonInfo={getButtonInfo('prev')} slideConfig={slideConfig} onClick={prevClick} />
            )}
            {!NextButton ? (
                <button {...nextProps} className={classNames(styles.rightBtn, nextProps?.className)} onClick={nextClick}>
                    NEXT
                </button>
            ) : (
                <NextButton buttonInfo={getButtonInfo('next')} slideConfig={slideConfig} onClick={nextClick} />
            )}
        </>
    );
};

type PagenationType = NonNullable<SlidePagenationType['pagenation']>;
interface PagenationProps {
    enabled: boolean;
    totalPage: number;
    initPage: number;
    direction: SlideConfigType['pageInfo']['direction'];
    page: number;
    prePage: number;
    slideConfig: SlideConfigType['slideConfig'];
    pageClick: (num: number) => void;
    optionProps?: Omit<PagenationType, 'renderItem'>;
    Pagenation?: PagenationType['renderItem'];
}

const DefaultPagenation = ({
    enabled,
    totalPage,
    prePage,
    initPage,
    direction,
    slideConfig,
    pageClick,
    optionProps,
    Pagenation,
}: PagenationProps) => {
    if (!enabled) return;

    if (Pagenation) {
        const pageInfo = {
            totalPage: totalPage,
            page: prePage,
            initPage: initPage,
            direction: direction,
        };

        return <Pagenation slideConfig={slideConfig} pageInfo={pageInfo} onClick={pageClick} />;
    }

    const { wrap: warpProps, pageBtn: buttonProps } = optionProps || {};

    return (
        <div {...warpProps} className={classNames(styles.pagenation, warpProps?.className)}>
            {Array.from({ length: totalPage }, (_, i) => i + 1).map((num) => (
                <button
                    key={num}
                    className={classNames(styles.pageBtn, buttonProps?.className)}
                    onClick={() => pageClick(num)}
                    disabled={num === prePage}
                >
                    {num}
                </button>
            ))}
        </div>
    );
};

//드래그앤드롭 완성 - 코드 리팩토링 및 훅스로 분리
//오토플레이 완성
//view 완성
