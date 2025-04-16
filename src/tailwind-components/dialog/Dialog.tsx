import { ComponentProps, createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../function/className';

import Button from '../button/Button';

import type { DialogProps } from './dialog-type';
import type { ButtonProps } from '../button/button-type';

// showModal() : 배경 모달 오픈
// show() : 비배경 모달 오픈
// close() : 닫기

// form => method="dialog" : submit 시 새로고침 안하고 자동 모달 닫기
// button => formmethod="dialog" : submit 시 새로고침 안하고 자동 모달 닫기

// backdrop : 배경 스타일링 속성

// autofocus : 모달 오픈 시 포커스 줄 속성

// @starting-style : 모달 오픈 시 시작 스타일링
// dialog:open : 모달 오픈 시 최종 스타일링
// dialog:open::backdrop

// transition-behavior: allow-discrete (display, overlay) : display 같이 transition이 적용 안되는 속성에 transition 지연을 적용을 위한 속성

const context = createContext<Pick<DialogProps, 'ref'>>({ ref: { current: null } });

const Dialog = ({ ref, title, children, bgClose = true, formMathod, onSubmit, duration = 0.15, optionProps, ...props }: DialogProps) => {
    const [show, setShow] = useState(false);

    //배경 클릭
    const backDropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        // 파폭/사파리 지원해야 할 시
        // if (e.currentTarget === ref.current && bgClose) {
        //     ref.current?.close();
        // }
    };

    const onSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
        if (onSubmit) return onSubmit(e);
        e.stopPropagation();
    };

    //열기 닫기 시 show 핸들링
    useEffect(() => {
        let timeMethod: NodeJS.Timeout;

        const transition = () => {
            if (ref.current?.open) {
                return setShow(true);
            }

            if (timeMethod) clearTimeout(timeMethod);
            timeMethod = setTimeout(() => {
                setShow(false);
            }, duration * 1000);
        };

        ref.current?.addEventListener('toggle', transition);

        return () => {
            ref.current?.removeEventListener('toggle', transition);
            if (timeMethod) clearTimeout(timeMethod);
        };
    }, [ref.current, duration]);

    return createPortal(
        <dialog
            {...props}
            className={classNames('dialog-default')}
            ref={ref}
            closedby="any"
            onClick={backDropClick}
            style={{ '--dialog-duration': `${duration}s` }}
        >
            <context.Provider value={{ ref: ref }}>
                {show && (
                    <form
                        {...optionProps?.form}
                        method={formMathod}
                        className={classNames('_inner', optionProps?.form?.className)}
                        onClick={onSubmitEvent}
                    >
                        <h5 {...optionProps?.title} className={classNames('_title', optionProps?.title?.className)}>
                            {title}
                        </h5>
                        <section {...optionProps?.contents}>{children}</section>
                    </form>
                )}
            </context.Provider>
        </dialog>,
        document.getElementById('modal')!,
    );
};

const Trigger = ({
    ref,
    children,
    func,
    showType = 'showModal',
}: Pick<DialogProps, 'ref' | 'children'> & { func?: () => void; showType?: 'showModal' | 'show' }) => {
    const onClick = () => {
        if (func) func();
        ref.current?.[showType]();
    };

    return (
        <div onClick={onClick} className="inline-block">
            {children}
        </div>
    );
};

const BtnBox = ({ children, ...props }: Pick<DialogProps, 'children'> & ComponentProps<'div'>) => {
    return (
        <div {...props} className={classNames('_buttonBox', props.className)}>
            {children}
        </div>
    );
};

const Btn = ({
    BtnType = 'default',
    children,
    onClick,
    ...props
}: { BtnType?: 'default' | 'cancel'; onClick?: () => void; children?: React.ReactNode } & ButtonProps) => {
    const { ref } = useContext(context);

    if (BtnType === 'default') {
        return (
            <Button {...props} onClick={onClick}>
                {children ?? '확인'}
            </Button>
        );
    }
    return (
        <Button UIType="outline" {...props} onClick={() => ref.current?.close()}>
            {children ?? '취소'}
        </Button>
    );
};

Dialog.Trigger = Trigger;
Dialog.BtnBox = BtnBox;
Dialog.Btn = Btn;

export default Dialog;
