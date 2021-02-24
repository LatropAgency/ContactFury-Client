import React from 'react'

const ContactInfo = ({contactState, deleteContact, switchUpdate}) => {

    return (
        <div className="contact_info">
            {contactState.isSelected && (
                <div className="contact_card">
                    <h3>{contactState.selected.name}</h3>
                    <span>category: {contactState.selected.category}</span><br/>
                    <span>phone: +375{contactState.selected.phone_number}</span>
                    <div className="btn_row">
                        <button onClick={deleteContact}>Delete</button>
                        <button onClick={switchUpdate}>Update</button>
                    </div>
                </div>)}
        </div>
    )
}

export default ContactInfo;