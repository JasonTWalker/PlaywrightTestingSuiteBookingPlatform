import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) });
import  uiPages  from '../utils/uiPages'

export const accountTypes  = {
    clubUser: {
        email: process.env.CLUBUSEREMAIL,
        password: process.env.CLUBUSERPASSWORD,
        landingPage: uiPages.lakeviewClubPage
    },
    clubAdmin: {
        email: process.env.CLUBADMINEMAIL,
        password: process.env.CLUBADMINPASSWORD,
        landingPage: uiPages.lakeviewClubPage
    },

    platformAdmin: {
        email: process.env.PLATFORMADMINEMAIL,
        password: process.env.PLATFORMADMINPASSWORD,
        landingPage: uiPages.landingAdmin
    },

    // THERE IS ALSO:
    // - USER NOT SIGNED IN
    // - USER SIGNED IN THAT IS NOT A MEMBER OF A CLUB
    // BUT THIS DATA NOT CURRENTLY SEEDED
}
