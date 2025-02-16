import { ReactElement, useRef, useState } from 'react';

// Option 컴포넌트의 props 타입
interface OptionProps {
    value: string;
    children: React.ReactNode;
}

// Select 컴포넌트의 props 타입
interface SelectProps {
    children: ReactElement<OptionProps>[] | ReactElement<OptionProps>;
    name?: string;
}

const Select2 = ({ children }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const [selectedLabel, setSelectedLabel] = useState('선택해주세요.');

    const arrayChild = Array.isArray(children) ? children : [children];

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value, label) => {
        setSelectedLabel(label);
        if (selectRef.current) {
            selectRef.current.value = value;
        }
        setIsOpen(false);
    };

    return (
        <>
            <style>
                {`
                .select-container {
                    position: relative;
                    width: 200px;
                }

                .select-button {
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .options-container {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    margin-top: 4px;
                    z-index: 1000;
                }

                .option {
                    padding: 8px 12px;
                    cursor: pointer;
                }

                .option:hover {
                    background-color: #f5f5f5;
                }
            `}
            </style>
            <div className="select-container">
                <input type="hidden" ref={selectRef} name="select2" />
                <div className="select-button" onClick={handleSelectClick}>
                    {selectedLabel}
                </div>
                {isOpen && (
                    <div className="options-container">
                        {arrayChild.map((child) => (
                            <div
                                key={child.props.value}
                                className="option"
                                onClick={() => handleOptionClick(child.props.value, child.props.children)}
                            >
                                {child.props.children}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const Option = ({ children, value }: OptionProps) => {
    return null; // 실제로 렌더링되지 않음
};

Select2.Option = Option;

export default Select2;
