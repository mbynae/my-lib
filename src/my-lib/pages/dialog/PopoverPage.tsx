import { useEffect, useRef } from 'react';
import Button from '../../../tailwind-components/button/Button';
import './example.css';

const PopoverPage = () => {
    const popover = useRef<HTMLDivElement>(null);

    return (
        <div>
            <Button
                // onClick={() => popover.current?.showPopover()}
                // onMouseEnter={() => popover.current?.showPopover()}
                // onMouseLeave={() => popover.current?.hidePopover()}
                className="_popoverBtn"
                style={{ anchorName: '--popover-anchor' }}
                ref={(e) => {
                    if (e) {
                        e.popoverTargetElement = popover.current;
                        e.popoverTargetAction = 'show';
                    }
                }}
            >
                <span>팝오버 버튼</span>
            </Button>
            <div
                popover="auto"
                className="_popover"
                ref={popover}
                style={{ positionAnchor: '--popover-anchor' }}
                onToggle={() => console.log('실행')}
            >
                팝오버입니다. 이것은 팝오버 입니다. 진짜 개빡치네
                <br />
                아따 시발 진짜
            </div>
        </div>
    );
};

export default PopoverPage;
