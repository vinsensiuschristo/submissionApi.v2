const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapDBPlaylistSong, mapDBPlaylist } = require("../../utils/index");

class PlaylistService {
    constructor() {
        this._pool = new Pool();
    }

    async addPlaylist({ name, owner }) {
        const id = `playlist-${nanoid(16)}`;

        const query = {
            text: "INSERT INTO playlists VALUES ($1, $2, $3) RETURNING id",
            values: [id, name, owner],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError("Playlist tidak dapat ditambahkan");
        }

        return result.rows.map(mapSongDB)[0];
    }

    async getPlaylists() {
        const result = await this._pool.query("SELECT * FROM playlists");
        return result.rows.map(mapDBPlaylist);
    }

    // async addPlaylistWithSong() {}

    // async getPlaylistWithSong() {}
}

module.exports = PlaylistService;
