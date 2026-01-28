import { appendFile } from 'node:fs/promises';
import { By, WebDriver } from 'selenium-webdriver';
import { CLICK_DELAY, HEADER } from '../../Constants';
import { generateSummary, generateLogFileName } from '../../Utility';

/**
 * Header
 */
export class Header {
    /**
     * Member Variables
     */
    private chromeDriver: WebDriver;
    private readonly logFilename: string;
    private readonly totalTests: number;
    private readonly targetURL: string;

    private startTime: number;
    private endTime: number;
    private totalTime: number;
    private passCounter: number;
    private failCounter: number;
    private message: string;

    private readonly LABEL_LOGO: string;
    private readonly LABEL_TOGGLE: string;
    private readonly LABEL_BUTTON: string;

    private readonly ID_LOGO: string;
    private readonly ID_TOGGLE: string;
    private readonly ID_BUTTON: string;

    /**
     * Constructor
     */
    constructor(locale: string, driver: WebDriver, target: string) {
        console.log('Header::constructor()');
        this.chromeDriver = driver;
        this.logFilename = generateLogFileName(`header-${locale}`);
        this.totalTests = 3;

        this.startTime = 0;
        this.endTime = 0;
        this.totalTime = 0;
        this.passCounter = 0;
        this.failCounter = 0;
        this.targetURL = target;
        this.message = ''

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

    private async findElements() {
        console.log('Header::findElements()');
        try {
        }
        catch (error: any) {
            console.log('Header:findElements->onFailure', error);
        }
    }// End of findElements()

    private async runStep(cssSelector: string, stepCode: string) {
        console.log(`${stepCode}->START`);
        try {
            const element = await this.chromeDriver.findElement(By.css(cssSelector));
            await element.click();
            const success_message = `${stepCode}->success`;
            console.log(success_message);
            await appendFile(this.logFilename, success_message);
            this.passCounter += 1;
        } catch (error: any) {
            const fail_message = `${stepCode}->onFailure ${error}`;
            console.log(fail_message);
            await appendFile(this.logFilename, fail_message);
            this.failCounter += 1;
        } finally {
            // Reset page to original target
            console.log(`${stepCode}->END`);
            await this.chromeDriver.get(this.targetURL);
        }
    }// End of runStep()

    public async runTests() {
        const startMessage = `Header::runTests::targetURL->${this.targetURL}\n`
        console.log(startMessage)
        this.startTime = Date.now();
        try {
            await appendFile(this.logFilename, startMessage);
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_LOGO,
                this.ID_LOGO
            );
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_TOGGLE,
                this.ID_TOGGLE
            );
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                this.LABEL_BUTTON,
                this.ID_BUTTON
            );
            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.finish();
        } catch (error: any) {
            const fail_message = `Header::runTests->onFailure\n${error}\n`;
            await appendFile(this.logFilename, fail_message);
        }
    }// End of runTests()

    private async finish() {
        const endTime = Date.now();
        const totalTime = endTime - this.startTime;

        const summary = generateSummary(
            this.totalTests,
            this.passCounter,
            this.failCounter,
            totalTime
        );

        await appendFile(this.logFilename, summary);
    }// End of finish()
}// End of class
// End of file
