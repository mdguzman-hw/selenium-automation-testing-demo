/* MDG 2026 */

/**
 * Imports
 */
import { appendFile } from 'node:fs/promises';
import { BaseTest } from './BaseTest';
import { By, until, WebDriver } from 'selenium-webdriver';
import { HOMEWEB_DOMAIN, HOMEWOOD_DOMAIN, LANGUAGE, TAG, TIMEOUT } from '../common/Constants';
import { ElementType } from '../types/ElementType';

/**
 * Interface
 */
interface FooterElements {
    about: ElementType,
    terms: ElementType,
    privacy: ElementType,
    accessibility: ElementType
}

/**
 * Footer - Anonymous Tests
 */
export class Footer extends BaseTest {
    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: LANGUAGE, driver: WebDriver, target: string, handle: string) {
        super(locale, driver, target, TAG.FOOTER, handle);
    }// End of constructor()

    /**
     * Action: Run Test Step
     * @param testElement {ElementType}
     */
    public async runStep(testElement: ElementType) {
        const {id, identifier, route} = testElement;

        // 1: Find element
        const element = await this.chromeDriver.findElement(By.linkText(identifier));

        // 2: Scroll to element
        // await this.chromeDriver.executeScript('window.scrollTo(0, document.documentElement.scrollHeight);');
        // await this.chromeDriver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
        await this.chromeDriver.executeScript(
            "arguments[0].scrollIntoView({ block: 'center', inline: 'center' });",
            element
        );

        // 3: Wait until element is visible and enabled, then click
        await this.chromeDriver.sleep(TIMEOUT.S_HALF);
        await this.chromeDriver.wait(until.elementIsVisible(element), 5000);
        await this.chromeDriver.wait(until.elementIsEnabled(element), 5000);
        await element.click();

        /**
         * 4: Validate click
         */
        // 4.1: Set up clicked URL
        const url = new URL(await this.chromeDriver.getCurrentUrl());

        // 4.2: Check if new tab was opened
        const handles = await this.chromeDriver.getAllWindowHandles();
        if (handles.length > 1) {
            // 4.2.1: New tab opened, remain on new tab
            await this.chromeDriver.switchTo().window( handles[handles.length - 1] );

            // 4.2.2: Interrogate new tab URL
            const new_tab_url = new URL(await this.chromeDriver.getCurrentUrl());
            if (new_tab_url.origin === HOMEWOOD_DOMAIN) {
                if (new_tab_url.pathname === route) {
                    // 3.2.3: Test - Pass (close new tab)
                    this.passed += 1;
                    const success_message = `${id}->success\n`;
                    await appendFile(this.logFilename, success_message);
                }
            }
            // await this.chromeDriver.close();
        }
        // 4.3 No new tab opened
        else {
            // 3.4: Domain Check - Homeweb
            if (url.origin === HOMEWEB_DOMAIN) {
                if (url.pathname === route) {
                    // 3.5: Test - Pass
                    this.passed += 1;
                    const success_message = `${id}->success\n`;
                    await appendFile(this.logFilename, success_message);
                }
            }
            // 3.5: Domain Check - UNKNOWN
            else {
                throw new Error('UNKNOWN ORIGIN');
            }
        }
    }// End of runStep()
}// End of class
// End of file
