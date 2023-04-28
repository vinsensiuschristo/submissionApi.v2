const routes = (handler) => [
    {
        method: "POST",
        path: "/playlists",
        handler: handler.postPlaylistHandler,
        options: {
            auth: "musicapp_jwt",
        },
    },
    {
        method: "GET",
        path: "/playlists",
        handler: handler.getplaylistHandler,
        options: {
            auth: "musicapp_jwt",
        },
    },
    // {
    //     method: "DELETE",
    //     path: "/playlists/{id}",
    //     handler: handler.deletePlaylistByIdHandler,
    //     options: {
    //         auth: "musicapp_jwt",
    //     },
    // },
    // {
    //     method: "POST",
    //     path: "/playlists/{id}/songs",
    //     handler: handler.postPlaylistSongHandler,
    //     options: {
    //         auth: "musicapp_jwt",
    //     },
    // },
    // {
    //     method: "GET",
    //     path: "/playlists/{id}/songs",
    //     handler: handler.getPlaylistSongHandler,
    //     options: {
    //         auth: "musicapp_jwt",
    //     },
    // },
    // {
    //     method: "DELETE",
    //     path: "/playlists/{id}/songs",
    //     handler: handler.deletePlaylistSongHandler,
    //     options: {
    //         auth: "musicapp_jwt",
    //     },
    // },
    // {
    //     method: "GET",
    //     path: "/playlists/{id}/activities",
    //     handler: handler.getPlaylistActivityHandler,
    //     options: {
    //         auth: "musicapp_jwt",
    //     },
    // },
];

module.exports = routes;
