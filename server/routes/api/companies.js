const mongoose = require('mongoose');
const router = require('express').Router();
const Company = require('../../models/Company');
const User = require('../../models/User');
const ResHelper = require('../../helpers/ResHelper');
const AuthHelper = require('../../helpers/AuthHelper');

// Get all companies
router.route('/').get((req, res) => {
    Company.find()
        .then(companies => ResHelper.success(res, companies))
        .catch(err => ResHelper.error(res, err));
})

// Get company
router.route('/:id').get((req, res) => {
    Company.findById(req.params.id)
        .then(company => ResHelper.success(res, company))
        .catch(err => ResHelper.error(res, err))
})

// Add company
router.route('/').post(async (req, res) => {
    const { name, address, city, country, phoneNumber, } = req.body;
    const email = req.body.email.toLowerCase();
    let user;

    // Role validation
    try {
        const payload = await AuthHelper.verifyToken(req.headers.authorization);
        user = await User.findById(payload.sub);
        if (!user) {
            return ResHelper.fail(res, { auth: 'Access denied: You need to be logged in to add a company' });
        }
    } catch (err) {
        return ResHelper.fail(res, { token: err.message });
    }

    // Input validation
    const failData = {};
    if (!name) { failData.name = ' Name is required' }
    if (!address) { failData.address = 'Address is required' }
    if (!city) { failData.city = 'City is required' }
    if (!country) { failData.country = 'Country is required' }
    if (!!email && !AuthHelper.validEmail(email)) { failData.email = 'Invalid email' }
    if (Object.keys(failData).length) {
        return ResHelper.fail(res, failData);
    }

    // Creating company
    const newCompany = new Company({ name, address, city, country });
    if (email) { newCompany.email = email; }
    if (phoneNumber) { newCompany.phoneNumber = phoneNumber; }

    // Save with transaction
    const session = await mongoose.startSession()
    session.startTransaction();
    try {
        const company = await newCompany.save();
        user.companies[company.id] = true;
        await user.save();
        await session.commitTransaction();
        await session.endSession();
        ResHelper.success(res, company)
    }
    catch  {
        await session.abortTransaction();
        session.endSession();
        return ResHelper.error(res, err)
    }
})



// Update company
router.route('/:id').put(async (req, res) => {
    const { name, address, city, country, email, phoneNumber } = req.body;
    const companyId = req.params.id;

    // Role validation
    try {
        const payload = await AuthHelper.verifyToken(req.headers.authorization);
        const user = await User.findById(payload.sub);
        if (!user.companies[companyId] || !user.companiesPartner[companyId]) {
            return ResHelper.fail(res, { auth: 'Access denied: You need to be the owner or a co-owner to change the company' });
        }
    } catch (err) {
        return ResHelper.fail(res, { token: err.message });
    }


    // Input validation
    const failData = {};
    if (!name && name !== undefined) { failData.name = ' Name is required' }
    if (!address && address !== undefined) { failData.address = 'Address is required' }
    if (!city && city !== undefined) { failData.city = 'City is required' }
    if (!country && country !== undefined) { failData.country = 'Country is required' }
    if (Object.keys(failData).length) {
        return ResHelper.fail(res, failData);
    }

    // Creating update
    const update = {};
    if (name) { update.name = name; }
    if (address) { update.address = address; }
    if (city) { update.city = city; }
    if (country) { update.country = country; }
    if (email) { update.email = email; }
    if (phoneNumber) { update.phoneNumber = phoneNumber; }

    // Update
    Company.findByIdAndUpdate(companyId, update)
        .then(company => ResHelper.success(res, { _id: company._id }))
        .catch(err => ResHelper.error(res, err))
})

// Delete company
router.route('/:id').delete(async (req, res) => {

    // Role validation
    try {
        const payload = await AuthHelper.verifyToken(req.headers.authorization);
        const user = await User.findById(payload.sub);
        if (!user.companies[companyId] || !user.companiesPartner[companyId]) {
            return ResHelper.fail(res, { auth: 'Access denied: You need to be the owner to delete a company' });
        }
    } catch (err) {
        return ResHelper.fail(res, { token: err.message });
    }

    // Delete
    Company.findByIdAndDelete(req.params.id)
        .then(company => ResHelper.success(res, { _id: company._id }))
        .catch(err => ResHelper.error(res, err))
})


// Add partner(Beneficial owner)
router.route('/:id/invite').post(async (req, res) => {
    const email = req.body.email.toLowerCase();
    const companyId = req.params.id;

    // Role validation
    try {
        const payload = await AuthHelper.verifyToken(req.headers.authorization);
        const user = await User.findById(payload.sub);
        if (!user) {
            return ResHelper.fail(res, { auth: 'Access denied: You need to be the owner to be able to add partners' });
        }
    } catch (err) {
        return ResHelper.fail(res, { token: err.message });
    }

    // Input validation
    if (!!email && !AuthHelper.validEmail(email)) {
        return ResHelper.fail(res, { email: 'Invalid email' });
    }

    // Add
    User.find({ email })
        .then(user => {
            if (!user) {
                ResHelper.fail(res, { email: 'No user found with that email' });
            }
            user.companiesPartner[companyId] = true;
            user.save()
                .then(() => ResHelper.success(res, { message: 'Partner added' }))
                .catch((err => ResHelper.error(res, err)))

        })
        .catch(err => ResHelper.error(res, err))
})


module.exports = router;