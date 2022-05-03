import Joi from "joi";

const activateCardSchema = Joi.object({
  cvc: Joi.string().required(),
  password: Joi.string().required(),
});

export default activateCardSchema;
