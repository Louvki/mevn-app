const router = require('express').Router();
const User = require('../../models/User');
const ResHelper = require('../../helpers/ResHelper');
const AuthHelper = require('../../helpers/AuthHelper');

router.route('/').post((req, res) => {
    const { firstName, lastName, password } = req.body
    const email = req.body.email.toLowerCase();

    // Validation
    const failData = {};
    if (!firstName) { failData.firstName = 'First name is required' }
    if (!lastName) { failData.lastName = 'Last name is required' }
    if (!email || !AuthHelper.validEmail(email)) { failData.email = 'Valid email is required' }
    if (!password || !AuthHelper.validPassword(password)) { failData.password = 'Password must be at least 6 characters' }
    if (Object.keys(failData).length) {
        return ResHelper.fail(res, failData);
    }

    User.find(email)
        .then(users => {
            // Check if email is taken
            if (users.length) {
                ResHelper.fail(res, { email: 'An account with this email already exists' })
            }

            // Save user
            const newUser = User({ firstName, lastName, email, password: AuthHelper.generateHash(password) });
            newUser.save()
                .then(user => {
                    const token = AuthHelper.createToken(user._id)
                    ResHelper.success(res, { message: 'Registration successful!', token });
                })
                .catch(err => ResHelper.error(res, err.message))
        })
        .catch(err => ResHelper.error(res, err.message));
});

module.exports = router;

