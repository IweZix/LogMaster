import dotenv from 'dotenv';

dotenv.config();

const {
    TOKEN,
    COLOR,
    DEVELOPER_ID,
    VERSION,
    INVITE_BOT_URL,
    SUPPORT_SERVER_URL,
    WEB_SITE_URL
} = process.env;

if (
    !TOKEN ||
    !COLOR ||
    !DEVELOPER_ID ||
    !VERSION ||
    !INVITE_BOT_URL ||
    !SUPPORT_SERVER_URL ||
    !WEB_SITE_URL
) {
    throw new Error('Missing environment variables');
}

export const config = {
    token: TOKEN,
    color: COLOR,
    developerId: DEVELOPER_ID,
    version: VERSION,
    inviteBotUrl: INVITE_BOT_URL,
    supportServerUrl: SUPPORT_SERVER_URL,
    webSiteUrl: WEB_SITE_URL
};
