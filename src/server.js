const Hapi = require("@hapi/hapi");
const albums = require("./api/albums");
const AlbumsService = require("./service/inMemory/AlbumService");
const AlbumsValidator = require("./validator/albums/index.js");

const init = async () => {
    const albumsService = new AlbumsService();

    const server = Hapi.server({
        port: 3000,
        host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    // Plugin
    await server.register([
        {
            plugin: albums,
            options: {
                AlbumsService: albumsService,
                AlbumsValidator: AlbumsValidator,
            },
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
