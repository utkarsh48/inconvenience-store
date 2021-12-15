const Joi = require("joi");


module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
		id: {
			type: Sequelize.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 1
		},
		itemCost: {
			type: Sequelize.INTEGER,
			allowNull: false,
		}
  });

	Order.validate = (object) => {
		const schema = Joi.object({
			id: Joi.string().guid({version: 'uuidv4'}).strip(),
			productId: Joi.string().guid({version: 'uuidv4'}).required(),
			userEmail: Joi.string().required(),
			quantity: Joi.number().min(1).required(),
			itemCost: Joi.number().min(0).required()
		});


		return schema.validate(object, {stripUnknown: true});
	}

  return Order;
};
