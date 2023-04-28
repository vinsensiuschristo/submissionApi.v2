/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("playlists", {
        id: {
            type: "VARCHAR(30)",
            primaryKey: true,
        },
        name: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        owner: {
            type: "VARCHAR(30)",
            notNull: true,
        },
    });

    // addForeign key
    pgm.addConstraint("playlists", "unique_owner", "UNIQUE(owner)");

    pgm.addConstraint(
        "playlists",
        "fk_collaborations.owner_users.id",
        "FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE"
    );
};

exports.down = (pgm) => {
    pgm.dropTable("playlist");
};
