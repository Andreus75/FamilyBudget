const emailActionEnum = require('../configs/email-action-enum');

module.exports = {
    [emailActionEnum.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Everybody forgot something, dont worry'
    },
    [emailActionEnum.CHANGE_FORGOT_PASSWORD]: {
        templateName: 'change-forgot-password',
        subject: 'Your password was change'
    }
};
