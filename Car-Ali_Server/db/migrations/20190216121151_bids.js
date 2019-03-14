exports.up = function(knex, Promise) {
	return knex.schema.createTable("bids", table => {
		table.increments();
		table.float("bid").notNull();
		table.text("user_name").notNull();
		table.text("user_path");
		table
			.integer("user_id")
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
			.index();
		table
			.integer("listing_id")
			.references("id")
			.inTable("listings")
			.onDelete("CASCADE")
			.index();
		table.integer("won").notNull();
		table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable("bids");
};
