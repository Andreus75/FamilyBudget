module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/familyBudget',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN || 'aaa',
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN || 'rrr'
};

