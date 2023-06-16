const Joi = require('joi');


function validatePerson(person) {
    const schema = Joi.object({
        fname: Joi.string().min(4).required(),
        lname: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(12).required()
    });

    return schema.validate(person);
}

module.exports = {
    validatePerson: validatePerson
}