/* MDG 2026 */

/**
 * Imports
 */
import { appendFile } from 'node:fs/promises';
import { BaseTest } from './BaseTest';
import { By, WebDriver } from 'selenium-webdriver';
import { ElementType } from '../types/ElementType';
import { HOMEWEB_DOMAIN, LANGUAGE, QUANTUM_API_DOMAIN, TAG } from '../common/Constants';

/**
 * Header - Anonymous Tests
 */
export class Header extends BaseTest {
    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: LANGUAGE, driver: WebDriver, target: string, handle?: string) {
        super(locale, driver, target, TAG.HEADER, handle);
    }// End of constructor()

    /**
     * Action: Run Test Step
     * @param testElement {ElementType}
     */
    public async runStep(testElement: ElementType) {
        const {id, identifier, route} = testElement;

        // 1: Scroll to top of page
        await this.chromeDriver.executeScript( 'window.scrollTo(0, 0);' );

        // 2: Find element
        const element = await this.chromeDriver.findElement(By.css(identifier));

        // 3: Click element
        await element.click();

        /**
         * 4: Validate click
         */
        // 4.1: Set up clicked URL
        const url = new URL(await this.chromeDriver.getCurrentUrl());

        // 4.2: Domain Check - Homeweb
        if (url.origin === HOMEWEB_DOMAIN) {
            if (url.pathname === route) {
                // 4: Test - Pass
                this.passed += 1;
                const success_message = `${id}->success\n`;
                await appendFile(this.logFilename, success_message);
            }
        }
        // 4.3: Domain Check - Quantum API
        else if (url.origin === QUANTUM_API_DOMAIN) {
            if ( url.pathname === route ) {
                this.passed += 1;
                const success_message = `${id}->success\n`;
                await appendFile( this.logFilename, success_message );
            }
        }
        // 4.4: Domain Check - UNKNOWN
        else {
            throw new Error('UNKNOWN ORIGIN');
        }
    };// End of runStep()
}// End of class
// End of file
