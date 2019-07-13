const router = require('express').Router();
const Company = require('../../models/Company');
const ResHelper = require('../../helpers/ResHelper');
const AuthHelper = require('../../helpers/AuthHelper');

// Get all companies
router.route('/').get((req, res) => {
    Company.find()
        .then(companies => ResHelper.success(res, companies))
        .catch(err => ResHelper.error(res, err));
})

// Add company
router.route('/').post((req, res) => {
    const { name, address, city, country, phoneNumber, } = req.body;
    const email = req.body.email.toLowerCase();

    // TODO: Get user from headers


    const failData = {};
    if (!name) { failData.name = ' Name is required' }
    if (!address) { failData.address = 'Address is required' }
    if (!city) { failData.city = 'City is required' }
    if (!country) { failData.country = 'Country is required' }
    if (!!email && !AuthHelper.validEmail(email)) { failData.email = 'Invalid email' }
    if (Object.keys(failData).length) {
        return ResHelper.fail(res, failData);
    }

    const newCompany = new Company({ name, address, city, country });
    if (email) { newCompany.email = email; }
    if (phoneNumber) { newCompany.phoneNumber = phoneNumber; }

    newCompany.save()
        .then((company) => ResHelper.success(res, company))
        .catch((err) => ResHelper.error(res, err))
})

// Get company
router.route('/:id').get((req, res) => {
    Company.findById(req.params.id)
        .then(company => ResHelper.success(res, company))
        .catch(err => ResHelper.error(res, err))
})

// Update company
router.route('/:id').put((req, res) => {
    const { name, address, city, country, email, phoneNumber } = req.body;

    // TODO: Get user from headers
    const test = req.headers;
    console.log(test);


    const failData = {};
    if (!name && name !== undefined) { failData.name = ' Name is required' }
    if (!address && address !== undefined) { failData.address = 'Address is required' }
    if (!city && city !== undefined) { failData.city = 'City is required' }
    if (!country && country !== undefined) { failData.country = 'Country is required' }
    if (Object.keys(failData).length) {
        return ResHelper.fail(res, failData);
    }

    const update = {};
    if (name) { update.name = name; }
    if (address) { update.address = address; }
    if (city) { update.city = city; }
    if (country) { update.country = country; }
    if (email) { update.email = email; }
    if (phoneNumber) { update.phoneNumber = phoneNumber; }

    Company.findByIdAndUpdate(req.params.id, update)
        .then(company => ResHelper.success(res, { _id: company._id }))
        .catch(err => ResHelper.error(res, err))
})

// Delete company
router.route('/:id').delete((req, res) => {
    // TODO: Get user from headers

    Company.findByIdAndDelete(req.params.id)
        .then(company => ResHelper.success(res, { _id: company._id }))
        .catch(err => ResHelper.error(res, err))
})

module.exports = router;