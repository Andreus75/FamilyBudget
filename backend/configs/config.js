const DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB_NAME = process.env.MONGO_INITDB_DATABASE;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/familyBudget',
    PORT: process.env.PORT || 5000,
    HOST: process.env.HOST,
    MONGO_URI: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,

    HTTP: 'http://localhost:3000/',

    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN || 'aaa',
    JWT_ACTION_TOKEN: process.env.JWT_ACTION_TOKEN || 'ccc',
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN || 'rrr',
    JWT_ACTION_FORGOT_SECRET: process.env.JWT_ACTION_FORGOT_SECRET || 'fff',

    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD
};

