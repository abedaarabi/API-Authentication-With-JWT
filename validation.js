const Joi = require("joi");
//VALIDATION

const userValidation = () => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email({ minDomainAtoms: 2 }),
    password: Joi.string()
      .min(6)
      .required()
  };
};
