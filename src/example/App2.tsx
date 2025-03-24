import React, { useRef, useState } from 'react';
import Button from '../tailwind-components/button/Button';
import './App2.css';
import { Link } from 'react-router';

const App2 = () => {
    const [id, setId] = useState(4);
    const [state, setState] = useState([{ order: 1 }, { order: 2 }, { order: 3 }, { order: 4 }]);
    const [newOrder, setNewOrder] = useState<number[]>([]);

    const addEvent = () => {
        const newID = id + 1;
        setId(newID);
        setState((prev) => prev.concat({ order: newID }));
    };

    const deleteEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget.parentElement as HTMLDivElement;
        const height = target.getBoundingClientRect().height;

        target.style.height = `${height}px`;

        requestAnimationFrame(() => {
            target.classList.add('delete');
        });
    };

    function getAllNextElementSiblings(element: HTMLDivElement) {
        const siblings = [];
        let nextSibling = element.nextElementSibling;

        while (nextSibling) {
            siblings.push(nextSibling);
            nextSibling = nextSibling.nextElementSibling;
        }

        return siblings as HTMLDivElement[];
    }

    const onTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>, order: number) => {
        // setState((prev) => prev.filter((e) => e.order !== order));
    };

    return (
        <>
            <Link to="/slide" viewTransition>
                슬라이드
            </Link>
            <div className="box-border flex h-[100vh] w-[100vw] flex-col items-center justify-center">
                <div className="wrap box-border h-full max-h-[500px] w-full max-w-2xl overflow-y-auto border-1 border-[#cdcdcd] p-[20px]">
                    <div className="mb-5 flex w-full justify-end gap-[10px]">
                        <Button onClick={addEvent} className="w-[80px]">
                            추가
                        </Button>
                        <Button UIType="outline" onClick={() => setState([])} className="float-end w-[80px]">
                            삭제
                        </Button>
                    </div>
                    <div className="h-fit w-full">
                        {state.map((order, index) => (
                            <div
                                key={order.order}
                                onTransitionEnd={(e) => onTransitionEnd(e, order.order)}
                                className="orderBlock flex w-full items-center justify-between rounded-[10px] border-1 border-[#cdcdcd] px-[20px] py-[10px] text-[20px]"
                            >
                                <span data-order={order.order}>{index + 1}</span>
                                <Button onClick={(e) => deleteEvent(e)} className="float-end w-[50px] border-[#e92d2d] bg-[#e92d2d]">
                                    삭제
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

// const App2 = () => {
//     const [id, setId] = useState(4);
//     const [state, setState] = useState([1, 2, 3, 4]);
//     const itemsRef = useRef(new Map());
//     const containerRef = useRef(null);

//     const addEvent = () => {
//         setState((prev) => prev.concat(id + 1));
//         setId((prev) => prev + 1);
//     };

//     const deleteEvent = (order) => {
//         // 현재 DOM 요소들의 위치 저장
//         const itemsPosition = new Map();
//         state.forEach((item) => {
//             const node = itemsRef.current.get(item);
//             if (node) {
//                 itemsPosition.set(item, node.getBoundingClientRect());
//             }
//         });

//         // // 상태 업데이트
//         setState((prev) => prev.filter((e) => e !== order));

//         // // 다음 렌더링 후 애니메이션 적용
//         requestAnimationFrame(() => {
//             state.forEach((item) => {
//                 if (item !== order) {
//                     // 삭제되는 아이템 제외
//                     const node = itemsRef.current.get(item);
//                     if (node) {
//                         const oldPos = itemsPosition.get(item);
//                         const newPos = node.getBoundingClientRect();

//                         // Y축 이동 계산
//                         const deltaY = oldPos.top - newPos.top;

//                         if (deltaY) {
//                             // FLIP 애니메이션 적용
//                             node.style.transform = `translateY(${deltaY}px)`;
//                             node.style.transition = 'none';

//                             node.offsetHeight; // 강제 리플로우

//                             node.style.transform = '';
//                             node.style.transition = 'transform 0.3s ease-in-out';
//                         }
//                     }
//                 }
//             });
//         });
//     };

//     return (
//         <div className="box-border flex h-[100vh] w-[100vw] flex-col items-center justify-center">
//             <div className="wrap box-border h-full max-h-[500px] w-full max-w-2xl overflow-y-auto border-1 border-[#cdcdcd] p-[20px]">
//                 <div className="mb-5 flex w-full justify-end gap-[10px]">
//                     <Button onClick={addEvent} className="w-[80px]">
//                         추가
//                     </Button>
//                     <Button UIType="outline" onClick={() => setState([])} className="float-end w-[80px]">
//                         삭제
//                     </Button>
//                 </div>
//                 <div ref={containerRef} className="relative flex w-full flex-col gap-4">
//                     {state.map((e, i) => (
//                         <div
//                             key={e}
//                             ref={(node) => {
//                                 if (node) {
//                                     itemsRef.current.set(e, node);
//                                 } else {
//                                     itemsRef.current.delete(e);
//                                 }
//                             }}
//                             className="orderBlock flex h-16 w-full items-center justify-between rounded-[10px] border-1 border-[#cdcdcd] px-[20px] text-[20px]"
//                         >
//                             <span>{i + 1}</span>
//                             <Button onClick={() => deleteEvent(e)} className="float-end w-[50px] border-[#e92d2d] bg-[#e92d2d]">
//                                 삭제
//                             </Button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

export default App2;
