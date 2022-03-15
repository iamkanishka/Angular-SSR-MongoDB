//Impiorting Required Modules
const userModel = require("../Models/user.model");
const bcrypt = require('bcryptjs');
const Util = require('../Utils/util')
const jwt = require("jsonwebtoken");

/**
 * 
 * @param {{name,email,phone,password}} req Request has the incomming Data of User  
 * @param {{Status, message}} res Response provides for corresponding  request
 * @returns Returns with User Creation
 */
exports.userRegisteration = async (req, res) => {
    console.log('user creation')
    const {
        name,
        email,
        phone,
        password,
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

        if (!usercheck.success) {
            return res.send({
                status: usercheck.status,
                message: usercheck.Message
            })
        }


        const gensalt = await bcrypt.genSalt(10);
        const encryptedpassword = await bcrypt.hash(password, gensalt);
        const user = new userModel({
            name: name,
            email: email,
            mobile: phone,
            password: encryptedpassword,
            isActive: false,
            isVerified: false,
            unique_id:uniqueid,
            role:"normal"
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
            status: 3000,
            Message: 'Something Went wrong Please try Again'
        })
    }

}

/**
 * 
 * @param {{email,password}} req Request has the incomming Data of User's email and password  
 * @param {{Status, message, token}} res Response provides for corresponding  request
 * @returns Returns with User's token, with status and message for the signin
 */
exports.usersigninwithemailpassword = async (req, res) => {
    const {
        email,
        password
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
    if (!password || password === null || password == undefined || String(password).length == 0) {
        return res.send({
            status: 3001,
            message: "Password is Required"
        })
    }
    if (!Util.passwordcheck(password)) {
        return res.send({
            status: 3001,
            message: "Please provide right formatted Password"
        })
    }

    try {
        //Checking Users Email for users Existence with Email
        const user = await userModel.findOne({
            email: email
        });
        if (!user) {
            return res.send({
                status: 3101,
                message: "User dosen't Exist"
            })
        } else {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(200).json({
                    "message": "Invalid Password",
                    "status": 3101,
                })
            }
            //Generating JWT token
            const token = jwt.sign({
                email: user.email,
                user_id: user.user_id,
            }, process.env.JWT_SECRET, {
                expiresIn: "10d"
            });

            res.status(200).json({
                token: token,
                userId: user.user_id,
                message: "User Logged in"
            });

        }


    } catch (err) {
        console.log(err)
        return res.send({
            status: 3000,
            Message: 'Something Went wrong Please try Again'
        })
    }

}

/**
 * 
 * @param {{email,userId}} req Request has the incomming Data of User's email and password  
 * @param {{Status, message, token}} res Response provides for corresponding  request
 * @returns Returns with User's token, with status and message for the signin
 */
exports.getUserDetails = async (req, res) => {

    const {
        email,
        userId
    } = req.body

    try {


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

        const user = await userModel.findOne({
            email: email,
            user_id: userId
        }).select('-password')
        if (!user) {
            return res.send({
                status: 3101,
                message: "User dosen't Exist"
            })
        } else {
            res.status(200).json({

                data: user,
                message: "User Details"
            });
        }
    } catch (err) {
        console.log(err)
        return res.send({
            status: 3000,
            Message: 'Something Went wrong Please try Again'
        })
    }
}

/**
 * 
 * @param {{name,email,phone,UID}} req Request has the incomming Data of User  
 * @param {{Status, message}} res Response provides for corresponding  request
 * @returns Returns with User Edit
 */
exports.editUserDetails = async (req, res) => {
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