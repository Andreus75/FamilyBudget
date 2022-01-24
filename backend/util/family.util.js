module.exports = {
    familyNormalization: (familyToNormalize = {}) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field) => {
            delete familyToNormalize[field];
        });

        return familyToNormalize;
    }
};
