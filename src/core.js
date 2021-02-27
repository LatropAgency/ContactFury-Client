async function signIn(username, password) {
    let body = {
        username: username,
        password: password,
    }
    let url = new URL('https://contactfury.herokuapp.com/api/auth/signin')
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
    } else {
        let errorResponse = await response.json();
        throw new Error(errorResponse.message);
    }
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
    } else {
        let errorResponse = await response.json();
        throw new Error(errorResponse.message);
    }
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

async function banUsers(token, userId) {
    var url = new URL(`https://contactfury.herokuapp.com/api/user/ban/${userId}`)
    let response = await fetch(url, {
        method: "GET",
        headers: {
            'x-access-token': token,
        },
    })

    if (response.ok) {
        return await response.json();
    } else {
        let errorResponse = await response.json();
        alert(errorResponse);
    }
}

async function getUsers(token, page = 0, username = null, ) {
    let params = {'page': page}
    if (username)
        params.username = username
    var url = new URL('https://contactfury.herokuapp.com/api/user/all')
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

function setEmpty(querySelector) {
    let element = document.querySelector(querySelector);
    element.value = null;
}

export {
    updateContact,
    createContact,
    getCategories,
    getContactCount,
    signIn,
    setEmpty,
    signUp,
    deleteContact,
    getContacts,
    getCurrentUser,
    changePassword,
    getUsers,
    banUsers,
}