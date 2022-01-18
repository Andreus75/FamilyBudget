const { passwordService, jwtService, emailService} = require('../services');
const { Family, Action} = require('../dataBase');
const familyUtil = require('../util/family.util');
const { SuccessCreated, SuccessNoContent} = require('../configs/error-enum');
const { ACTION } = require('../configs/token-type-enum');
const { WELCOME } = require('../configs/email-action-enum');
const s3Service = require('../services/S3.service');

module.exports = {
    createFamily: async (req, res, next) => {
        try {
            const { password, email, family_name } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newFamily = await Family.create({...req.body, password: hashedPassword});

            const token = jwtService.createActionToken();

            await Action.create({token, type: ACTION, family_id: newFamily._id});

            await emailService.sendMail(email, WELCOME, { familyName: family_name, token });

            let newFamilyNormalise = familyUtil.familyNormalization(newFamily);

            const { avatar } = req.files || {};

            if (avatar) {
                const uploadInfo = await s3Service.uploadImage(avatar, 'family', newFamilyNormalise._id.toString());

                newFamilyNormalise = await Family.findByIdAndUpdate(
                    newFamilyNormalise._id,
                    { avatar: uploadInfo.Location},
                    {new: true});
            }

            res
                .status(SuccessCreated)
                .json({ message: newFamilyNormalise });
        } catch (e) {
            next(e);
        }
    },

    // getFamily: async (req, res, next) => {
    //     try {
    //         const family = await Family.find();
    //
    //         res.json(family);
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    getFamily: (req, res, next) => {
        try {
            const family = req.family;

            const familyNormalize = familyUtil.familyNormalization(family);

            res.json(familyNormalize);
        } catch (e) {
            next(e);
        }
    },

    deleteFamilyById: async (req, res, next) => {
        try {
            const { family_id } = req.params;

            await Family.findOneAndDelete({_id: family_id});

            res.sendStatus(SuccessNoContent);
        } catch (e) {
            next(e);
        }
    }
};

