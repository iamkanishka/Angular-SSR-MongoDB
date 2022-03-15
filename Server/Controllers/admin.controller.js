//Importing Required Modules
const userModel = require("../Models/user.model");
const adminModel = require("../Models/admin.model");

const bcrypt = require('bcryptjs');
const Util = require('../Utils/util')

/**
 * 
 * @param {{name,email,phone,password}} req Request has the incomming Data of User  
 * @param {{Status, message}} res Response provides for corresponding  request
 * @returns Returns with User Creation
 */
exports.createUser = async (req, res) => {
    const {
        name,
        email,
        phone,
        uniqueid
    } = req.body
    if (!name || name == null || name == undefined || String(name).length == 0) {
        return res.send({
            status: 3001,
            message: "Name is Required"
        })
    }
    if (!email || email === null || email == undefined || String(email).length == 0) {
        return res.send({
            status: 3001,
            message: "Email is Required"
        })
    }
    if (!Util.emailcheck(email)) {
        return res.send({
            status: 3001,
            message: "Please provide right formatted Email"
        })
    }
 
    if (!phone || phone == null || phone == undefined || String(phone).length == 0) {
        return res.send({
            status: 3001,
            message: "Phone Number is Required"
        })
    }

    try {


        const usercheck = await Util.userExistencecheck(email, phone)
        console.log(usercheck)
        if (!usercheck.success) {
            return res.send({
                status: usercheck.status,
                message: usercheck.Message
            })
        }


        const gensalt = await bcrypt.genSalt(10);
        const userPassword = 'JWT'+Math.floor(1000 + Math.random() * 9000)+new Date().getTime()
        const encryptedpassword = await bcrypt.hash( userPassword, gensalt);
        const user = new userModel({
            name: name,
            email: email,
            mobile: phone,
            password: encryptedpassword,
            isActive: false,
            isVerified: false,
            unique_id:uniqueid,

        })
        user.save(async (err, result) => {
            if (err) {
                console.log(err)
                return res.send({
                    status: 3020,
                    Message: err._message,
                    error: err.errors
                })
            } else {
                return res.send({
                    status: 3023,
                    Message: 'User Created Succesfully'
                })
            }
        })


    } catch (err) {
        console.log(err)
        return res.send({
            status: 3002,
            Message: 'User Created Succesfully'
        })
    }

}


/**
 * 
 * @param {{name,email,phone,UID}} req Request has the incomming Data of User  
 * @param {{Status, message}} res Response provides for corresponding  request
 * @returns Returns with User Edit
 */
exports.editUser = async (req, res) => {
    const {
        name,
        email,
        phone,
        uid

    } = req.body
    if (!name || name == null || name == undefined || String(name).length == 0) {
        return res.send({
            status: 3001,
            message: "Name is Required"
        })
    }
    if (!email || email === null || email == undefined || String(email).length == 0) {
        return res.send({
            status: 3001,
            message: "Email is Required"
        })
    }
    if (!Util.emailcheck(email)) {
        return res.send({
            status: 3001,
            message: "Please provide right formatted Email"
        })
    }
    if (!phone || phone == null || phone == undefined || String(phone).length == 0) {
        return res.send({
            status: 3001,
            message: "Phone Number is Required"
        })
    }
    if (!uid || uid == null || uid == undefined || String(uid).length == 0) {
        return res.send({
            status: 3001,
            message: "UID is Required"
        })
    }

    try {


        const usercheck = await Util.userExistencecheck(email, phone)
        console.log(usercheck)
        if (!usercheck.success) {
            return res.send({
                status: usercheck.status,
                message: usercheck.Message
            })
        }
      

 
        var userobjid = {
            '_id': mongoose.Types.ObjectId(uid),
         };

        const updateUser = {
            name: name,
            email: email,
            mobile: phone,
        }
        userModel.findOneAndUpdate(userobjid, updateUser)
        .exec()
        .then(async (result, data) => {
            return res.send({
                    status: 3023,
                    Message: 'User Edited  Succesfully'
                })
            
        }).catch((err)=>{
            console.log(err)
            return res.send({
                status: 3020,
                Message: err._message,
                error: err.errors
            })
        })



    } catch (err) {
        console.log(err)
        return res.send({
            status: 3002,
            Message: 'Something Went wrong Please try Again'
        })
    }

}


/**
 * 
 * Request has no incomming Data of User  
 * @param {{Status, message,data}} res Response provides for corresponding  request
 * @returns Returns with all the users list
 */
exports.getAllUsers = async (req, res) => {

    try {


        const users = await userModel.find(async (err, result) => {
            if (err) {
                console.log(err)
                return res.send({
                    status: 3020,
                    Message: err._message,
                    error: err.errors
                })
            } else {
                return res.send({
                    status: 3023,
                    Message: 'All Users Retrived Succesfully',
                    data:users
                })
            }
        }).select('-password')


    } catch (err) {
        console.log(err)
        return res.send({
            status: 3002,
            Message: 'Something Went wrong Please try Again'
        })
    }

}




/**
 * 
 * @param {{user_id}} req Request has the incomming Data of User  
 * @param {{Status, message}} res Response provides for corresponding  request
 * @returns Returns with User Deletion
 */
exports.deleteUser = async (req, res) => {

    const userId = req.body.id;
    const user = await userModel.findById(userId);

    if (!user) {
        const error = new Error("No user found!");
        error.statusCode = 402;
        throw error;
    }

    await user.findByIdAndRemove(userId);

    res.status(200).json({
        Status: 3000,
        message: "user deleted successfully",
    });

}

/**
 * 
 * @param {{name,email,phone,password}} req Request has the incomming Data of User  
 * @param {{Status, message}} res Response provides for corresponding  request
 * @returns Returns with SubAdmin Creation
 */
exports.createsub_Admin = async (req, res) => {
    const {
        name,
        email,
        phone,
        password
    } = req.body
    if (!name || name == null || name == undefined || String(name).length == 0) {
        return res.send({
            status: 3001,
            message: "Name is Required"
        })
    }
    if (!email || email === null || email == undefined || String(email).length == 0) {
        return res.send({
            status: 3001,
            message: "Email is Required"
        })
    }
    if (!Util.emailcheck(email)) {
        return res.send({
            status: 3001,
            message: "Please provide right formatted Email"
        })
    }
    if (!Util.passwordcheck(password)) {
        return res.send({
            status: 3001,
            message: "Please provide right formatted Password"
        })
    }
    if (!phone || phone == null || phone == undefined || String(phone).length == 0) {
        return res.send({
            status: 3001,
            message: "Phone Number is Required"
        })
    }

    try {


        const usercheck = await Util.userExistencecheck(email, phone)
        console.log(usercheck)
        if (!usercheck.success) {
            return res.send({
                status: usercheck.status,
                message: usercheck.Message
            })
        }


        const gensalt = await bcrypt.genSalt(10);
        const encryptedpassword = await bcrypt.hash(password, gensalt);
        const user = new adminModel({
            name: name,
            email: email,
            mobile: phone,
            password: encryptedpassword,
            isActive: false,
            isVerified: false
        })
        user.save(async (err, result) => {
            if (err) {
                console.log(err)
                return res.send({
                    status: 3020,
                    Message: err._message,
                    error: err.errors
                })
            } else {
                return res.send({
                    status: 3023,
                    Message: 'User Created Succesfully'
                })
            }
        })


    } catch (err) {
        console.log(err)
        return res.send({
            status: 3002,
            Message: 'Subadmin Created Succesfully'
        })
    }

}

/**
 * 
 * @param {{email,phone,UID}} req Request has the incomming Data of User  
 * @param {{Status, message}} res Response provides for corresponding  request
 * @returns Returns with Update Role for user 
 */
exports.assignRoletoUser = async (req, res) => {

    const {
        name,
        email,
        phone,
     
    } = req.body
 
    if (!email || email === null || email == undefined || String(email).length == 0) {
        return res.send({
            status: 3001,
            message: "Email is Required"
        })
    }
    if (!Util.emailcheck(email)) {
        return res.send({
            status: 3001,
            message: "Please provide right formatted Email"
        })
    }

    if (!phone || phone == null || phone == undefined || String(phone).length == 0) {
        return res.send({
            status: 3001,
            message: "Phone Number is Required"
        })
    }
    if (!uid || uid == null || uid == undefined || String(uid).length == 0) {
        return res.send({
            status: 3001,
            message: "UID is Required"
        })
    }

    try {


        const usercheck = await Util.userExistencecheck(email, phone)
        console.log(usercheck)
        if (!usercheck.success) {
            return res.send({
                status: usercheck.status,
                message: usercheck.Message
            })
        }
      

 
        var userobjid = {
            '_id': mongoose.Types.ObjectId(uid),
         };

        const updateUser = {
            role: "Paid",
        }
        userModel.findOneAndUpdate(userobjid, updateUser)
        .exec()
        .then(async (result, data) => {
            return res.send({
                    status: 3023,
                    Message: 'User Role Updated Succesfully'
                })
            
        }).catch((err)=>{
            console.log(err)
            return res.send({
                status: 3020,
                Message: err._message,
                error: err.errors
            })
        })





    }catch(err){
        console.log(err)

    }

}


