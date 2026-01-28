/* MDG 2026 */

/**
 * Imports
 */
import { appendFile } from 'node:fs/promises';
import { BaseTest } from './BaseTest';
import { By, WebDriver } from 'selenium-webdriver';
import { CLICK_DELAY, COMPONENT, HEADER } from '../../Constants';
import { generateSummary } from '../../Utility';

/**
 * Header Tests
 */
export class Header extends BaseTest {
    /**
     * Member Variables - Header Elements
     */
    private readonly LABEL_LOGO: string;
    private readonly LABEL_TOGGLE: string;
    private readonly LABEL_BUTTON: string;
    private readonly ID_LOGO: string;
    private readonly ID_TOGGLE: string;
    private readonly ID_BUTTON: string;

    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: string, driver: WebDriver, target: string, handle?: string) {
        super(locale, driver, target, COMPONENT.HEADER, handle);
        console.log('Header::constructor()');

        // Set up Header elements, based on locale
        switch (locale) {
            case 'fr':
                this.LABEL_LOGO = HEADER.FR_LOGO;
                this.LABEL_TOGGLE = HEADER.FR_TOGGLE;
                this.LABEL_BUTTON = HEADER.FR_BUTTON;
                this.ID_LOGO = 'HEADER-ANON-FR-002';
                this.ID_TOGGLE = 'HEADER-ANON-FR-003';
                this.ID_BUTTON = 'HEADER-ANON-FR-004';
                break;
            case 'en':
            default:
                this.LABEL_LOGO = HEADER.EN_LOGO;
                this.LABEL_TOGGLE = HEADER.EN_TOGGLE;
                this.LABEL_BUTTON = HEADER.EN_BUTTON;
                this.ID_LOGO = 'HEADER-ANON-EN-002';
                this.ID_TOGGLE = 'HEADER-ANON-EN-003';
                this.ID_BUTTON = 'HEADER-ANON-EN-004';
                break;
        }
    }// End of constructor()

    /**
     * Action: Run Test Step
     * @param cssSelector {string}
     * @param stepCode {string}
     */
    private async runStep(cssSelector: string, stepCode: string) {
        console.log(`${stepCode}->START`);
        try {
            // 1: Find element
            const element = await this.chromeDriver.findElement(By.css(cssSelector));

            // 2: Click element
            await element.click();

            // 3: Pass - Update passed tests and log result
            const success_message = `${stepCode}->success\n`;
            await appendFile(this.logFilename, success_message);
            this.passed += 1;
        }
        catch (error: any) {
            // 4: Fail - Update failed tests and log result
            this.failed += 1;
            const fail_message = `${stepCode}->onFailure ${error}\n`;
            console.log(fail_message);
            await appendFile(this.logFilename, fail_message);
        }
        finally {
            // 5: Reset browser state
            this.testTotal += 1;
            console.log(`${stepCode}->END`);
            await this.reset();
        }
    }// End of runStep()

    /**
     * Action: Run Header Tests
     */
    public async runTests() {
        const startMessage = `Header::runTests::targetURL->${this.targetURL}\n`
        console.log(startMessage)
        this.startTime = Date.now();

        try {
            await appendFile(this.logFilename, startMessage);

            // 1: Test - Start
            // Reset browser state to ensure all elements will be found
            await this.reset();

            // 2: Test - Homeweb Logo
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_LOGO,
                this.ID_LOGO
            );

            // 2: Test - Language Toggle
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_TOGGLE,
                this.ID_TOGGLE
            );

            // 3: Test - Sign In Button
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_BUTTON,
                this.ID_BUTTON
            );

            // 4: Test - Finish
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.finish();
        } catch (error: any) {
            const fail_message = `Header::runTests->onFailure\n${error}\n`;
            console.log(fail_message)
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

        // 2: Log results
        console.log('Header::finish')
        await appendFile(this.logFilename, summary);
    }// End of finish()

    /**
     * Reset - Browser State
     */
    private async reset() {
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
    }// End of reset()
}// End of class
// End of file
