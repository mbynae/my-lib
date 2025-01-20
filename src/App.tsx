import { useCheckboxHandler, useInputHandler } from './hooks/useInputHandler';

import Button from './components/button/Button';
import CheckboxGroup, { CheckboxOption } from './components/form/CheckboxGroup';
import Form from './components/form/Form';
import RadioGroup, { RadioOption } from './components/form/RadioGroup';
import Select from './components/form/Select';
import TextInput from './components/form/TextInput';
import PasswordInput from './components/password/PasswordInput';
import styles from './App.module.css';

function App() {
    const [input, setInput] = useInputHandler({ text: '', radio: '1', select: '' });
    const [check, setCheck, allCheck] = useCheckboxHandler([]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        console.log(formData.get('select'));
    };

    return (
        <div>
            <Form onSubmit={onSubmit} style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 20, marginLeft: 10 }}>
                <Form.Fieldset>
                    <Form.Legend>라디오 버튼</Form.Legend>
                    <RadioGroup UIType="button" name="radio" state={input.radio} onChange={setInput}>
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
            </Form>
        </div>
    );
}

export default App;
