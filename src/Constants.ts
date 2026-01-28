/**
 * General
 */
export const CLICK_DELAY = 1500;
export const HOMEWEB_LANDING_URL_EN = 'https://homeweb.ca/en';
export const HOMEWEB_LANDING_URL_FR = 'https://homeweb.ca/fr';

/**
 * Header - Labels
 */
const LABEL_HOMEWOOD_LOGO_EN = '[aria-label="Homewood Logo"]';
const LABEL_LANGUAGE_TOGGLE_EN = '[aria-label="Toggle language to FR"]';
const LABEL_SIGN_IN_BUTTON_EN = '[aria-label="Sign In"]';

const LABEL_HOMEWOOD_LOGO_FR = '[aria-label="Logo Homewood"]';
const LABEL_LANGUAGE_TOGGLE_FR = '[aria-label="Basculer la langue en EN"]';
const LABEL_SIGN_IN_BUTTON_FR = '[aria-label="Se connecter"]';

export const enum LANGUAGE {
    ENGLISH = 'en',
    FRENCH = 'fr'
}

export const enum HEADER {
    EN_LOGO = LABEL_HOMEWOOD_LOGO_EN,
    EN_TOGGLE = LABEL_LANGUAGE_TOGGLE_EN,
    EN_BUTTON = LABEL_SIGN_IN_BUTTON_EN,
    FR_LOGO = LABEL_HOMEWOOD_LOGO_FR,
    FR_TOGGLE = LABEL_LANGUAGE_TOGGLE_FR,
    FR_BUTTON = LABEL_SIGN_IN_BUTTON_FR
}


