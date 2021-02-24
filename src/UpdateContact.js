import React from 'react'
import {updateContact} from "./core";
import {validateName, validatePhoneNumber} from "./libs/validators";

class UpdateContact extends React.Component {

    constructor() {
        super();
        this.state = {
            id: null,
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

    updateContact = async () => {
        const {id, name, phone_number, categoryId} = this.state
        try {
            if (validateName(name) && validatePhoneNumber(phone_number)) {
                let response = await updateContact(this.props.token, id, name, phone_number, categoryId)
                this.props.parent.setState({isCreate: false, isUpdate: false, selected: response, isSelected: true})
                await this.props.reloadComponent()
            }
        } catch (e) {
            this.setState({message: e.message})
        }
    }

    componentDidMount = async () => {
        this.setState(({
            id: this.props.parent.state.selected.id,
            name: this.props.parent.state.selected.name,
            phone_number: this.props.parent.state.selected.phone_number,
            categoryId: this.props.parent.state.selected.categoryId,
            categories: this.props.parent.state.categories
        }))
    }

    cancelCreate = async () => {
        this.props.parent.setState(({isUpdate: false, isCreate: false}))
    }

    render() {
        return (
            <div className="contact_create">
                <h3>Update contact</h3>
                {this.state.message && (<span className="message">{this.state.message}</span>)}
                <input defaultValue={this.props.parent.state.selected.name} type="text"
                       onChange={this.changeName}
                       placeholder="name"/>
                <div className="phone_number">
                    <input defaultValue={this.props.parent.state.selected.phone_number} type="text"
                           onChange={this.changePhoneNumber}
                           placeholder="phone number"/>
                </div>
                <select onChange={this.changeCategoryId}>
                    {this.state.categories.map(({id, name}) => {
                        return (<option selected={this.props.parent.state.selected.categoryId === id} value={id}
                                        key={id}>{name}</option>)
                    })}
                </select>
                <div className="btn_row">
                    <button onClick={this.updateContact}>update</button>
                    <button onClick={this.cancelCreate}>cancel</button>
                </div>
            </div>
        )
    }
}

export default UpdateContact;