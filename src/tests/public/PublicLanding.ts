/* MDG 2026 */

/**
 * Imports
 */

import { ElementType } from '../../types/ElementType';
import { BaseTest } from '../BaseTest';
import { CLICK_DELAY, HOMEWEB_DOMAIN, IDENTITY_API_DOMAIN, LANGUAGE, QUANTUM_API_DOMAIN, TAG } from '../../common/Constants';
import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { generateSummary, translate } from '../../common/Utility';
import { appendFile } from 'node:fs/promises';

/**
 * Interface
 */
interface PublicLandingElements {
    sign_in: ElementType,
    register: ElementType
    resource_1: ElementType,
    resource_2: ElementType,
    resource_3: ElementType,
    toolkit: ElementType,
    help_number: ElementType,
}

/**
 * Public Landing - Anonymous Tests
 */
export class PublicLanding extends BaseTest {
    /**
     * Member Variables
     */
    private readonly PUBLIC_LANDING: PublicLandingElements;

    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: LANGUAGE, driver: WebDriver, target: string, handle: string) {
        super(locale, driver, target, TAG.PUBLIC_LANDING, handle);
        console.log('PublicLanding::constructor()');

        this.PUBLIC_LANDING = {
            sign_in: {
                id: translate('public_landing_id_sign_in'),
                identifier: translate('public_landing_identifier_sign_in'),
                route: translate('public_landing_route_sign_in')
            },
            register: {
                id: translate('public_landing_id_register'),
                identifier: translate('public_landing_identifier_register'),
                route: translate('public_landing_route_register')
            },
            resource_1: {
                id: translate('public_landing_id_resource_1'),
                identifier: translate('public_landing_identifier_resource_1'),
                route: translate('public_landing_route_resource_1')
            },
            resource_2: {
                id: translate('public_landing_id_resource_2'),
                identifier: translate('public_landing_identifier_resource_2'),
                route: translate('public_landing_route_resource_2')
            },
            resource_3: {
                id: translate('public_landing_id_resource_3'),
                identifier: translate('public_landing_identifier_resource_3'),
                route: translate('public_landing_route_resource_3')
            },
            // TODO: Review toolkit test
            toolkit: {
                id: translate('public_landing_id_toolkit'),
                identifier: translate('public_landing_identifier_toolkit'),
                route: translate('public_landing_route_toolkit')
            },
            // TODO: Review help number test
            help_number: {
                id: translate('public_landing_id_help_number'),
                identifier: translate('public_landing_identifier_help_number'),
                route: translate('public_landing_route_help_number')
            }
        };
    }// End of constructor()

    /**
     * Action: Run Test Step
     * @param testElement {ElementType}
     */
    private async runStep(testElement: ElementType) {
        const {id, identifier, route} = testElement;
        let url: URL;

        console.log(`${id}->START->${identifier}`);
        try {
            // 1: Find element
            let element: WebElement;
            element = await this.chromeDriver.findElement(By.css(identifier));

            // 1.1: Element not found by css, attempt find by text
            // TODO: Handle toolkit and phone number
            // if (!element) {
            //     console.log('HERE')
            //     element = await this.chromeDriver.findElement(By.linkText(identifier));
            // }

            // 2: Scroll to element
            await this.chromeDriver.executeScript(
                "arguments[0].scrollIntoView({ block: 'center', inline: 'center' });",
                element
            );

            // 2: Click element
            await this.chromeDriver.sleep(CLICK_DELAY);
            await element.click();

            /**
             * 3: Validate click
             */
            // 3.1: Set up clicked URL
            url = new URL(await this.chromeDriver.getCurrentUrl());

            // 3.2: Domain Check - Homeweb
            if (url.origin === HOMEWEB_DOMAIN) {
                if (url.pathname === route) {
                    // 3.2.1: Test - Pass
                    this.passed += 1;
                    const success_message = `${id}->success\n`;
                    await appendFile(this.logFilename, success_message);
                }
            }
            // 3.3: Domain Check - Quantum API
            else if (url.origin === QUANTUM_API_DOMAIN) {
                if (url.pathname === route) {
                    // 3.3.1: Test - Pass
                    this.passed += 1;
                    const success_message = `${id}->success\n`;
                    await appendFile(this.logFilename, success_message);
                }
            }
            // 3.4: Domain Check - Identity API
            else if (url.origin === IDENTITY_API_DOMAIN) {
                const {pathname, search} = url;
                const path_search = pathname + search;

                if (path_search === route) {
                    // 3.4.1: Test - Pass
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
     * Action: Run Footer Tests
     */
    public async runTests() {
        const startMessage = `PublicLanding::runTests::targetURL->${this.targetURL}\n`;
        console.log(startMessage);
        this.startTime = Date.now();

        try {
            await appendFile(this.logFilename, startMessage);

            // 1: Test - Start
            // Reset browser state to ensure main content elements will be found
            await this.reset();
            const main = await this.chromeDriver.findElement(By.css(TAG.MAIN));

            if (main) {
                // 2: Test - About
                await this.runStep(this.PUBLIC_LANDING.sign_in);

                // 3: Test - Terms
                await this.runStep(this.PUBLIC_LANDING.register);

                // 4: Test - Resource 1
                await this.runStep(this.PUBLIC_LANDING.resource_1);

                // 5: Test - Resource 2
                await this.runStep(this.PUBLIC_LANDING.resource_2);

                // 6: Test - Resource 3
                await this.runStep(this.PUBLIC_LANDING.resource_3);

                // 7: Test - Toolkit
                // await this.runStep(this.PUBLIC_LANDING.toolkit);

                // 8: Test - Help Number
                // await this.runStep(this.PUBLIC_LANDING.help_number);

                // 9: Test - Finish
                await this.chromeDriver.sleep(CLICK_DELAY);
                await this.finish();
            }
        } catch (error: any) {
            const fail_message = `PublicLanding::runTests->onFailure\n${error}\n`;
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
            // 2: Log results
            console.log('PublicLanding::finish\n');
            await appendFile(this.logFilename, summary);
        }
        catch (error: any) {
            const fail_message = `PublicLanding::finish->onFailure\n${error}\n`;
            console.log(fail_message);
            await appendFile(this.logFilename, fail_message);
        }
    }// End of finish()

    /**
     * Reset - Browser State
     */
    private async reset() {
        try {
            // 1: Check to ensure browser is looking at the correct window
            if ( this.originalWindow ) {
                await this.chromeDriver.switchTo().window( this.originalWindow );
            }

            // 2: Navigate back to initial target
            await this.chromeDriver.get(this.targetURL);

            // 3: Scroll to the bottom of the page
            await this.chromeDriver.executeScript(
                'window.scrollTo(0, 0);'
            );
        }
        catch (error: any) {
            const fail_message = `PublicLanding::reset->onFailure\n${error}\n`;
            console.log(fail_message);
            await appendFile(this.logFilename, fail_message);
        }
    }// End of reset()
}// End of class
// End of file

