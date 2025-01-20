import { useBooleanHandler, useCheckboxHandler, useInputHandler } from './hooks/useInputHandler';

import Button from './components/button/Button';
import CheckboxGroup, { CheckboxOption } from './components/form/CheckboxGroup';
import Form from './components/form/Form';
import RadioGroup, { RadioOption } from './components/form/RadioGroup';
import Select from './components/form/Select';
import Modal from './components/modal/Modal';
import styles from './App.module.css';

function App() {
    const [radio, setRadio] = useInputHandler('1');
    const [select, setSelect] = useInputHandler({ first: '1', second: '1' });
    const [select2, setSelect2] = useInputHandler('1');
    const [check, setCheck, allCheck] = useCheckboxHandler([]);

    const [modal, setModal] = useBooleanHandler({ radioModal: false, alert: false });
    const [modalRadio, setModalRadio] = useInputHandler('1');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        setModal(prev => ({ ...prev, radioModal: true }));
    };

    const onConfirm = () => {
        setModal(prev => ({ ...prev, alert: !prev.alert }));
    };

    return (
        <>
            <Form onSubmit={onSubmit} style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 20, marginLeft: 10 }}>
                <Form.Fieldset>
                    <Form.Legend>라디오 버튼</Form.Legend>
                    <RadioGroup UIType="button" type="checkbox" name="radio" state={radio} onChange={setRadio}>
                        <RadioOption value="1">1</RadioOption>
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
                </Form.Fieldset>
                <Button UIType="default">제출</Button>

                <Select state={select2} onChange={setSelect2} name="first">
                    <Select.Option2 value="1">1번</Select.Option2>
                    <Select.Option2 value="2">2번</Select.Option2>
                    <Select.Option2 value="3">3번</Select.Option2>
                    <Select.Option2 value="4">4번</Select.Option2>
                </Select>

                {/* <Select state={select.second} onChange={setSelect} name="second">
                    <Select2.Option value="1">1번</Select.Option>
                    <Select.Option value="2">2번</Select.Option>
                    <Select.Option value="3">3번</Select.Option>
                    <Select.Option value="4">4번</Select.Option>
                </Select> */}
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

            <Modal isOpen={modal.alert} name="alert" isShowBg={false} onClick={setModal} onClose={setModal}>
                <div>{modalRadio}번을 선택하셨습니다.</div>
            </Modal>
        </>
    );
}

export default App;
