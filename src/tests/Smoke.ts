/* MDG 2026 */

/**
 * Imports
 */
import { Browser, Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { Footer } from './general/Footer';
import { generateReport } from '../common/Utility';
import { Header } from './general/Header';
import { HOMEWEB_LANDING_URL_EN, HOMEWEB_LANDING_URL_FR, LANGUAGE } from '../common/Constants';
import { PublicLanding } from './public/PublicLanding';

/**
 * Smoke - Test
 */
async function Smoke() {
    console.log('Smoke->START\n');
    /*
     * 1: Set up
     */
    // 1.1: Chrome options
    const options = new chrome.Options();
    options.addArguments(
        '--incognito',
        // '--start-maximized',
    );
    // 1.2: Variables
    const TARGET_URL_EN = HOMEWEB_LANDING_URL_EN;
    const TARGET_URL_FR = HOMEWEB_LANDING_URL_FR;

    // 2: Launch browser
    const chromeDriver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    try {
        // 2.1: Get browser window
        const windowHandle = await chromeDriver.getWindowHandle();

        /**
         * 3: EN Tests
         */
        // 3.1: Navigate to EN target
        await chromeDriver.get(TARGET_URL_EN)
        // 3.2: Header
        const header_en = new Header(LANGUAGE.ENGLISH, chromeDriver, TARGET_URL_EN, windowHandle);
        await header_en.runTests();
        // 3.3: Footer
        const footer_en = new Footer(LANGUAGE.ENGLISH, chromeDriver, TARGET_URL_EN, windowHandle);
        await footer_en.runTests();
        // 3.4: Public - Landing
        const public_landing_en = new PublicLanding(LANGUAGE.ENGLISH, chromeDriver, TARGET_URL_EN, windowHandle);
        await public_landing_en.runTests();

        /**
         * 4: FR Tests
         */
        // 4.1: Navigate to FR target
        await chromeDriver.get(TARGET_URL_FR)
        // 4.2: Header
        const header_fr = new Header(LANGUAGE.FRENCH, chromeDriver, TARGET_URL_FR, windowHandle);
        await header_fr.runTests();
        // 4.3: Footer
        const footer_fr = new Footer(LANGUAGE.FRENCH, chromeDriver, TARGET_URL_FR, windowHandle);
        await footer_fr.runTests();
        // 4.4: Public - Landing
        const public_landing_fr = new PublicLanding(LANGUAGE.FRENCH, chromeDriver, TARGET_URL_FR, windowHandle);
        await public_landing_fr.runTests();

        /**
         * 5: Generate Report
         */
        const total = header_en.testTotal + header_fr.testTotal + footer_en.testTotal + footer_fr.testTotal + public_landing_en.testTotal + public_landing_fr.testTotal;
        const pass = header_en.passed + header_fr.passed + footer_en.passed + footer_fr.passed + public_landing_en.passed + public_landing_fr.passed;
        const fail = header_en.failed + header_fr.failed + footer_en.failed + footer_fr.failed + public_landing_en.failed + public_landing_fr.failed;
        console.log(generateReport(total, pass, fail));
    }
    catch (error: any) {
        console.log('Smoke->onFailure\n', error);
    }
    finally {
        console.log('Smoke->END');
    }
    await chromeDriver.quit()
}
Smoke()
