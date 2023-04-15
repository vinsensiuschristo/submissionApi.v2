const { nanoid } = require("nanoid");

class AlbumsService {
    constructor() {
        this._album = [];
    }

    addAlbum({ name, year }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newAlbum = {
            name,
            year,
            id,
            createdAt,
            updatedAt,
        };

        this._album.push(newAlbum);

        const isSuccess =
            this._album.filter((album) => album.id === id).length > 0;

        if (!isSuccess) {
            throw new Error("Album gagal ditambahkan");
        }

        return id;
    }

    getAlbumById(id) {
        const album = this._album.filter((album) => album.id === id)[0];
        if (!album) {
            throw new Error("Album tidak ditemukan");
        }
        return album;
    }

    editAlbumById(id, { name, year }) {
        const index = this._album.findIndex((album) => album.id === id);

        if (index === -1) {
            throw new Error("Gagal memperbarui album. Id tidak ditemukan");
        }

        const updatedAt = new Date().toISOString();

        this._album[index] = {
            ...this._album[index],
            name,
            year,
            updatedAt,
        };
    }

    deleteAlbumById(id) {
        const index = this._album.findIndex((album) => album.id === id);
        if (index === -1) {
            throw new Error("Album gagal dihapus. Id tidak ditemukan");
        }
        this._album.splice(index, 1);
    }
}

module.exports = AlbumsService;
