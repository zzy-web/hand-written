import React, { Component } from "react";
import FiledContext from "./FiledContext";

export default class Field extends Component {
    static contextType = FiledContext
    getControled = () => {
        const { name } = this.props
        const { getFiledValue, setFiledsValue } = this.context
        return {
            value: getFiledValue(name)||'',
            onChange: (e) => {  
                const newVal = e.target.value
                setFiledsValue({ [name]: newVal })
            }
        }
    }
    componentDidMount(){
        this.context.filedEntitys(this)
    }
    onStoreChange(){
        this.forceUpdate()
    }
    componentWillUnmount() {
        this.context.delFiledValue(this.props.name) 
    }
    render() {
        return <div>
            {React.cloneElement(this.props.children, this.getControled())}
        </div>
    }
}
