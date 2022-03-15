const jwt = require('jsonwebtoken');
const adminModel = require('../Models/admin.model');

module.exports.usertokencheck = async (req, res, next) => {
    let token;

    if (req.headers.authorizationbearer && req.headers.authorizationbearer.startsWith('Bearer')) {
        try {
            token = req.headers.authorizationbearer.split(':')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
           
            req.user = await adminModel.findOne({email:decoded.email,admin_id:decoded.admin_id}).select('-password');
            next();
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 401;
                return res.status(401).json({
                    message: 'Could Not Authorized!',
                });
            }
       }
    }
    if (!token) {
        return res.status(401).json({
            message: 'Not Authorized!',
        });
    }
};