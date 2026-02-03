import { Browser, Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

describe ('Smoke Tests', () => {
    // console.log('Smoke->START\n');

    // 1: Declare browser variables
    let chromeDriver: WebDriver;
    let options: chrome.Options
    let window: string;

    // 1. Runs once before all tests
    beforeAll(async () => {
        // 1.1: Set up browser
        options = new chrome.Options();
        options.addArguments(
            '--incognito',
            // '--start-maximized',
        );
        chromeDriver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
        window = await chromeDriver.getWindowHandle()
    })

    // 2. Runs once after all tests
    afterAll(async () => {
        await chromeDriver.quit();
    })

});
