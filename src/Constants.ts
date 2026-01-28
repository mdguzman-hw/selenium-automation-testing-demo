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

/**
 * Footer - Labels
 */
const LABEL_HOMEWOOD_ABOUT_EN = 'a[href="/en/about"]';
const LABEL_HOMEWOOD_TERMS_EN = 'a[href="/en/terms-of-service"]';
const LABEL_HOMEWOOD_PRIVACY_EN = 'a[href="/en/privacy-policy"]';
const LABEL_HOMEWOOD_ACCESSIBILITY_EN = 'a[href="/en/accessibility"]';

const LABEL_HOMEWOOD_ABOUT_FR = 'a[href="/fr/about"]';
const LABEL_HOMEWOOD_TERMS_FR = 'a[href="/fr/terms-of-service"]';
const LABEL_HOMEWOOD_PRIVACY_FR = 'a[href="/fr/privacy-policy"]';
const LABEL_HOMEWOOD_ACCESSIBILITY_FR = 'a[href="/fr/accessibility"]';

export const enum FOOTER {
    EN_ABOUT = LABEL_HOMEWOOD_ABOUT_EN,
    EN_TERMS = LABEL_HOMEWOOD_TERMS_EN,
    EN_PRIVACY = LABEL_HOMEWOOD_PRIVACY_EN,
    EN_ACCESSIBILITY = LABEL_HOMEWOOD_ACCESSIBILITY_EN,
    FR_ABOUT = LABEL_HOMEWOOD_ABOUT_FR,
    FR_TERMS = LABEL_HOMEWOOD_TERMS_FR,
    FR_PRIVACY = LABEL_HOMEWOOD_PRIVACY_FR,
    FR_ACCESSIBILITY = LABEL_HOMEWOOD_ACCESSIBILITY_FR,
}

