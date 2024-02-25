const mongoose = require('mongoose');
const Joi = require('joi');

const companySchema = new mongoose.Schema({
    id_company: {
        required: false,
        type: Number
    },
    name_company: {
        required: true,
        type: String
    },
    description_company: {
        required: true,
        type: String
    },
    activity: {
        required: true,
        enum: ['actif', 'non-actif'],
        type: String
    },
    author: {
        required: true,
        type: String
    },
    domainName: [
        {
            id_domain: {
                required: false,
                type: Number
            },
            name_domain: {
                required: true,
                type: String
            },
            extensions: [
                {
                    id_extension: {
                        required: false,
                        type: Number
                    },
                    name_extension: {
                        required: true,
                        type: String
                    },
                    googleIndex: {
                        required: true,
                        type: Boolean
                    },
                    yahooIndex: {
                        required: true,
                        type: Boolean
                    },
                    bingIndex: {
                        required: true,
                        type: Boolean
                    }
                }
            ],
            tags: [String]
        }
    ],
    maintenance: [
        {
            id_maintenance: {
                required: false,
                type: Number
            },
            name_maintenance: {
                required: true,
                type: String
            },
            description_maintenance: {
                required: true,
                type: String
            }
        }
    ],
    mail: [
        {
            id_mail: {
                required: false,
                type: Number
            },
            mail: {
                required: true,
                type: String
            },
            description_mail: {
                required: true,
                type: String
            }
        }
    ],
    hosting: [
        {
            id_hosting: {
                required: false,
                type: Number
            },
            name_hosting: {
                required: true,
                type: String
            },
            description_hosting: {
                required: true,
                type: String
            },
            ipv4: {
                required: false,
                type: String
            },
            ipv6: {
                required: false,
                type: String
            }
        }
    ]
});

// const companySchema = Joi.object({
//     id_company: Joi.number().allow(null),
//     name_company: Joi.string().required,
//     description_company: Joi.string().required,
//     activity: Joi.string().valid('actif', 'non-actif').required(),
//     author: Joi.string().required,
//     domainName: Joi.array().items(
//         Joi.object({
//             id_domain: Joi.number().allow(null),
//             name_domain: Joi.string().required,
//             extensions: Joi.array().items(
//                 Joi.object({
//                     id_extension: Joi.number().allow(null),
//                     name_extension: Joi.string().required,
//                     googleIndex: Joi.boolean().required,
//                     yahooIndex: Joi.boolean().required,
//                     bingIndex: Joi.boolean().required,
//                 })
//             ),
//             tags: Joi.array().items(Joi.string())
//         })
//     ),
//     maintenance: Joi.array().items(
//         Joi.object({
//             id_maintenance: Joi.number().allow(null),
//             maintenance: Joi.string().required(),
//             description_maintenance: Joi.string().required()
//         })
//     ),
//     mail: Joi.array().items(
//         Joi.object({
//             id_mail: Joi.number().allow(null),
//             mail: Joi.string().required(),
//             description_mail: Joi.string().required()
//         })
//     ),
//     hosting: Joi.array().items(
//         Joi.object({
//             id_hosting: Joi.number().allow(null),
//             name_hosting: Joi.string().required(),
//             description_hosting: Joi.string().required()
//         })
//     )
// });

const Company = mongoose.model('Company', companySchema);
module.exports = Company;