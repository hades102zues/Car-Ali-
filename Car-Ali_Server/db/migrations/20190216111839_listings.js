exports.up = function(knex, Promise) {
	return knex.schema.createTable("listings", table => {
		table.increments();
		table.integer("status").notNull();
		table.integer("year").notNull();
		table.float("condition").notNull();
		table.integer("verified").notNull();
		table.float("cost").notNull();
		table.integer("passengers").notNull();
		table.string("car_name").notNull();
		table.text("image_path").notNull();
		table.integer("closed").notNull();
		table
			.integer("user_id")
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
			.index();
		table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable("listings");
};
