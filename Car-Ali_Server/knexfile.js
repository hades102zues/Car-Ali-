const path = require("path");

module.exports = {
	development: {
		client: "pg",
		connection: {
			host: "127.0.0.1",
			user: "postgres",
			password: "postgres_50282409" || process.env.DATABASE_PASS,
			database: "car-ali"
		},
		migrations: {
			directory: path.join(__dirname, "db", "migrations")
		},
		seeds: {
			directory: path.join(__dirname, "db", "seeds")
		}
	},
	production: {
	client: "pg",
	connection: process.env.DATABASE_URL || 'postgres://husylkraaixkpb:4429eb916824071e496cdd89e4c27dadea82f98c117e0a8866d20eafd486a2ee@ec2-54-221-243-211.compute-1.amazonaws.com:5432/d6v2ejec63ddjo',
	ssl: true,
	migrations: {
		directory: path.join(__dirname, "db", "migrations")
	},
	seeds: {
		directory: path.join(__dirname, "db", "seeds")
	}
	}
};
