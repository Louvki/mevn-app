const router = require('express').Router();
const User = require('../../models/User');
const ResHelper = require('../../helpers/ResHelper');
const AuthHelper = require('../../helpers/AuthHelper');

router.route('/').post((req, res) => {
    const { firstName, lastName, password } = req.body
    const email = req.body.email ? req.body.email.toLowerCase() : undefined;

    // Validation
    if (!firstName) { return ResHelper.fail(res, 'First Name is required') }
    if (!lastName) { return ResHelper.fail(res, 'Last Name is required') }
    if (!email || !AuthHelper.validEmail(email)) { return ResHelper.fail(res, 'Valid email is required') }
    if (!password || !AuthHelper.validPassword(password)) { return ResHelper.fail(res, 'Passowrd must be at least 6 characters') }


    User.find({ email })
        .then(users => {
            // Check if email is taken
            if (users.length) {
                return ResHelper.fail(res, 'An account with this email already exists')
            }

            // Save user
            const newUser = User({ firstName, lastName, email, password });
            newUser.save()
                .then(user => {
                    const token = AuthHelper.createToken(user)
                    ResHelper.success(res, { message: 'Registration successful!', token });
                })
                .catch(err => ResHelper.error(res, err))
        })
        .catch(err => ResHelper.error(res, err));
});

module.exports = router;

