import React from 'react'
import {createContact, validatePhoneNumber, validateName} from "./core";

class CreateContact extends React.Component {

    constructor() {
        super();
        this.state = {
            name: null,
            phone_number: null,
            categoryId: null,
            categories: [],
            message: null,
        }
    }

    changeName = async (e) => {
        this.setState(({name: e.target.value}))
    }

    changePhoneNumber = async (e) => {
        this.setState(({phone_number: e.target.value}))
    }

    changeCategoryId = async (e) => {
        this.setState(({categoryId: e.target.value}))
    }

    createContact = async () => {
        const {name, phone_number, categoryId} = this.state
        if (!validateName(name)) {
            this.setState({message: "Invalid name"})
        }
        else if (!validatePhoneNumber(phone_number)) {
            this.setState({message: "Invalid phone number"})
        } else {
            await createContact(this.props.token, name, phone_number, categoryId)
            await this.props.reloadComponent()
        }
    }

    componentDidMount = async () => {
        this.setState(({
            categories: this.props.parent.state.categories,
            categoryId: this.props.parent.state.categories[0].id,
        }))
    }

    cancelCreate = async () => {
        this.props.parent.setState(({isUpdate: false, isCreate: false}))
    }

    render() {
        return (
            <div className="contact_create">
                <h3>Create contact</h3>
                {this.state.message && (<span className="message">{this.state.message}</span>)}
                <input type="text" onChange={this.changeName} placeholder="name"/>
                <div className="phone_number">
                    <input type="text" onChange={this.changePhoneNumber}
                           placeholder="phone number"/>
                </div>
                <select onChange={this.changeCategoryId}>
                    {this.state.categories.map(({id, name}) => {
                        return (<option value={id} key={id}>{name}</option>)
                    })}
                </select>
                <div className="btn_row">
                    <button onClick={this.createContact}>create</button>
                    <button onClick={this.cancelCreate}>cancel</button>
                </div>
            </div>
        )
    }
}

export default CreateContact;