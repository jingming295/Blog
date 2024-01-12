/**
 * Configuration object for URL.
 * @typedef {Object} URLConfig
 * @property {string} url - The URL value.
 */

/**
 * The URL configuration object.
 * @type {URLConfig}
 */
const urlconfig = {
    url: 'http://localhost:8080',
    serverUrl: 'http://localhost:3000/',
    avatarUrl: 'http://localhost:3000/avatars/'
};

const serverUrlConfig = {
    url: 'https://blog.mcyuans.com',
    serverUrl: 'https://blogserver.mcyuans.com//',
    avatarUrl: 'https://blogserver.mcyuans.com//avatars/'
};

export { urlconfig };
export { serverUrlConfig };