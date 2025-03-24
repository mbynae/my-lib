import { classNames } from '../../../function/className';

import Button from '../../button/Button';
import './modal-tailwind.css';

import type { ModalContentsProps } from '../modal-type';

export default function ModalDefaultUI({ children, onClose, onClick, title, name, optionProps }: ModalContentsProps<'default'>) {
    const { wrap: wrapProps, closeBtn: closeBtnProps, contents: contentsProps, button: buttonProps, buttonText } = optionProps || {};

    return (
        <div {...wrapProps} className={classNames('modal-default', wrapProps?.className)} onClick={(e) => e.stopPropagation()}>
            <div className="_topArea">
                <div className="_closeBtnBox">
                    <button
                        {...closeBtnProps}
                        type="button"
                        className={classNames('_closeBtn', closeBtnProps?.className)}
                        onClick={onClose}
                        name={name}
                    />
                </div>
                <div
                    {...contentsProps}
                    className={classNames(
                        '_contents',
                        contentsProps?.center ? 'flex items-center justify-center' : '',
                        contentsProps?.className,
                    )}
                >
                    {children}
                </div>
            </div>
            <Button
                name={name}
                onClick={onClick ? onClick : onClose}
                className={classNames('w-full', buttonProps?.className)}
                {...buttonProps}
            >
                {buttonText ?? '확인'}
            </Button>
        </div>
    );
}
