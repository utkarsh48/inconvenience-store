const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
    fname: {
			type: Sequelize.STRING,
			allowNull: false
		},
    lname: {
			type: Sequelize.STRING,
			allowNull: false
		},
		money: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		}
  });

	User.validate = object => {
		const schema = Joi.object({
			email: Joi.string().email().min(5).required(),
			fname: Joi.string().min(1).required(),
			lname: Joi.string().min(1).required(),
			money: Joi.number().min(0).required(),
			password: Joi.string().min(6).max(255).required(),
			roleName: Joi.string().valid("user")
		});

		return schema.validate(object, {stripUnknown: true});
	}

	User.validateUpdate = object => {
		const schema = Joi.object({
			email: Joi.string().email().min(5),
			fname: Joi.string().min(1),
			lname: Joi.string().min(1),
			money: Joi.number().min(0),
			password: Joi.string().min(6).max(255),
			roleName: Joi.string().valid("user")
		});

		return schema.validate(object, {stripUnknown: true});
	}

	User.validateMoney = object => {
		const schema = Joi.object({
			money: Joi.number().min(0).required(),
		});

		return schema.validate(object, {stripUnknown: true});
	}

	User.validateAuth = object => {
		const schema = Joi.object({
			email: Joi.string().email().min(5).required(),
			password: Joi.string().min(6).max(255).required(),
		});

		return schema.validate(object, {stripUnknown: true});
	}

	User.generateAuthToken = user => {
		const payload = _.pick(user, ['email', 'fname', 'lname', 'roleName']);

		return jwt.sign(payload, process.env['JWT_AUTH_KEY']);
	}

  return User;
};
