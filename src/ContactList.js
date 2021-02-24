import React from 'react'

const ContactList = ({changeSearchName, dropFilters, switchToCreate, loadMore, changeSelected, parent, changeSelectedCategory}) => {

    return (
        <div className="contact_list_wrapper">
            <div className="contact_filter contact_list">
                <h3>Filter</h3>
                <input id="search_name" type="text" placeholder="search" onChange={changeSearchName}/>
                <select id="search_category" onChange={changeSelectedCategory}>
                    {parent.state.categories.map(({id, name}) => {
                        return (<option value={id} key={id}>{name}</option>)
                    })}
                </select>
                <button onClick={dropFilters}>Drop</button>
            </div>
            <div className="contact_list">
                <h3>Contact List({parent.state.contacts.length}/{parent.state.count})</h3>
                <button onClick={switchToCreate}>Create</button>
                {Boolean(parent.state.contacts.length) && (
                    <div className="contact_items">
                        {parent.state.contacts.map((contact, index) => {
                            return (<div onClick={(e) => changeSelected(contact)} className="contact_item"
                                         key={index}>
                                <span>{contact.name}</span>
                            </div>)
                        })}
                    </div>)}
                {Boolean(!parent.state.contacts.length) && (
                    <h3 className="contact_empty">Empty</h3>
                )}
                {Boolean(parent.state.contacts.length) && parent.state.isVisible && (
                    <button onClick={loadMore}>Load More</button>)}
            </div>
        </div>
    )
}

export default ContactList;