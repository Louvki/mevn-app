const router = require('express').Router();
const JWT = require('jsonwebtoken');
const User = require('../../models/User');
const Resnponder = require('../../helpers/responder');
const Hasher = require('../../helpers/hasher');

router.route('/').post((req, res) => {
    const { firstName, lastName, password } = req.body
    const email = req.body.email.toLowerCase();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const passwordRegex = /^.{6,}$/;

    // Validation
    const failData = {};
    if (!firstName) { failData.firstName = 'First name is required' }
    if (!lastName) { failData.lastName = 'Last name is required' }
    if (!email || !emailRegex.test(email)) { failData.email = 'Valid email is required' }
    if (!password || passwordRegex.test(password)) { failData.password = 'Password must be at least 6 characters' }
    if (Object.keys(failData).length) {
        return Resnponder.fail(res, failData);
    }

    User.find({ 'email': email })
        .then(users => {
            // Check if email is taken
            if (users.length) {
                Resnponder.fail(res, { email: 'An account with this email already exists' })
            }
            // Save user
            const newUser = User({ firstName, lastName, email, password: Hasher.generateHash(password) });
            newUser.save()
                .then(user => {
                    const token = JWT.sign({ sub: user._id, exp: new Date().getDate() + 1 }, 'please-no-steal-c;')
                    Resnponder.success(res, { message: 'Registration successful!', token });
                })
                .catch(err => Resnponder.error(res, err))
        })
        .catch(err => Resnponder.error(res, err));
});

module.exports = router;

