/**
 * Imports
 */
import { Browser, Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { Header } from './common/Header';
import { HOMEWEB_LANDING_URL_EN, HOMEWEB_LANDING_URL_FR, LANGUAGE } from '../Constants';

/**
 * Smoke - Test
 */
async function smoke() {
    console.log('smoke->START');

    // 1: Set up chromeDriver options
    const options = new chrome.Options();
    options.addArguments(
        '--incognito',
        // '--start-maximized',
    );

    // 2: Launch browser
    const chromeDriver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

    try {
        /**
         * 3: EN Tests
         */
        // 3.1: Navigate to target
        const TARGET_URL_EN = HOMEWEB_LANDING_URL_EN
        await chromeDriver.get(TARGET_URL_EN)

        // 3.2: Header
        const header_en = new Header(LANGUAGE.ENGLISH, chromeDriver, TARGET_URL_EN);
        await header_en.runTests();

        /**
         * 4: FR Tests
         */
        // 4.1: Navigate to target
        const TARGET_URL_FR = HOMEWEB_LANDING_URL_FR
        await chromeDriver.get(TARGET_URL_FR)
        // 4.2: Header
        const header_fr = new Header(LANGUAGE.FRENCH, chromeDriver, TARGET_URL_FR);
        await header_fr.runTests();

    }
    catch (error: any) {
        console.log('smoke->onFailure', error);
    }
    finally {
        console.log('smoke->END');
    }
    await chromeDriver.quit()
}

smoke()

