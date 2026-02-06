/* MDG 2026 */

/**
 * Imports
 */
import { appendFile } from 'node:fs/promises';
import { BaseTest } from './BaseTest';
import { By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { FIND, HOMEWEB_DOMAIN, ID, LANGUAGE, QUANTUM_API_DOMAIN, TAG, TIMEOUT } from '../common/Constants';
import { ElementType } from '../types/ElementType';


/**
 * Public Landing - Anonymous Tests
 */
export class PublicLanding extends BaseTest {
    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: LANGUAGE, driver: WebDriver, target: string, handle?: string) {
        super(locale, driver, target, TAG.PUBLIC_LANDING, handle);
    }// End of constructor()

    /**
     * Test: Resource
     * @param testElement {ElementType}
     * @param find {string}
     */
    public async testResource(testElement: ElementType, find?: string) {
        const {id, identifier, route} = testElement;
        let url: URL;
        let element: WebElement;

        // 1: Find element
        switch (find) {
            case FIND.TEXT:
                element = await this.chromeDriver.findElement(By.linkText(identifier));
                break;
            case FIND.CSS:
            default:
                element = await this.chromeDriver.findElement(By.css(identifier));
                break;
        }

        // 2: Scroll to element
        await this.chromeDriver.executeScript(
            "arguments[0].scrollIntoView({ block: 'center', inline: 'center' });",
            element
        );
        await this.chromeDriver.sleep(TIMEOUT.S_HALF);
        await this.chromeDriver.wait(until.elementIsVisible(element), TIMEOUT.S_FIVE);
        await this.chromeDriver.wait(until.elementIsEnabled(element), TIMEOUT.S_FIVE);

        // 3: Click element
        await element.click();

        /**
         * 4: Validate click
         */
        // 4.1: Set up clicked URL
        url = new URL(await this.chromeDriver.getCurrentUrl());

        // 4.2: Domain Check - Homeweb
        if (url.origin === HOMEWEB_DOMAIN) {
            if (url.pathname === route) {
                // 4.2.1: Test - Pass
                const success_message = `${id}->success\n`;
                await appendFile(this.logFilename, success_message);
            }
            else {
                // 4.2.2: Test - Fail | Pathname doesn't match
                throw new Error(`Expected route ${route}, got ${url.pathname}`);
            }
        }
        // 4.3: Domain Check - UNKNOWN
        else {
            // 4.3.1: Test - Fail | Domain doesn't match
            throw new Error(`UNKNOWN ORIGIN: ${url.origin}`);
        }

        // 5: Additional check to ensure page content has been loaded
        await this.chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)))

        // 6: Navigate back to original page, and scroll to the top
        await this.chromeDriver.navigate().back();
        await this.chromeDriver.executeScript('window.scrollTo(0, 0);');
    }// End of testResource()

    /**
     * Test: Button
     * @param testElement {ElementType}
     */
    public async testButton(testElement: ElementType){
        const {id, identifier, route} = testElement;
        let url: URL;

        // 1: Find element
        const element = await this.chromeDriver.findElement(By.css(identifier));

        // 2: Scroll to element
        await this.chromeDriver.executeScript(
            "arguments[0].scrollIntoView({ block: 'center', inline: 'center' });",
            element
        );
        await this.chromeDriver.sleep(TIMEOUT.S_HALF);
        await this.chromeDriver.wait(until.elementIsVisible(element), TIMEOUT.S_FIVE);
        await this.chromeDriver.wait(until.elementIsEnabled(element), TIMEOUT.S_FIVE);

        // 3: Click element
        await element.click();

        /**
         * 4: Validate click
         */
        // 4.1: Set up clicked URL
        url = new URL(await this.chromeDriver.getCurrentUrl());

        // 4.2: Domain Check - Homeweb
        if (url.origin === QUANTUM_API_DOMAIN) {
            if (url.pathname === route) {
                // 4.2.1: Test - Pass
                const success_message = `${id}->success\n`;
                await appendFile(this.logFilename, success_message);
            }
            else {
                // 4.2.2: Test - Fail | Pathname doesn't match
                throw new Error(`Expected route ${route}, got ${url.pathname}`);
            }
        }
        // 4.3: Domain Check - UNKNOWN
        else {
            // 4.3.1: Test - Fail | Domain doesn't match
            throw new Error(`UNKNOWN ORIGIN: ${url.origin}`);
        }

        // 5: Additional check to ensure page content has been loaded
        await this.chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)))
    }// End of testButton
}// End of class
// End of file

