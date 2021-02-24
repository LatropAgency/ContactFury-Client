async function signIn(username, password) {
    let body = {
        username: username,
        password: password,
    }
    var url = new URL('https://contactfury.herokuapp.com/api/auth/signin')
    let response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        return await response.json()
    } else
        return await response.json()
}

async function signUp(username, password, phone_number) {
    let body = {
        username: username,
        phone_number: phone_number,
        password: password,
    }
    var url = new URL('https://contactfury.herokuapp.com/api/auth/signup')
    let response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        return await response.json()
    } else
        return await response.json()
}

async function getCurrentUser(token) {
    var url = new URL('https://contactfury.herokuapp.com/api/user')
    let response = await fetch(url, {
        method: "GET",
        headers: {
            'x-access-token': token,
        },
    })

    if (response.ok) {
        return await response.json()
    } else
        return false
}

async function getCategories(token) {
    var url = new URL('https://contactfury.herokuapp.com/api/category')
    let response = await fetch(url, {
        method: "GET",
        headers: {
            'x-access-token': token,
        },
    })

    if (response.ok) {
        return await response.json()
    }
}

async function getContacts(token, page = 0, categoryId = null, name = null) {
    let params = {'page': page}
    if (categoryId)
        params.categoryId = categoryId
    if (name)
        params.name = name
    var url = new URL('https://contactfury.herokuapp.com/api/contact')
    url.search = new URLSearchParams(params)
    let response = await fetch(url, {
        method: "GET",
        headers: {
            'x-access-token': token,
        },
    })

    if (response.ok) {
        return await response.json()
    } else
        return false
}

async function deleteContact(token, id) {
    var url = new URL(`https://contactfury.herokuapp.com/api/contact/${id}`)
    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            'x-access-token': token,
        },
    })

    if (response.ok) {
        return true
    } else
        return false
}

async function getContactCount(token, categoryId = null, name = null) {
    let params = {}
    if (categoryId)
        params.categoryId = Number(categoryId)
    if (name)
        params.name = name
    var url = new URL('https://contactfury.herokuapp.com/api/contact/count')
    url.search = new URLSearchParams(params)
    let response = await fetch(url, {
        method: "GET",
        headers: {
            'x-access-token': token,
        },
    })

    if (response.ok)
        return await response.json()
}

async function createContact(token, name, phone_number, categoryId) {
    var url = new URL('https://contactfury.herokuapp.com/api/contact')
    let response = await fetch(url, {
        method: "POST",
        headers: {
            'x-access-token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            phone_number: phone_number,
            categoryId: Number(categoryId)
        })
    })

    if (response.ok) {
        return await response.json()
    } else
        alert(await response)
}

async function updateContact(token, contact_id, name, phone_number, categoryId) {
    var url = new URL(`https://contactfury.herokuapp.com/api/contact/${contact_id}`)
    let response = await fetch(url, {
        method: "PUT",
        headers: {
            'x-access-token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            phone_number: phone_number,
            categoryId: Number(categoryId)
        })
    })

    if (response.ok) {
        return await response.json()
    } else
        alert(await response.json())
}

async function changePassword(token, password, newPassword) {
    var url = new URL('https://contactfury.herokuapp.com/api/user')
    let response = await fetch(url, {
        method: "PUT",
        headers: {
            'x-access-token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            newPassword: newPassword,
        })
    })

    if (response.ok) {
        return await response.json()
    } else
        return await response.json()
}

function validatePhoneNumber(phone_number) {
    return phone_number.match(/^(29|33|44|25)[0-9]{7}$/)
}

function validateUsername(username) {
    return username.match(/^[A-Za-z0-9_]{6,}$/)
}

function validatePassword(password) {
    return password.match(/^[A-Za-z0-9_.()+,~=?-@#$%^&*!]{6,}$/)
}

function validateName(name) {
    return name.match(/^[А-Яа-яA-Za-z0-9_ ]{3,}$/)
}

export {
    updateContact,
    createContact,
    getCategories,
    getContactCount,
    signIn,
    signUp,
    deleteContact,
    getContacts,
    getCurrentUser,
    changePassword,
    validatePhoneNumber,
    validateUsername,
    validatePassword,
    validateName,
}
export default signIn