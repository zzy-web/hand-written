import { useRef } from "react"
class FormStore {
    constructor() {
        this.store = {}
        this.entityArr = []
        this.callback = {}
    }
    setCallback = callback => {
        this.callback = {
            ...this.callback,
            ...callback
        }
    }
    getFiledsValue = () => {
        return { ...this.store }
    }
    getFiledValue = (name) => {
        return this.store[name]
    }
    setFiledsValue = (newStore) => {
        this.store = { ...this.store, ...newStore }
        console.log('设置', this.store)
        this.entityArr.forEach(entity => {
            Object.keys(newStore).forEach(key => {
                if (key === entity.props.name) {
                    entity.onStoreChange()
                }
            })
        })
    }
    filedEntitys = (entity) => {
        console.log(this, 11)
        this.entityArr.push(entity)
    }
    validate = () => {
        let err = []
        this.entityArr.forEach(entity=>{
            if(entity.props.rules){
                if(entity.props.rules.required&&!this.store[entity.props.name]){
                    // entity.errText=entity.props.rules.message
                    err.push(entity.props.name+'  is required')
                }
            }
        })
        return err
    }
    submit = () => {
        const { onFinish, onFinishFaild } = this.callback
        let err = this.validate()
        if (err.length > 0) {
            onFinishFaild(err)
        } else {
            onFinish(err)
        }
    }
    getForm = () => {
        return {
            getFiledsValue: this.getFiledsValue,
            getFiledValue: this.getFiledValue,
            setFiledsValue: this.setFiledsValue,
            delFiledValue: this.delFiledValue,
            filedEntitys: this.filedEntitys,
            submit: this.submit,
            setCallback: this.setCallback
        }
    }
}

export default function useForm(form) {
    const formRef = useRef()
    if (!formRef.current) {
        if (form) {
            formRef.current = form
        } else {
            const formStore = new FormStore()
            formRef.current = formStore.getForm()
        }
    }

    return [formRef.current]
}