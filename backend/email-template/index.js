const emailActionEnum = require('../configs/email-action-enum');

module.exports = {
    [emailActionEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome :)'
    },
    [emailActionEnum.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Everybody forgot something, dont worry'
    },
    [emailActionEnum.CHANGE_FORGOT_PASSWORD]: {
        templateName: 'change-forgot-password',
        subject: 'Your password was change'
    },
    [emailActionEnum.DELETE_TRANSACTION]: {
        templateName: 'delete-transaction',
        subject: 'Transaction was deleted'
    },
    [emailActionEnum.REPORT]: {
        templateName: 'report',
        subject: 'Month report'
    }
};
