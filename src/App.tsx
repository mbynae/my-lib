import { useBooleanHandler, useCheckboxHandler, useInputHandler } from './hooks/useInputHandler';

import Button from './components/button/Button';
import CheckboxGroup, { CheckboxOption } from './components/form/combo/CheckboxGroup';
import Form from './components/form/form/Form';
import RadioGroup, { RadioOption } from './components/form/combo/RadioGroup';
import Select from './components/form/select/Select';
import TextInput from './components/form/textInput/TextInput';
import PasswordInput from './components/password/PasswordInput';
import Modal from './components/modal/Modal';
import styles from './App.module.css';
import Icon from './components/icon/Icon';

import { cssProperty } from './function/css-property';
import { useState } from 'react';

function App() {
    // const [input, setInput] = useInputHandler({ text: '', radio: '1', radio2: '1', select: '' });
    // const [check, setCheck, allCheck] = useCheckboxHandler([]);
    const [singleCheck, setSingleCheck] = useBooleanHandler({ first: false, second: false });

    const [modal, setModal] = useBooleanHandler({ radioModal: false, alert: false, basic: false });
    const [modalRadio, setModalRadio] = useInputHandler('1');

    const [singleRadio, setSingleRadio] = useState('');
    const inputSingleHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSingleRadio(e.target.value);
    };

    const [input, setInput] = useState({ text: '', radio: '1', radio2: '1', select: '' });
    const inputObjHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInput(prev => ({ ...prev, [name]: value }));
    };

    const [check, setCheck] = useState<string[]>([]);
    const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = e.target;

        if (checked) return setCheck(prev => prev.concat(value));
        return setCheck(prev => prev.filter(data => data !== value));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        setModal(prev => ({ ...prev, radioModal: true }));
    };

    const onConfirm = () => {
        setModal(prev => ({ ...prev, alert: !prev.alert }));
    };

    // const mainColor = cssProperty('mainColor');

    return (
        <div className={styles.wrap}>
            <Form
                onSubmit={onSubmit}
                style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 20, border: '1px solid #cdcdcd', padding: 25 }}
            >
                <Form.Fieldset>
                    <Form.Legend>라디오 예시 버튼</Form.Legend>
                    <RadioGroup name="example" state={singleRadio} onChange={inputSingleHanlder}>
                        <RadioOption value="yes">YES</RadioOption>
                        <RadioOption value="no">NO</RadioOption>
                    </RadioGroup>
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>라디오 버튼</Form.Legend>
                    <RadioGroup name="radio" state={input.radio} onChange={inputObjHandler}>
                        <RadioOption UIType="default" value="1">
                            1
                        </RadioOption>
                        <RadioOption value="2">2</RadioOption>
                        <RadioOption value="3">3</RadioOption>
                        <RadioOption value="4">4</RadioOption>
                    </RadioGroup>
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>라디오 버튼2</Form.Legend>
                    <RadioGroup UIType="button" name="radio2" state={input.radio2} onChange={inputObjHandler}>
                        <RadioOption value="1">1</RadioOption>
                        <RadioOption value="2">2</RadioOption>
                        <RadioOption value="3">3</RadioOption>
                        <RadioOption value="4">4</RadioOption>
                    </RadioGroup>
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>체크박스 버튼</Form.Legend>
                    <CheckboxGroup state={check} UIType="button" onChange={checkboxHandler} name="check" style={{ marginBottom: 10 }}>
                        <CheckboxOption value="1">1</CheckboxOption>
                        <CheckboxOption value="2">2</CheckboxOption>
                        <CheckboxOption value="3">3</CheckboxOption>
                        <CheckboxOption value="4">4</CheckboxOption>
                    </CheckboxGroup>

                    {/* <Button type="button" UIType="outline">
                        전체 선택
                    </Button> */}
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>체크박스 버튼2</Form.Legend>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <CheckboxOption
                            value="5"
                            onChange={setSingleCheck}
                            name="first"
                            checked={singleCheck.first}
                            labelProps={{ style: { flex: 1 } }}
                        >
                            단독 사용1
                        </CheckboxOption>
                        <CheckboxOption
                            UIType="button"
                            value="5"
                            onChange={setSingleCheck}
                            name="second"
                            checked={singleCheck.second}
                            labelProps={{ style: { flex: 1 } }}
                        >
                            단독 사용2
                        </CheckboxOption>
                    </div>
                </Form.Fieldset>

                <Form.Fieldset>
                    <Form.Legend>셀렉트 박스 버튼</Form.Legend>
                    <Select state={input.select} onChange={inputObjHandler} name="select">
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
                        onChange={inputObjHandler}
                        name="text"
                        placeholder="작성해주세요."
                        style={{ marginBottom: 10 }}
                    />
                    <PasswordInput placeholder="비밀번호를 작성해주세요." />
                </Form.Fieldset>

                {/* <Icon icon="closeEye" width={50} /> */}

                <Button UIType="default">제출</Button>
                <Button type="button" UIType="outline" onClick={() => setModal(prev => ({ ...prev, basic: true }))}>
                    기본모달
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

            <Modal isOpen={modal.basic} UIType="basic" name="basic" onClose={setModal}>
                여기는 아무것도 없는 기본 모달입니다.
                <br />
                알아서 내용을 채우세요.
            </Modal>
        </div>
    );
}

export default App;
