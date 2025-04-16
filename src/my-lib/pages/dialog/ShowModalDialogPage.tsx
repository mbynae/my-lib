import { useRef, useState } from 'react';
import Button from '../../../tailwind-components/button/Button';
import './dialog-tailwind.css';
import Dialog from '../../../tailwind-components/dialog/Dialog';
import TextField from '../../../tailwind-components/form/textInput/TextField';
import { useInputHandler } from '../../../hooks/useInputHandler';

const ShowModalDialogPage = () => {
    const ref = useRef<HTMLDialogElement>(null);
    // const [text, setText] = useInputHandler({ string: '', number: 0, name: '네임' });
    const [number, setNumber] = useInputHandler(0);

    return (
        <>
            {/* <TextField value={text.string} name="string" onChange={setText} /> */}
            <TextField type="number" value={number} name="number" onChange={setNumber} />
            {/* <TextField value={text.name} name="name" onChange={setText} /> */}
            <Dialog.Trigger ref={ref}>
                <Button>Dialog 버튼</Button>
            </Dialog.Trigger>
            <Dialog ref={ref} title="예시 다이얼로그" formMathod="dialog">
                <div className="mb-5">
                    <span>아무거나</span>
                    <span>막써보자</span>
                </div>
                <Dialog.BtnBox>
                    <Dialog.Btn BtnType="cancel" />
                    <Dialog.Btn type="submit" />
                </Dialog.BtnBox>
            </Dialog>
        </>
    );
};

export default ShowModalDialogPage;
