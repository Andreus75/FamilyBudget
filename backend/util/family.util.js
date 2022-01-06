module.exports = {
    familyNormalization: (familyToNormalize = {}) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field) => {
            delete familyToNormalize._doc[field];
        });

        return familyToNormalize;
    }
};
