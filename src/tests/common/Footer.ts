import { appendFile } from 'node:fs/promises';
import { By, WebDriver } from 'selenium-webdriver';
import { CLICK_DELAY, FOOTER } from '../../Constants';
import { generateSummary, generateLogFileName } from '../../Utility';

/**
 * Footer
 */
export class Footer {
    /**
     * Member Variables
     */
    private chromeDriver: WebDriver;
    private readonly originalWindow: string;
    private readonly logFilename: string;
    private readonly targetURL: string;

    private startTime: number;
    public testTotal: number;
    public passed: number;
    public failed: number;

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
     */
    constructor(locale: string, driver: WebDriver, target: string, handle: string) {
        console.log('Footer::constructor()');
        this.chromeDriver = driver;
        this.logFilename = generateLogFileName(`footer-${locale}`);
        this.targetURL = target;
        this.originalWindow = handle;

        this.testTotal = 0;
        this.startTime = 0;
        this.passed = 0;
        this.failed = 0;

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

    private async runStep(cssSelector: string, stepCode: string) {
        console.log(`${stepCode}->START`);
        try {
            const element = await this.chromeDriver.findElement(By.css(cssSelector));
            await element.click();

            const success_message = `${stepCode}->success\n`;
            await appendFile(this.logFilename, success_message);
            this.passed += 1;
        }
        catch (error: any) {
            const fail_message = `${stepCode}->onFailure ${error}\n`;
            console.log(fail_message);
            await appendFile(this.logFilename, fail_message);
            this.failed += 1;
        }
        finally {
            this.testTotal += 1;
            console.log(`${stepCode}->END`);
            await this.reset()
        }
    }// End of runStep()

    public async runTests() {
        const startMessage = `Footer::runTests::targetURL->${this.targetURL}\n`
        console.log(startMessage)
        this.startTime = Date.now();
        try {
            await this.chromeDriver.executeScript(
                'window.scrollTo(0, document.body.scrollHeight);'
            );
            await appendFile(this.logFilename, startMessage);

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_ABOUT,
                this.ID_ABOUT
            );

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_TERMS,
                this.ID_TERMS
            );

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_PRIVACY,
                this.ID_PRIVACY
            );

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_ACCESSIBILITY,
                this.ID_ACCESSIBILITY
            );

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.finish();
        } catch (error: any) {
            const fail_message = `Footer::runTests->onFailure\n${error}\n`;
            console.log(fail_message)
            await appendFile(this.logFilename, fail_message);
        }
    }// End of runTests()

    private async finish() {
        const endTime = Date.now();
        const totalTime = endTime - this.startTime;

        const summary = generateSummary(
            this.testTotal,
            this.passed,
            this.failed,
            totalTime
        );

        console.log('Footer::finish')
        await appendFile(this.logFilename, summary);
    }// End of finish()

    private async reset() {
        await this.chromeDriver.switchTo().window(this.originalWindow);
        await this.chromeDriver.get(this.targetURL);
        await this.chromeDriver.executeScript(
            'window.scrollTo(0, document.body.scrollHeight);'
        );
    }
}
