const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const AuthorizationError = require("../../exceptions/AuthorizationError");
const { mapSongDB } = require("../../utils");

class SongsService {
    constructor(collaborationService) {
        this._pool = new Pool();
        this._collaborationService = collaborationService;
    }

    async addSong({ title, year, genre, performer, duration, albumId, owner }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: "INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING id",
            values: [
                id,
                title,
                year,
                genre,
                performer,
                duration,
                albumId,
                createdAt,
                updatedAt,
                owner,
            ],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError("Lagu gagal ditambahkan");
        }

        return result.rows[0].id;
    }

    async getSongs() {
        const query = {
            text: "SELECT id,title,performer FROM songs",
        };
        const result = await this._pool.query(query);
        return result.rows.map(mapSongDB);
    }

    async getSongById(id) {
        const query = {
            text: "SELECT * FROM songs WHERE id = $1",
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("Lagu tidak ditemukan");
        }

        return result.rows.map(mapSongDB)[0];
    }

    async editSongById(id, { title, year, genre, performer, duration }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: "UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, updated_at = $6 WHERE id = $7 RETURNING id",
            values: [title, year, genre, performer, duration, updatedAt, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError(
                "Gagal memperbarui lagu. Id tidak ditemukan"
            );
        }
    }

    async deleteSongById(id) {
        const query = {
            text: "DELETE FROM songs WHERE id = $1 RETURNING id",
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("Lagu gagal dihapus. Id tidak ditemukan");
        }
    }

    // v2
    async verifySongOwner(id, owner) {
        const query = {
            text: "SELECT * FROM songs WHERE id = $1",
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("Lagu tidak ditemukan");
        }

        const song = result.rows[0];

        if (song.owner !== owner) {
            throw new AuthorizationError(
                "Anda tidak berhak mengakses resource ini"
            );
        }
    }

    async verifyNoteAccess(songId, userId) {
        try {
            await this.verifyNoteOwner(songId, userId);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            try {
                await this._collaborationService.verifyCollaborator(
                    songId,
                    userId
                );
            } catch {
                throw error;
            }
        }
    }

    async verifySong(songId) {
        const query = {
            text: "SELECT id FROM songs WHERE id = $1",
            values: [songId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError("Lagu tidak ditemukan");
        }

        return result.rows.map(mapSongDB)[0];
    }
}

module.exports = SongsService;
