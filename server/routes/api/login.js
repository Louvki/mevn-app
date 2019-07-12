const router = require('express').Router();
const User = require('../../models/User');
const ResHelper = require('../../helpers/ResHelper');
const AuthHelper = require('../../helpers/AuthHelper');

router.route('/').post((req, res) => {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();

    if (!email || !AuthHelper.validEmail(email)) {
        return ResHelper.fail(res, { email: 'Please enter a valid email address' });
    }

    User.findOne({email})
        .then(user => {
            if (user.isValidPassword(password)) {
                const token = AuthHelper.createToken(user._id);
                ResHelper.success(res, { message: 'Login successful!', token });
            } else {
                ResHelper.fail(res, { message: 'Wrong password' });
            }
        })
        .catch(err => ResHelper.error(res, err))

});

module.exports = router;
