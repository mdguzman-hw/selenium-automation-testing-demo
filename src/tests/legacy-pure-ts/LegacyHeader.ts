/* MDG 2026 */

/**
 * Imports
 */
import { appendFile } from 'node:fs/promises';
import { BaseTest } from './BaseTest';
import { By, WebDriver } from 'selenium-webdriver';
import { CLICK_DELAY, HOMEWEB_DOMAIN, LANGUAGE, QUANTUM_API_DOMAIN, TAG } from '../../common/Constants';
import { ElementType } from '../../types/ElementType';
import { generateSummary, translate } from '../../common/Utility';

/**
 * Interface
 */
interface HeaderElements {
    logo: ElementType,
    toggle: ElementType,
    button: ElementType
}

/**
 * Header - Anonymous Tests
 */
export class LegacyHeader extends BaseTest {
    /**
     * Member Variables
     */
    private readonly HEADER: HeaderElements;

    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: LANGUAGE, driver: WebDriver, target: string, handle?: string) {
        super(locale, driver, target, TAG.HEADER, handle);
        console.log('Header::constructor()');

        this.HEADER = {
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
    }// End of constructor()

    /**
     * Action: Run Test
     * @param testElement {ElementType}
     */
    private async runStep(testElement: ElementType) {
        const {id, identifier, route} = testElement;
        console.log(`${id}->START->${identifier}`);
        try {
            // 1: Find element
            const element = await this.chromeDriver.findElement(By.css(identifier));

            // 2: Click element
            await this.chromeDriver.sleep(CLICK_DELAY);
            await element.click();

            /**
             * 3: Validate click
             */
            // 3.1: Set up clicked URL
            const url = new URL(await this.chromeDriver.getCurrentUrl());

            // 3.1: Domain Check - Homeweb
            if (url.origin === HOMEWEB_DOMAIN) {
                if (url.pathname === route) {
                    // 4: Test - Pass
                    this.passed += 1;
                    const success_message = `${id}->success\n`;
                    await appendFile(this.logFilename, success_message);
                }
            }
            // 3.2: Domain Check - Quantum API
            else if (url.origin === QUANTUM_API_DOMAIN) {
                if ( url.pathname === route ) {
                    this.passed += 1;
                    const success_message = `${id}->success\n`;
                    await appendFile( this.logFilename, success_message );
                }
            }
            // 3.3: Domain Check - UNKNOWN
            else {
                throw new Error('UNKNOWN ORIGIN');
            }
        }
        catch (error: any) {
            // 4: Test - Fail
            this.failed += 1;
            const fail_message = `${id}->onFailure ${error}\n`;
            console.log(fail_message);
            await appendFile(this.logFilename, fail_message);
        }
        finally {
            // 5: Reset browser state
            this.testTotal += 1;
            console.log(`${id}->END`);
            await this.reset();
        }
    }// End of runStep()

    /**
     * Action: Run Header Tests
     */
    public async runTests() {
        const startMessage = `Header::runTests::targetURL->${this.targetURL}\n`;
        console.log(startMessage);
        this.startTime = Date.now();

        try {
            await appendFile(this.logFilename, startMessage);

            // 1: Test - Start
            // Reset browser state to ensure header elements can be found
            await this.reset();
            const header = await this.chromeDriver.findElement(By.css(TAG.HEADER));
            if (header) {
                // 2: Test - Homeweb Logo
                await this.runStep(this.HEADER.logo);

                // 3: Test - Language Toggle
                await this.runStep(this.HEADER.toggle);

                // 4: Test - Sign In Button
                await this.runStep(this.HEADER.button);

                // 5: Test - Finish
                await this.chromeDriver.sleep(CLICK_DELAY);
                await this.finish();
            }

        } catch (error: any) {
            const fail_message = `Header::runTests->onFailure\n${error}\n`;
            console.log(fail_message);
            await appendFile(this.logFilename, fail_message);
        }
    }// End of runTests()

    /**
     * Action: Finish Tests
     * Set up statistics and results for logging
     */
    private async finish() {
        const endTime = Date.now();
        const totalTime = endTime - this.startTime;

        // 1: Set up summary
        const summary = generateSummary(
            this.testTotal,
            this.passed,
            this.failed,
            totalTime
        );

        try {
            console.log('Header::finish\n');
            await appendFile(this.logFilename, summary);
        }
        catch (error: any) {
            const fail_message = `Header::finish->onFailure\n${error}\n`;
            console.log(fail_message);
            await appendFile(this.logFilename, fail_message);
        }
        // 2: Log results
    }// End of finish()

    /**
     * Action: Reset - Browser State
     */
    private async reset() {
        try {
            // 1: Check to ensure browser is looking at the correct window
            if ( this.originalWindow ) {
                await this.chromeDriver.switchTo().window( this.originalWindow );
            }

            // 2: Navigate back to initial target
            await this.chromeDriver.get( this.targetURL );

            // 3: Scroll to the top of the page
            await this.chromeDriver.executeScript(
                'window.scrollTo(0, 0);'
            );
        }
        catch (error: any) {
            const fail_message = `Header::reset->onFailure\n${error}\n`;
            console.log(fail_message);
            await appendFile(this.logFilename, fail_message);
        }
    }// End of reset()
}// End of class
// End of file
