/* MDG 2026 */

/**
 * Imports
 */
import { appendFile } from 'node:fs/promises';
import { BaseTest } from './BaseTest';
import { By, WebDriver } from 'selenium-webdriver';
import { CLICK_DELAY, COMPONENT, FOOTER } from '../../Constants';
import { generateSummary } from '../../Utility';

/**
 * Footer Tests
 */
export class Footer extends BaseTest {
    /**
     * Member Variables - Footer Elements
     */
    private readonly LABEL_ABOUT: string;
    private readonly LABEL_TERMS: string;
    private readonly LABEL_PRIVACY: string;
    private readonly LABEL_ACCESSIBILITY: string;
    private readonly ID_ABOUT: string;
    private readonly ID_TERMS: string;
    private readonly ID_PRIVACY: string;
    private readonly ID_ACCESSIBILITY: string;

    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: string, driver: WebDriver, target: string, handle: string) {
        super(locale, driver, target, COMPONENT.FOOTER, handle);
        console.log('Footer::constructor()');

        // Set up Footer elements, based on locale
        switch (locale) {
            case 'fr':
                this.LABEL_ABOUT = FOOTER.FR_ABOUT;
                this.LABEL_TERMS = FOOTER.FR_TERMS;
                this.LABEL_PRIVACY = FOOTER.FR_PRIVACY;
                this.LABEL_ACCESSIBILITY = FOOTER.FR_ACCESSIBILITY
                this.ID_ABOUT = 'FOOTER-ANON-FR-002';
                this.ID_TERMS = 'FOOTER-ANON-FR-003';
                this.ID_PRIVACY = 'FOOTER-ANON-FR-004';
                this.ID_ACCESSIBILITY = 'FOOTER-ANON-FR-005';
                break;
            case 'en':
            default:
                this.LABEL_ABOUT = FOOTER.EN_ABOUT;
                this.LABEL_TERMS = FOOTER.EN_TERMS;
                this.LABEL_PRIVACY = FOOTER.EN_PRIVACY;
                this.LABEL_ACCESSIBILITY = FOOTER.EN_ACCESSIBILITY;
                this.ID_ABOUT = 'FOOTER-ANON-EN-002';
                this.ID_TERMS = 'FOOTER-ANON-EN-003';
                this.ID_PRIVACY = 'FOOTER-ANON-EN-004';
                this.ID_ACCESSIBILITY = 'FOOTER-ANON-EN-005';
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
            this.passed += 1;
            const success_message = `${stepCode}->success\n`;
            await appendFile(this.logFilename, success_message);
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
            await this.reset()
        }
    }// End of runStep()

    /**
     * Action: Run Footer Tests
     */
    public async runTests() {
        const startMessage = `Footer::runTests::targetURL->${this.targetURL}\n`
        console.log(startMessage)
        this.startTime = Date.now();

        try {
            await appendFile(this.logFilename, startMessage);

            // 1: Test - Start
            // Reset browser state to ensure all elements will be found
            await this.reset();

            // 2: Test - About
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_ABOUT,
                this.ID_ABOUT
            );

            // 3: Test - Terms
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_TERMS,
                this.ID_TERMS
            );

            // 4: Test - Privacy
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_PRIVACY,
                this.ID_PRIVACY
            );

            // 5: Test - Accessibility
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_ACCESSIBILITY,
                this.ID_ACCESSIBILITY
            );

            // 6: Test - Finish
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.finish();
        } catch (error: any) {
            const fail_message = `Footer::runTests->onFailure\n${error}\n`;
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
        console.log('Footer::finish')
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
        await this.chromeDriver.get(this.targetURL);

        // 3: Scroll to the bottom of the page
        await this.chromeDriver.executeScript(
            'window.scrollTo(0, document.body.scrollHeight);'
        );
    }// End of reset()
}// End of class
// End of file
