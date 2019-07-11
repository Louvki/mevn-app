const router = require('express').Router();
const Company = require('../../models/Company');
const Response = require('../../models/Response');

router.route('/').get((req, res) => {
    Company.find()
        .then(companies => Response.success(res, companies))
        .catch(err => Response.error(res, err));
})

// Add company
router.route('/').post((req, res) => {
    const { name, address, city, country, email, phoneNumber, } = req.body;

    const failData = {};
    if (!name) { failData.name = ' Name is required' }
    if (!address) { failData.address = 'Address is required' }
    if (!city) { failData.city = 'City is required' }
    if (!country) { failData.country = 'Country is required' }
    if (Object.keys(failData).length) {
        Response.fail(res, failData);
        return;
    }


    const newCompany = new Company({ name, address, city, country });
    if (email) { newCompany.email = email; }
    if (phoneNumber) { newCompany.phoneNumber = phoneNumber; }

    // TODO: Return Id
    newCompany.save()
        .then(() => Response.success(res, null))
        .catch((err) => Response.error(res, err))
})

// Get company
router.route('/:id').get((req, res) => {
    Company.findById(req.params.id)
        .then(company => Response.success(res, company))
        .catch(err => Response.error(res, err))
})

// Update company
router.route('/:id').put((req, res) => {
    Company.findByIdAndUpdate(req.params.id)
        .then(company => Response.success(res, company))
        .catch(err => Response.error(res, err))
})

// Delete company
router.route('/:id').delete((req, res) => {
    Company.findByIdAndDelete(req.params.id)
        .then(company => Response.success(res, company))
        .catch(err => Response.error(res, err))
})

module.exports = router;