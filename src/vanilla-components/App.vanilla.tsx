import { useBooleanHandler, useCheckboxHandler, useInputHandler } from '../hooks/useInputHandler';

import styles from './App.module.css';
import Form from '../tailwind-components/form/form/Form';
import RadioGroup, { RadioOption } from '../tailwind-components/form/combo/RadioGroup';
import CheckboxGroup, { CheckboxOption } from '../tailwind-components/form/combo/CheckboxGroup';
import Button from '../tailwind-components/button/Button';
import Select from '../tailwind-components/form/select/Select';
import TextInput from '../tailwind-components/form/textInput/TextField';
import PasswordInput from '../tailwind-components/password/PasswordField';
import Modal from '../tailwind-components/modal/Modal';

function App() {
    const [input, setInput] = useInputHandler({ text: '', radio: '1', select: '' });
    const [check, setCheck, allCheck] = useCheckboxHandler([]);

    const [modal, setModal] = useBooleanHandler({ radioModal: false, alert: false, basic: false });
    const [modalRadio, setModalRadio] = useInputHandler('1');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        setModal((prev) => ({ ...prev, radioModal: true }));
    };

    const onConfirm = () => {
        setModal((prev) => ({ ...prev, alert: !prev.alert }));
    };

    // const mainColor = cssProperty('mainColor');

    return (
        <div className={styles.wrap}>
            <Form
                onSubmit={onSubmit}
                style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 20, border: '1px solid #cdcdcd', padding: 25 }}
            >
                <Form.Fieldset>
                    <Form.Legend>라디오 버튼</Form.Legend>
                    <RadioGroup name="radio" state={input.radio} onChange={setInput}>
                        <RadioOption UIType="default" value="1">
                            1
                        </RadioOption>
                        <RadioOption value="2">2</RadioOption>
                        <RadioOption value="3">3</RadioOption>
                        <RadioOption value="4">4</RadioOption>
                    </RadioGroup>
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>체크박스 버튼</Form.Legend>
                    <CheckboxGroup state={check} UIType="button" onChange={setCheck} name="check" style={{ marginBottom: 10 }}>
                        <CheckboxOption value="1">1</CheckboxOption>
                        <CheckboxOption value="2">2</CheckboxOption>
                        <CheckboxOption value="3">3</CheckboxOption>
                        <CheckboxOption value="4">4</CheckboxOption>
                    </CheckboxGroup>

                    <Button UIType="outline" onClick={() => allCheck(['1', '2', '3', '4'])}>
                        전체 선택
                    </Button>
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>셀렉트 박스 버튼</Form.Legend>
                    <Select state={input.select} onChange={setInput} name="select">
                        <Select.Option value="">선택해주세요.</Select.Option>
                        <Select.Option value="1">1번</Select.Option>
                        <Select.Option value="2">2번</Select.Option>
                        <Select.Option value="3">3번</Select.Option>
                        <Select.Option value="4">4번</Select.Option>
                    </Select>
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>텍스트 입력 칸</Form.Legend>
                    <TextInput
                        value={input.text}
                        onChange={setInput}
                        name="text"
                        placeholder="작성해주세요."
                        style={{ marginBottom: 10 }}
                    />
                    <PasswordInput placeholder="비밀번호를 작성해주세요." />
                </Form.Fieldset>

                <Button UIType="default">제출</Button>

                <button className="h-full w-full border-1 border-solid border-red-700">asdas</button>
            </Form>

            <Modal isOpen={modal.radioModal} name="radioModal" onClick={onConfirm} onClose={setModal} bgClickActive>
                <div className={styles.modalContents}>
                    <h6>모달 라디오 버튼</h6>
                    <RadioGroup
                        UIType="button"
                        name="modalRadio"
                        state={modalRadio}
                        onChange={setModalRadio}
                        className={styles.modalRadio}
                        labelProps={{ className: styles.modalRadioOption }}
                    >
                        <RadioOption value="1">1</RadioOption>
                        <RadioOption value="2">2</RadioOption>
                        <RadioOption value="3">3</RadioOption>
                        <RadioOption value="4">4</RadioOption>
                        <RadioOption value="5">5</RadioOption>
                        <RadioOption value="6">6</RadioOption>
                        <RadioOption value="7">7</RadioOption>
                        <RadioOption value="8">8</RadioOption>
                    </RadioGroup>
                </div>
            </Modal>

            <Modal isOpen={modal.alert} name="alert" center onClick={setModal} onClose={setModal}>
                {modalRadio}번을 선택하셨습니다.
            </Modal>
        </div>
    );
}

export default App;

// //바닐라로 동적 가상선택자 사용하는 방법
// function Example({ color }: { color: string }) {
//     const id = useId().replaceAll(':', '');

//     return (
//         <>
//             <style>{`.btn-default-${id}:hover {color: ${color};}`}</style>
//             <button style={{ width: '100%', padding: 5, backgroundColor: '#eee' }} className={`btn-default-${id}`}>
//                 asdas
//             </button>
//         </>
//     );
// }
