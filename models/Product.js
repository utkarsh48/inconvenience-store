const Joi = require("joi");


module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    id: {
			type: Sequelize.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
    description: Sequelize.STRING,
    image: Sequelize.STRING,
		cost: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
  });

	Product.validate = (object) => {
		const schema = Joi.object({
			id: Joi.string().guid({version: 'uuidv4'}),
			title: Joi.string().min(1).max(255).required(),
			description: Joi.string().min(1).max(255).required(),
			image: Joi.string().min(5).max(255),
			cost: Joi.number().min(0).required()
		});

		return schema.validate(object, {stripUnknown: true});
	}

  return Product;
};
