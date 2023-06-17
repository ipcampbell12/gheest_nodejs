const Joi = require('joi');


function validatePerson(person) {
    const schema = Joi.object({
        title: Joi.string().min(4).required(),
        author: Joi.string().min(4).required(),
        pages: Joi.number(),
        summary: Joi.string().min(12).required()
    });

    return schema.validate(person);
}


const sum = (...args) => {
    return args.reduce(function (acc, cur) {
        return acc + cur
    })

}


module.exports = {
    validatePerson: validatePerson
}