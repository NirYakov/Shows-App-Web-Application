

// const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

//  /\w+(\w|\d)*@\w+(\w|\d)*\.\w+(\w|\d)/

const emailRegex = /\w+(\w|\d)*@\w+(\w|\d)*\.\w+(\w|\d)/;

exports.isEmailValid = (email) => {
    if (!email)
        return false;

    if (email.length > 254)
        return false;

    const valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    const parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    const domainParts = parts[1].split(".");
    if (domainParts.some((part) => { return part.length > 63; }))
        return false;

    return true;
}


// Validators.pattern(`([A-Za-z0-9\-\_]+)`)
const usernameRegex = /^([A-Za-z0-9\-\_]+)$/;

exports.isUsernameValid = (username) => {
    if (!username) {
        return false;
    }

    if ((username.length < 4) || (username.length > 15)) {
        return false;
    }

    const valid = usernameRegex.test(username);
    if (!valid) {
        return false;
    }

    return true;
}
