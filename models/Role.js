const Joi = require("joi");
const _ = require("lodash");

module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    name: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
  });

	Role.validate = async role => {
		const schema = Joi.object({
			name: Joi.string().valid("admin", "user").required()
		})
	}

  return Role;
};
