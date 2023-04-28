const mapDBToModelAlbum = ({ id, name, year, created_at, updated_at }) => ({
    id,
    name,
    year,
    createdAt: created_at,
    updatedAt: updated_at,
});

const mapSongDB = ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
    created_at,
    updated_at,
}) => ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
    createdAt: created_at,
    updatedAt: updated_at,
});

const mapDBAlbum = ({ id, name, year }, song) => ({
    id,
    name,
    year,
    songs: song,
});

const mapDBPlaylistSong = (playlist, song) => ({
    playlist: {
        id: playlist.id,
        name: playlist.name,
        username: playlist.username,
        songs: song,
    },
});

const mapDBPlaylist = (playlist) => ({
    playlist: {
        id: playlist.id,
        name: playlist.name,
        username: playlist.username,
    },
});

module.exports = {
    mapDBToModelAlbum,
    mapSongDB,
    mapDBAlbum,
    mapDBPlaylistSong,
    mapDBPlaylist,
};
