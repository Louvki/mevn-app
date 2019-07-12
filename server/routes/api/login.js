const router = require('express').Router();
const JWT = require('jsonwebtoken');
const User = require('../../models/User');
const Resnponder = require('../../helpers/responder');
const Hasher = require('../../helpers/hasher');

router.route('/').post((req, res) => {
    const { password } = req.body;
    const email = req.body.email.toLowerCase();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const failData = {};
    if (!email || !emailRegex.test(email)) { failData.email = 'Please enter a valid email address' }
    if (Object.keys(failData).length) {
        return Resnponder.fail(res, failData);
    }

    User.findOne({ 'email': email })
        .then(user => {
            if (Hasher.validPassword(password, user.password)) {
                const token = JWT.sign({ sub: user._id, exp: new Date().getDate() + 1 }, 'please-no-steal-c;')
                Resnponder.success(res, { message: 'Login successful!', token });
            } else {
                Resnponder.fail(res, { message: 'Wrong password' });
            }
        })
        .catch(err => Resnponder.error(res, err))

});

module.exports = router;
