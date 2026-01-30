/* MDG 2026 */

/**
 * General
 */
export const CLICK_DELAY = 1000;
export const HOMEWEB_DOMAIN = 'https://homeweb.ca';
export const HOMEWOOD_API_DOMAIN = 'https://api.homewoodhealth.io';
export const HOMEWEB_LANDING_URL_EN = 'https://homeweb.ca/en';
export const HOMEWEB_LANDING_URL_FR = 'https://homeweb.ca/fr';

export const enum LANGUAGE {
    ENGLISH = 'en',
    FRENCH = 'fr'
}

export const enum TAG {
    HEADER= 'header',
    FOOTER = 'footer',
    MAIN = 'main',
}

/**
 * Footer - Labels
 */
// REVIEW this and try to use a different locator since the href should be used for validation
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

