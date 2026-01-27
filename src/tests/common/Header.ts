import { appendFile } from 'node:fs/promises';
import { Browser, Builder, By, WebDriver } from 'selenium-webdriver';
import { CLICK_DELAY, HEADER, HOMEWEB_LANDING_URL_EN, HOMEWEB_LANDING_URL_FR } from '../../Constants';
import { generateSummary, generateLogFileName } from '../../utility/Utility';

export class Header {
    /**
     * Member Variables
     */
    private chromeDriver: WebDriver;
    private readonly locale: string;
    private readonly logFilename: string;
    private readonly totalTests: number;

    private startTime: number;
    private passCounter: number;
    private failCounter: number;
    private targetURL: string;

    /**
     * Constructor
     */
    constructor(locale: string) {
        this.chromeDriver = new Builder().forBrowser(Browser.CHROME).build();
        this.locale = locale;
        this.logFilename = generateLogFileName(this.locale);
        this.totalTests = 3;

        this.startTime = 0;
        this.passCounter = 0;
        this.failCounter = 0;
        this.targetURL = ''
    }

    private async runStep(cssSelector: string, stepCode: string) {
        try {
            const element = await this.chromeDriver.findElement(By.css(cssSelector));
            await element.click();

            const message = `${stepCode}->success\n`;
            await appendFile(this.logFilename, message);
            this.passCounter += 1;
        } catch (error: any) {
            const message = `${stepCode}->onFailure ${error}\n`;
            await appendFile(this.logFilename, message);
            this.failCounter += 1;
        } finally {
            // Always reset to homepage
            await this.chromeDriver.get(this.targetURL);
        }
    }

    // TODO: FR tests
    public async run() {

        let LABEL_LOGO = '';
        let LABEL_TOGGLE = '';
        let LABEL_BUTTON = '';

        let ID_LOGO = '';
        let ID_TOGGLE = '';
        let ID_BUTTON = '';

        switch (this.locale) {
            case 'en':
                this.targetURL = HOMEWEB_LANDING_URL_EN;
                LABEL_LOGO = HEADER.EN_LOGO;
                LABEL_TOGGLE = HEADER.EN_TOGGLE;
                LABEL_BUTTON = HEADER.EN_BUTTON;
                ID_LOGO = 'HEADER-ANON-EN-001';
                ID_TOGGLE = 'HEADER-ANON-EN-002';
                ID_BUTTON = 'HEADER-ANON-EN-003';
                break;
            case 'fr':
                this.targetURL = HOMEWEB_LANDING_URL_FR;
                LABEL_LOGO = HEADER.FR_LOGO;
                LABEL_TOGGLE = HEADER.FR_TOGGLE;
                LABEL_BUTTON = HEADER.FR_BUTTON;
                ID_LOGO = 'HEADER-ANON-FR-001';
                ID_TOGGLE = 'HEADER-ANON-FR-002';
                ID_BUTTON = 'HEADER-ANON-FR-003';
                break;
        }

        this.startTime = Date.now();
        try {
            await this.chromeDriver.get(this.targetURL);
            const message = `TEST::${this.targetURL}\n`
            await appendFile(this.logFilename, message);

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                LABEL_LOGO,
                ID_LOGO
            );

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                LABEL_TOGGLE,
                ID_TOGGLE
            );

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                LABEL_BUTTON,
                ID_BUTTON
            );

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.finish();
        } catch (error: any) {
            await appendFile(this.logFilename, `HEADER::ERROR->${error}\n`);
            await this.chromeDriver.quit();
        }
    }

    private async finish() {
        const endTime = Date.now();
        const summary = generateSummary(
            this.totalTests,
            this.passCounter,
            this.failCounter,
            endTime - this.startTime
        );
        await appendFile(this.logFilename, summary);
        await this.chromeDriver.quit();
    }
}
