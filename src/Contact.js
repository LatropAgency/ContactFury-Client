import React from 'react'
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";
import './css/Contact.css';
import CreateContact from "./CreateContact";
import UpdateContact from "./UpdateContact";
import {getCategories, deleteContact, getContacts, getContactCount} from "./core";

class Contact extends React.Component {

    constructor() {
        super();
        this.state = {
            contacts: [],
            categories: [],
            selected: null,
            isSelected: false,
            isCreate: false,
            isUpdate: false,
            page: 0,
            count: 0,
            isVisible: true,
            selectedCategory: null,
            searchName: null,
        }
    }

    componentDidMount = async () => {
        let categories = await getCategories(this.props.globalState.token)
        this.setState(({categories: categories}))
        let selectedCategoryField = document.querySelector('#search_category')
        selectedCategoryField.value = null
        await this.changeContacts()
        await this.selectFirst()
    }

    deleteContact = async () => {
        await deleteContact(this.props.globalState.token, this.state.selected.id)
        await this.reloadComponent()
    }

    switchUpdate = async () => {
        this.setState(({isUpdate: true}))
    }

    selectFirst = async () => {
        if (this.state.contacts.length) {
            this.state.categories.forEach((category) => {
                if (category.id === this.state.contacts[0].categoryId)
                    this.state.contacts[0].category = category.name
            })
            await this.setState({selected: this.state.contacts[0], isSelected: true})
        }
    }

    changeSelected = (newSelected) => {
        this.state.categories.forEach((category) => {
            if (category.id === newSelected.categoryId)
                newSelected.category = category.name
        })
        this.setState(({selected: newSelected, isSelected: true, isUpdate: false, isCreate: false}))
    }

    changeContacts = async (selectedCategory = null, searchName = null) => {
        const {token} = this.props.globalState
        let newContacts = await getContacts(token, this.state.page, selectedCategory, searchName)
        this.setState((state) => ({contacts: [...state.contacts, ...newContacts]}))
        await this.setState((state) => ({page: state.page + 1}))
        if ((await getContacts(token, this.state.page, selectedCategory, searchName)).length === 0)
            this.state.isVisible = false
        await this.getContactCount()
    }

    loadMore = async () => {
        await this.changeContacts()
    }

    getContactCount = async () => {
        let response = await getContactCount(this.props.globalState.token, this.state.selectedCategory, this.state.searchName)
        await this.setState(({count: response.count}))
    }

    switchToCreate = async () => {
        this.setState(({isCreate: true, isUpdate: false}))
    }

    reloadComponent = async (selectedCategory = null, searchName = null) => {
        await this.setState(({
            isVisible: true,
            isSelected: false,
            isCreate: false,
            contacts: [],
            isUpdate: false,
            selected: null,
            page: 0,
            count: 0,
            selectedCategory: selectedCategory,
            searchName: searchName,
        }))
        let selectedCategoryField = document.querySelector('#search_category')
        selectedCategoryField.value = null
        await this.changeContacts(selectedCategory, searchName)
        await this.selectFirst()
    }

    dropFilters = async () => {
        await this.reloadComponent()
        let searchNameField = document.querySelector('#search_name')
        searchNameField.value = ''
        let selectedCategory = document.querySelector('#search_category')
        selectedCategory.value = null
    }

    changeSelectedCategory = async (e) => {
        await this.reloadComponent(e.target.value, this.state.searchName)
    }

    changeSearchName = async (e) => {
        if (e.target.value.length > 2)
            await this.reloadComponent(this.state.selectedCategory, e.target.value)
    }

    render() {
        return (
            <div className="contact">
                <div className="container">
                    <div className="contact_row">
                        <ContactList changeSearchName={this.changeSearchName} dropFilters={this.dropFilters}
                                     switchToCreate={this.switchToCreate}
                                     changeSelectedCategory={this.changeSelectedCategory} loadMore={this.loadMore}
                                     changeSelected={this.changeSelected} parent={this}/>
                        {!this.state.isCreate && !this.state.isUpdate && (
                            <ContactInfo contactState={this.state} deleteContact={this.deleteContact}
                                         switchUpdate={this.switchUpdate}/>)}
                        {this.state.isCreate && !this.state.isUpdate && (
                            <CreateContact reloadComponent={this.reloadComponent} parent={this}
                                           token={this.props.globalState.token}/>)}
                        {this.state.isUpdate && !this.state.isCreate && (
                            <UpdateContact reloadComponent={this.reloadComponent} parent={this}
                                           token={this.props.globalState.token}/>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact;