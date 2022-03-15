const userModel = require("../Models/user.model");
/**
 * Xhecks the Email Pattern and return the email validation status
 * @param {{name,email,phone,password}} req Request has the incomming Email of User  
 * @param {{Status, message}} res Response provides for corresponding  request
 * @returns Returns Email validation Status
 */
exports.emailcheck = (email) => {

    const emailstatus = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    return emailstatus
}

/**
 * Checks the Password Pattern and return the Password validation status
 * @param {{password}} req Request has the incomming Password of User  
 * @param {{Passwordvalidattionstatus}} res Response provides for corresponding  request
 * @returns Returns Password validattion Status
 */
exports.passwordcheck = (password) => {

    const passwordstatus = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{5,}$/.test(password)
    return passwordstatus
}

/**
 * Checks the user existence from the user database
 * @param {{email,phone}} req Request has the incomming Email and mobile number of User  
 * @param {{Status, Message, Success}} res Response provides for corresponding  request
 * @returns Returns with User Creation
 */
exports.userExistencecheck = async (email, phone) => {
    const useremailcheck = await userModel.findOne({
        email: email
    });
    const userphonecheck = await userModel.findOne({
        mobile: phone
    });
    const useremailphonecheck = await userModel.findOne({
        email: email,
        mobile: phone
    });

    if (useremailcheck) {
        return {
            status: 3099,
            Message: 'Email Already Exits, Please try with Differnt one',
            success: false

        }
    } else if (userphonecheck) {
        return {
            status: 3099,
            Message: 'Phone number Already Exits, Please try with Differnt one',
            success: false

        }
    } else if (useremailphonecheck) {
        return {
            status: 3099,
            Message: 'User Already Exits',
            success: false
        }
    }else{
        return {
           success: true
        }
    }

}