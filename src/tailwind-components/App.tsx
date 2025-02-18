import { useBooleanHandler, useCheckboxHandler, useInputHandler } from '../hooks/useInputHandler';

import Form from './form/form/Form';
import RadioGroup, { Radio } from './form/combo/RadioGroup';
import CheckboxGroup, { Checkbox } from './form/combo/CheckboxGroup';
import Button from './button/Button';

import TextInput from './form/textInput/TextInput';
import PasswordInput from './password/PasswordInput';
import Select from './form/select/Select';
import Modal from './modal/Modal';
import styles from '../vanilla-components/App.module.css';

function App() {
    const [input, setInput] = useInputHandler({
        text: '',
        radio: '1',
        select: '3',
    });
    const [check, setCheck, allCheck] = useCheckboxHandler([]);

    const [modal, setModal] = useBooleanHandler({
        radioModal: false,
        alert: false,
        basic: false,
    });
    const [modalRadio, setModalRadio] = useInputHandler('1');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        console.log(formData.get('select'));

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
                    <RadioGroup state={input.radio} name="radio" onChange={setInput}>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                    </RadioGroup>
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>체크박스 버튼</Form.Legend>
                    <CheckboxGroup
                        UIType="button"
                        state={check}
                        onChange={setCheck}
                        name="check"
                        optionProps={{ group: { className: 'mb-3' } }}
                    >
                        <Checkbox value="1">1</Checkbox>
                        <Checkbox value="2">2</Checkbox>
                        <Checkbox value="3">3</Checkbox>
                        <Checkbox value="4">4</Checkbox>
                    </CheckboxGroup>
                    <Button type="button" UIType="default" onClick={() => allCheck(['1', '2', '3', '4'])} className="w-full">
                        전체 선택
                    </Button>
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>셀렉트 박스 버튼</Form.Legend>
                    <Select UIType="line" name="select">
                        <Select.Option value="0">선택해주세요</Select.Option>
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
                        optionProps={{
                            label: { className: styles.modalRadioOption },
                        }}
                    >
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                        <Radio value="6">6</Radio>
                        <Radio value="7">7</Radio>
                        <Radio value="8">8</Radio>
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
