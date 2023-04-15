const { nanoid } = require("nanoid");

class SongsService {
    constructor() {
        this._songs = [];
    }

    addSong({ title, year, genre, performer, duration, albumId }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newSong = {
            title,
            year,
            genre,
            performer,
            duration,
            albumId,
            id,
            createdAt,
            updatedAt,
        };

        this._songs.push(newSong);

        const isSuccess =
            this._songs.filter((song) => song.id === id).length > 0;

        if (!isSuccess) {
            throw new Error("Lagu gagal ditambahkan");
        }

        return id;
    }

    getSongs() {
        return this._songs;
    }

    getSongById(id) {
        const song = this._songs.filter((song) => song.id === id)[0];
        if (!song) {
            throw new Error("Lagu tidak ditemukan");
        }
        return song;
    }

    editSongById(id, { title, year, genre, performer, duration, albumId }) {
        const song = this._songs.findIndex((song) => song.id === id);

        if (song === -1) {
            throw new Error("Gagal memperbarui lagu. Id tidak ditemukan");
        }

        const updatedAt = new Date().toISOString();

        this._songs[song] = {
            ...this._songs[song],
            title,
            year,
            genre,
            performer,
            duration,
            albumId,
            updatedAt,
        };
    }

    deleteSongById(id) {
        const song = this._songs.findIndex((song) => song.id === id);
        if (song === -1) {
            throw new Error("Catatan gagal dihapus. Id tidak ditemukan");
        }
        this._songs.splice(song, 1);
    }
}

module.exports = SongsService;
