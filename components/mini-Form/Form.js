import React from "react"
import FiledContext from "./FiledContext"
import useForm from './useForm'
export default function Form({ children, form, onFinish, onFinishFaild }) {
    const [formInstance] = useForm(form)
    formInstance.setCallback({ onFinish, onFinishFaild })
    return <form onSubmit={(e) => {
        e.preventDefault()
        formInstance.submit()
    }}>
        <FiledContext.Provider value={formInstance}>
            {children}
        </FiledContext.Provider>
    </form>

}