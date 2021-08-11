
import { useEffect } from 'react'
import Form from './components'
const { Field } = Form
const nameRules = { required: true, message: '请输入名字' }
const passwordRules = { required: true, message: '请输入密码' }

function App() {
  const [form] = Form.useForm()

  //表单验证失败
  const onFinish = (v) => {
    console.log('验证成功')
  }

  const onFinishFaild = (v) => {
    console.log(v)
  }
  useEffect(() => {
    console.log('form')
    form.setFiledsValue({username:'default'})
  })
  return (
    <div className="App">
      <Form form={form} onFinish={onFinish} onFinishFaild={onFinishFaild}>
        <Field name='username' rules={nameRules}>
          <input placeholder='username' />
        </Field>
        <Field name='password' rules={passwordRules}>
          <input placeholder='password' />
        </Field>
        <button>提交</button>
      </Form>
    </div>
  );
}

export default App;
