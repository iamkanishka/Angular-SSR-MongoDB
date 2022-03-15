const preURL = '/api/user/'
const userController = require('../Controllers/user.controller')
const userMiddleware = require('../Middlewares/user.middleware')
const generalMiddleware = require('../Middlewares/general.middleware')


exports.userRoutes = (app) => {
    app.post(preURL + 'userRegisteration', generalMiddleware.apptokencheck, [
        userController.userRegisteration
    ])

    app.post(preURL + 'userSigninwithemailpassword', generalMiddleware.apptokencheck, [
        userController.usersigninwithemailpassword
    ])

    app.post(preURL + 'getUserDetails', generalMiddleware.apptokencheck, userMiddleware.usertokencheck, [
        userController.getUserDetails
    ])
    app.post(preURL + 'editUserDetails', generalMiddleware.apptokencheck, userMiddleware.usertokencheck, [
        userController.editUserDetails
    ])
}