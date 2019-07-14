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

// Create company
router.route('/').post(async (req, res) => {
    const { name, address, city, country, phone, } = req.body;
    const email = req.body.email ? req.body.email.toLowerCase() : undefined;
    let user;

    // Role validation
    try {
        const payload = await AuthHelper.verifyToken(req.headers.authorization);
        user = await User.findById(payload.userId);
        if (!user) {
            return ResHelper.fail(res, 'Access denied: You need to be logged in to add a company', 403);
        }
    } catch (err) {
        return ResHelper.error(res, err);
    }

    // Input validation
    if (!name) { return ResHelper.fail(res, 'Name is required') }
    if (!address) { return ResHelper.fail(res, 'Address is required') }
    if (!city) { return ResHelper.fail(res, 'City is required') }
    if (!country) { return ResHelper.fail(res, 'Country is required') }
    if (!!email && !AuthHelper.validEmail(email)) { return ResHelper.fail(res, 'Invalid email') }

    // Creating company
    const newCompany = new Company({ name, address, city, country });
    if (email) { newCompany.email = email; }
    if (phone) { newCompany.phone = phone; }

    // Save with transaction
    const session = await mongoose.startSession()
    session.startTransaction();
    try {
        const company = await newCompany.save();
        user.companies[company.id] = true;

        await user.updateOne(user);
        await session.commitTransaction();
        await session.endSession();
        ResHelper.success(res, company)
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        return ResHelper.error(res, err)
    }
})



// Update company
router.route('/:id').put(async (req, res) => {
    const { name, address, city, country, email, phone, _id } = req.body.company;

    // Role validation
    try {
        const payload = await AuthHelper.verifyToken(req.headers.authorization);
        const user = await User.findById(payload.userId);
        if (!(user.companies[companyId] || user.companiesBeneficial[companyId])) {
            return ResHelper.fail(res, 'Access denied: You need to be the owner or a co-owner to change the company', 403);
        }
    } catch (err) {
        return ResHelper.error(res, err);
    }


    // Input validation
    if (!name && name !== undefined) { return ResHelper.fail(res, 'Name is required') }
    if (!address && address !== undefined) { return ResHelper.fail(res, 'Address is required') }
    if (!city && city !== undefined) { return ResHelper.fail(res, 'City is required') }
    if (!country && country !== undefined) { return ResHelper.fail(res, 'Country is required') }

    // Creating update
    const update = {};
    if (name) { update.name = name; }
    if (address) { update.address = address; }
    if (city) { update.city = city; }
    if (country) { update.country = country; }
    if (email) { update.email = email; }
    if (phone) { update.phone = phone; }

    // Update
    Company.findByIdAndUpdate(companyId, update, { new: true })
        .then(company => ResHelper.success(res, company))
        .catch(err => ResHelper.error(res, err))
})

/*
TODO: 
When I delete a company I am trying to remove references of the company from the user.
However mongoDb for some reason does not want to delete the obejct property.
$set either doesnt work or I am not using properly. So there will always be one reference
of a company on an user.
*/
// Delete company
router.route('/:id').delete(async (req, res) => {
    const companyId = req.params.id;

    // Role validation
    try {
        const payload = await AuthHelper.verifyToken(req.headers.authorization);
        const user = await User.findById(payload.userId);
        if (!user.companies[companyId]) {
            return ResHelper.fail(res, 'Access denied: You need to be the owner to delete a company', 403);
        }
    } catch (err) {
        return ResHelper.error(res, err);
    }

    // Delete the company and the users references to it. Transaction
    const session = await mongoose.startSession()
    session.startTransaction();
    try {
        // Find the user who owned the company and remove his reference.
        const key = 'companies.' + companyId;
        const query = {};
        query[key] = true;
        const owner = await User.findOne(query);
        delete owner.companies[companyId];
        if (!Object.keys(owner.companies).length) {
            delete owner.companies;
        }

        await User.findByIdAndUpdate(owner._id, { $set: owner })

        // Find all users who were beneficial owners and remove their reference to the company
        const key2 = 'companiesBeneficial.' + companyId;
        const query2 = {};
        query2[key2] = true;
        const beneficialOwners = await User.find(query2);
        beneficialOwners.forEach(async user => {
            delete user.companiesBeneficial[companyId];
            if (!Object.keys(user.companiesBeneficial).length) {
                delete user.companiesBeneficial;
            }
            await User.findByIdAndUpdate(user._id, { $set: user })
        })

        await Company.findByIdAndDelete(req.params.id)
        await session.commitTransaction();
        await session.endSession();
        ResHelper.success(res, { _id: companyId })
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        return ResHelper.error(res, err)
    }
})

// Get beneficial owners
router.route('/:id/invite').get(async (req, res) => {
    const companyId = req.params.id
    const key = 'companiesBeneficial.' + companyId;
    const query = {};
    query[key] = true;


    User.find(query)
        .then(users => {
            const beneficialOwners = users.map(x => {
                return { firstName: x.firstName, lastName: x.lastName }
            })
            return ResHelper.success(res, beneficialOwners)
        })
        .catch(err => ResHelper.error(res, err));
})

// Add beneficial owner
router.route('/:id/invite').post(async (req, res) => {
    const email = req.body.email ? req.body.email.toLowerCase() : undefined;
    const companyId = req.params.id;

    // Role validation
    try {
        const payload = await AuthHelper.verifyToken(req.headers.authorization);
        const user = await User.findById(payload.userId);
        if (!user) {
            return ResHelper.fail(res, 'Access denied: You need to be the owner to be able to add beneficial owners', 403);
        }
        if (user.companies[companyId]) {
            return ResHelper.fail(res, 'This user owns the company');
        }
        if (user.companiesBeneficial[companyId]) {
            return ResHelper.fail(res, 'This user is aready a beneficial owner');
        }
    } catch (err) {
        return ResHelper.error(res, err);
    }

    // Input validation
    if (!email || !AuthHelper.validEmail(email)) {
        return ResHelper.fail(res, 'Invalid email');
    }
    try {
        const company = await Company.findById(companyId);
        if (!company) {
            return ResHelper.fail(res, 'The company you requested does not exist', 404);
        }
    } catch (err) {
        return ResHelper.error(res, err);
    }

    // Add
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return ResHelper.fail(res, 'No user found with that email');
            }
            user.companiesBeneficial[companyId] = true;
            user.updateOne(user)
                .then(() => ResHelper.success(res, { message: 'Beneficial owner added' }))
                .catch((err => ResHelper.error(res, err)))

        })
        .catch(err => ResHelper.error(res, err))
})

module.exports = router;