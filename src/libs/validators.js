function validatePhoneNumber(phone_number) {
    if (!phone_number.match(/^[0-9]*$/))
        throw new Error("Invalid phone characters")
    else if (!phone_number.match(/^(29|33|44|25)/))
        throw new Error("Invalid mobile operator")
    else if (!phone_number.match(/^(29|33|44|25)[0-9]{7}$/))
        throw new Error("Invalid phone number")
    return true
}

function validateUsername(username) {
    if (!username.match(/^[A-Za-z0-9_]*$/))
        throw new Error("Not allowed username characters: A-Z, a-z, 0-9, _")
    else if (!username.match(/^.{6,}$/))
        throw new Error("Min username length: 6")
    return true
}

function validatePassword(password) {
    if (!password.match(/^[A-Za-z0-9!#$%&()*+,\-./:;<>=?@^`{|}~]*$/))
        throw new Error("Not allowed password characters")
    else if (!password.match(/^.{6,}$/))
        throw new Error("Min password length: 6")
    return true
}

function validateName(name) {
    if (!name.match(/^[А-Яа-яA-Za-z0-9_ -]*$/))
        throw new Error("Not allowed name characters")
    else if (!name.match(/^.{3,}$/))
        throw new Error("Min name length: 3")
    return true
}

export {
    validatePhoneNumber,
    validateUsername,
    validatePassword,
    validateName,
}