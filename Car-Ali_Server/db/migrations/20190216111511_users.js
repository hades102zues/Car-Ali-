exports.up = (knex, Promise) => {
	return knex.schema.createTable("users", table => {
		table.increments();
		table.string("username").notNull();
		table.string("name").notNull();
		table.string("email").notNull();
		table.string("password").notNull();
		table.text("profile_img").notNull();
		table.timestamps(true, true);
		table.string('reset_token').notNull();
		table.bigInteger('reset_token_exptime').notNull();

	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable("users");
};
