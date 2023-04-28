const ClientError = require("../../exceptions/ClientError");

class PlaylistHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
        this.getplaylistHandler = this.getplaylistHandler.bind(this);
    }

    async postPlaylistHandler(request, h) {
        try {
            this._validator.validatePlaylistPayload(request.payload);

            // this._validator.validatePlaylistPayload(request.payload);
            const { id: credentialId } = request.auth.credentials;

            Object.assign(playlistValidated, { owner: credentialId });

            const playlistId = await this._service.addPlaylist(
                playlistValidated
            );

            const response = h.response({
                status: "success",
                message: "Playlist berhasil ditambahkan",
                data: {
                    playlistId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: "fail",
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: "error",
                message: "Maaf, terjadi kegagalan pada server kami.",
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getplaylistHandler(request, h) {
        try {
            const { id: credentialId } = request.auth.credentials;
            const playlists = await this._service.getPlaylists(credentialId);

            const response = h.response({
                status: "success",
                data: {
                    playlists,
                },
            });
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: "fail",
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: "error",
                message: "Maaf, terjadi kegagalan pada server kami.",
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = PlaylistHandler;
