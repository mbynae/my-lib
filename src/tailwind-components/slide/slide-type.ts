import { Component, ComponentProps, FC } from 'react';

export interface SlideConfigType {
    pageInfo: PageInfo;
    slideConfig: SlideConfig;
}

export interface SlideButtonType {
    enabled?: boolean;
    prev?: ComponentProps<'button'> & { renderItem?: FC<SlideButtonProps> };
    next?: ComponentProps<'button'> & { renderItem?: FC<SlideButtonProps> };
}

export type SlideButtonProps = Pick<SlideConfigType, 'slideConfig'> & ButtonInfo & { onClick: (e?: React.MouseEvent<HTMLElement>) => void };

type SlideConfig = {
    totalPage: number; //전체 페이지
    slideLength: number; //슬라이드 배열 길이
    slideArr: number[]; //슬라이드 배열 생성
    centerIndex: number; //중앙 슬라이드 index
    moveValue: number; //슬라이드 1칸 이동 거리
    initMove: number; //시작 시 초기 슬라이드 위치 이동 거리 (중앙)
    duration: number; //transition 속도
};

type PageInfo = {
    page: number; //각 슬라이드 페이지
    totalPage: number; //전체 페이지
    initPage: number; //초기 view 페이지
    viewPage: number; //현재 view 페이지
    direction: 'morePrev' | 'prev' | 'next' | 'moreNext' | ''; //현재 페이지 이동 방향
    enabled: boolean; //슬라이드 컨텐츠 활성화 여부
};

type ButtonInfo = {
    buttonInfo: {
        direction: 'prev' | 'next';
    };
};
