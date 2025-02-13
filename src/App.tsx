import { useBooleanHandler, useCheckboxHandler, useInputHandler } from './hooks/useInputHandler';

import Form from './tailwind-components/form/form/Form';
import RadioGroup, { RadioOption } from './tailwind-components/form/combo/RadioGroup';
import CheckboxGroup, { CheckboxOption } from './tailwind-components/form/combo/CheckboxGroup';
import Button from './tailwind-components/button/Button';

import TextInput from './tailwind-components/form/textInput/TextInput';
import PasswordInput from './tailwind-components/password/PasswordInput';
import Modal from './tailwind-components/modal/Modal';
import styles from './App.module.css';
import SelectDefault from './tailwind-components/form/select/UI/SelectDefault';
import Select from './tailwind-components/form/select/Select';
// import '../src/tailwind-components/form/combo/UI/Combo-tailwind.css';

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

    return (
        <div className="box-border flex min-h-screen w-full items-center justify-center">
            <Form onSubmit={onSubmit} className="flex w-[400px] flex-col gap-[20px] border border-[#cdcdcd] p-[25px]">
                <Form.Fieldset>
                    <Form.Legend>라디오 버튼</Form.Legend>
                    <RadioGroup UIType="default" name="radio" state={input.radio} onChange={setInput}>
                        <RadioOption value="1">1</RadioOption>
                        <RadioOption value="2">2</RadioOption>
                        <RadioOption value="3">3</RadioOption>
                        <RadioOption value="4">4</RadioOption>
                    </RadioGroup>
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>체크박스 버튼</Form.Legend>
                    <CheckboxGroup UIType="button" state={check} onChange={setCheck} name="check" className="mb-5">
                        <CheckboxOption value="1">1</CheckboxOption>
                        <CheckboxOption value="2">2</CheckboxOption>
                        <CheckboxOption value="3">3</CheckboxOption>
                        <CheckboxOption value="4">4</CheckboxOption>
                    </CheckboxGroup>
                    <Button UIType="default" onClick={() => allCheck(['1', '2', '3', '4'])} className="w-full">
                        전체 선택
                    </Button>
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>셀렉트 박스 버튼</Form.Legend>
                    <Select UIType="line" state={input.select} onChange={setInput} name="select">
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

                <Button UIType="text" className="m-auto">
                    제출
                </Button>
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
                        optionProps={{ label: { className: styles.modalRadioOption } }}
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
