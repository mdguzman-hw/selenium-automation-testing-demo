/* MDG 2026 */

/**
 * Imports
 */
import { appendFile } from 'node:fs/promises';
import { BaseTest } from './BaseTest';
import { By, WebDriver } from 'selenium-webdriver';
import { CLICK_DELAY, HOMEWEB_DOMAIN, HOMEWOOD_DOMAIN, LANGUAGE, TAG } from '../../common/Constants';
import { ElementType } from '../../types/ElementType';
import { generateSummary, translate } from '../../common/Utility';

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
export class LegacyFooter extends BaseTest {
    /**
     * Member Variables
     */
    private readonly FOOTER: FooterElements;

    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: LANGUAGE, driver: WebDriver, target: string, handle: string) {
        super(locale, driver, target, TAG.FOOTER, handle);
        console.log('Footer::constructor()');

        this.FOOTER = {
            about: {
                id: translate('footer_id_about'),
                identifier: translate('footer_identifier_about'),
                route: translate('footer_route_about')
            },
            terms: {
                id: translate('footer_id_terms'),
                identifier: translate('footer_identifier_terms'),
                route: translate('footer_route_terms')
            },
            privacy: {
                id: translate('footer_id_privacy'),
                identifier: translate('footer_identifier_privacy'),
                route: translate('footer_route_privacy')
            },
            accessibility: {
                id: translate('footer_id_accessibility'),
                identifier: translate('footer_identifier_accessibility'),
                route: translate('footer_route_accessibility')
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
            const element = await this.chromeDriver.findElement(By.linkText(identifier));

            // 2: Click element
            await this.chromeDriver.sleep(CLICK_DELAY);
            await element.click();

            /**
             * 3: Validate click
             */
            // 3.1: Set up clicked URL
            url = new URL(await this.chromeDriver.getCurrentUrl());

            // 3.2: Check if new tab was opened
            const handles = await this.chromeDriver.getAllWindowHandles();
            if (handles.length > 1) {
                // 3.2.1: New tab opened, remain on new tab
                await this.chromeDriver.switchTo().window( handles[handles.length - 1] );

                // 3.2.2: Interrogate new tab URL
                const new_tab_url = new URL(await this.chromeDriver.getCurrentUrl());
                if (new_tab_url.origin === HOMEWOOD_DOMAIN) {
                    if (new_tab_url.pathname === route) {
                        // 3.2.3: Test - Pass (close new tab)
                        this.passed += 1;
                        const success_message = `${id}->success\n`;
                        await appendFile(this.logFilename, success_message);
                    }
                }
                await this.chromeDriver.close();
            }
            // 3.3 No new tab opened
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
        const startMessage = `Footer::runTests::targetURL->${this.targetURL}\n`;
        console.log(startMessage);
        this.startTime = Date.now();

        try {
            await appendFile(this.logFilename, startMessage);

            // 1: Test - Start
            // Reset browser state to ensure footer elements will be found
            await this.reset();
            const footer = await this.chromeDriver.findElement(By.css(TAG.FOOTER));
            if (footer) {
                // 2: Test - About
                await this.runStep(this.FOOTER.about);

                // 3: Test - Terms
                await this.runStep(this.FOOTER.terms);

                // 4: Test - Privacy
                await this.runStep(this.FOOTER.privacy);

                // 5: Test - Accessibility
                await this.runStep(this.FOOTER.accessibility);

                // 6: Test - Finish
                await this.chromeDriver.sleep(CLICK_DELAY);
                await this.finish();
            }
        } catch (error: any) {
            const fail_message = `Footer::runTests->onFailure\n${error}\n`;
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
            console.log('Footer::finish\n');
            await appendFile(this.logFilename, summary);
        }
        catch (error: any) {
            const fail_message = `Footer::finish->onFailure\n${error}\n`;
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
                'window.scrollTo(0, document.body.scrollHeight);'
            );
        }
        catch (error: any) {
            const fail_message = `Footer::reset->onFailure\n${error}\n`;
            console.log(fail_message);
            await appendFile(this.logFilename, fail_message);
        }
    }// End of reset()
}// End of class
// End of file
