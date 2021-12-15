const { Sequelize } = require("sequelize-cockroachdb");

const sequelize = new Sequelize({
	dialect: "postgres",
	username: process.env["DB_UNAME"],
	password: process.env["DB_PASS"],
	host: process.env["DB_HOST"],
	port: process.env["DB_PORT"],
	database: process.env["DB_DNAME"],
	dialectOptions: {
	ssl: {
		ca: process.env['DB_CERT']
		},
	},
});

const db = {
	sequelize, Sequelize, 
	Order: require("./Order")(sequelize, Sequelize),
	Product: require("./Product")(sequelize, Sequelize),
	User: require("./User")(sequelize, Sequelize),
	Role: require("./Role")(sequelize, Sequelize)
};

// relation of user and order
db.Role.hasMany(db.User, {
	foreignKey: {
    allowNull: false,
		defaultValue: "user"
  }
});
db.User.belongsTo(db.Role);

// relation of user and order
db.User.hasMany(db.Order, {
	foreignKey: {
    allowNull: false
  }
});
db.Order.belongsTo(db.User);

// relation of order and Product
db.Product.hasMany(db.Order, {
	foreignKey: {
    allowNull: false
  }
});
db.Order.belongsTo(db.Product);

// creating relations
// sequelize.sync({ force: true });


module.exports = db;