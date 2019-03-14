exports.up = (knex, Promise) => {
	return knex.schema.createTable("users", table => {
		table.increments();
		table.string("username").notNull();
		table.string("name").notNull();
		table.string("email").notNull();
		table.string("password").notNull();
		table.text("profile_img");
		table.timestamps(true, true);
	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable("users");
};
