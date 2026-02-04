/* MDG 2026 */

/**
 * Imports
 */
import { Browser, Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { ElementType } from '../src/types/ElementType';
import { Footer } from '../src/tests/Footer';
import { Header } from '../src/tests/Header';
import { HOMEWEB_LANDING_URL_EN, HOMEWEB_LANDING_URL_FR, LANGUAGE } from '../src/common/Constants';
import { translate } from '../src/common/Utility';

/**
 * Interfaces
 */
interface HeaderElements {
    logo: ElementType,
    toggle: ElementType,
    button: ElementType
}

/**
 * Interfaces
 */
interface FooterElements {
    about: ElementType,
    terms: ElementType,
    privacy: ElementType,
    accessibility: ElementType
}

describe ('Smoke Test', () => {
    // 1: Declare variables
    let chromeDriver: WebDriver;
    let options: chrome.Options
    let window: string;
    let target: string;
    let locale: LANGUAGE


    // 2: Runs once BEFORE ALL tests
    beforeAll(async () => {
        // 2.1: Set up browser
        options = new chrome.Options();
        options.addArguments(
            '--incognito',
            // '--start-maximized',
        );
        chromeDriver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
        window = await chromeDriver.getWindowHandle();
    })

    // 3: Runs once AFTER ALL tests
    afterAll(async () => {
        await chromeDriver.quit();
    })

    // 4: English Tests
    describe('EN', () => {
        // 4.1: Initialize variables
        beforeAll(() => {
            target = HOMEWEB_LANDING_URL_EN;
            locale = LANGUAGE.ENGLISH;
        });

        // 4.2: Navigate to EN target and retrieve window handle
        beforeEach(async() => {
            await chromeDriver.get(target);
            window = await chromeDriver.getWindowHandle();
        })

        // 4.3: Header - Tests
        describe('Header', () => {
            // 4.3.1 Initialize variables
            const HEADER_ELEMENTS: HeaderElements = {
                logo: {
                    id: translate('header_id_logo'),
                    identifier: translate('header_identifier_logo'),
                    route: translate('header_route_logo')
                },
                toggle: {
                    id: translate('header_id_toggle'),
                    identifier: translate('header_identifier_toggle'),
                    route: translate('header_route_toggle')
                },
                button: {
                    id: translate('header_id_button'),
                    identifier: translate('header_identifier_button'),
                    route: translate('header_route_button')
                }
            };

            // 4.3.1: Homeweb Logo
            test(HEADER_ELEMENTS.logo.id, async () => {
                const header_en = new Header(locale, chromeDriver, target, window);
                await header_en.runStep(HEADER_ELEMENTS.logo);
            });

            // 4.3.2: Language Toggle
            test(HEADER_ELEMENTS.toggle.id, async () => {
                const header_en = new Header(locale, chromeDriver, target, window);
                await header_en.runStep(HEADER_ELEMENTS.toggle);
            });

            // 4.3.3: Sign In Button
            test(HEADER_ELEMENTS.button.id, async () => {
                const header_en = new Header(locale, chromeDriver, target, window);
                await header_en.runStep(HEADER_ELEMENTS.button);
            });
        });

        // 4.4: Footer - Tests
        describe('Footer', () =>
        {
            const FOOTER_ELEMENTS: FooterElements = {
                about: {
                    id: translate( 'footer_id_about' ),
                    identifier: translate( 'footer_identifier_about' ),
                    route: translate( 'footer_route_about' )
                },
                terms: {
                    id: translate( 'footer_id_terms' ),
                    identifier: translate( 'footer_identifier_terms' ),
                    route: translate( 'footer_route_terms' )
                },
                privacy: {
                    id: translate( 'footer_id_privacy' ),
                    identifier: translate( 'footer_identifier_privacy' ),
                    route: translate( 'footer_route_privacy' )
                },
                accessibility: {
                    id: translate( 'footer_id_accessibility' ),
                    identifier: translate( 'footer_identifier_accessibility' ),
                    route: translate( 'footer_route_accessibility' )
                }
            };

            // 4.4.1: About
            test( FOOTER_ELEMENTS.about.id, async () =>
            {
                const footer_en = new Footer( locale, chromeDriver, target, window );
                await footer_en.runStep( FOOTER_ELEMENTS.about );
            } );

            // 4.4.2: Terms of Service
            test( FOOTER_ELEMENTS.terms.id, async () =>
            {
                const footer_en = new Footer( locale, chromeDriver, target, window );
                await footer_en.runStep( FOOTER_ELEMENTS.terms );
            } );

            // 4.4.3: Privacy Policy
            test( FOOTER_ELEMENTS.privacy.id, async () =>
            {
                const footer_en = new Footer( locale, chromeDriver, target, window );
                await footer_en.runStep( FOOTER_ELEMENTS.privacy );
            } );

            // 4.3.3: Sign In Button
            test( FOOTER_ELEMENTS.accessibility.id, async () =>
            {
                const footer_en = new Footer( locale, chromeDriver, target, window );
                await footer_en.runStep( FOOTER_ELEMENTS.accessibility );
            } );
        });
    });
});
