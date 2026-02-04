/* MDG 2026 */

/**
 * Imports
 */
import { Browser, Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { HOMEWEB_LANDING_URL_EN, LANGUAGE } from '../src/common/Constants';

describe ('Build Acceptance Test', () => {
    // 1: Declare variables
    let chromeDriver: WebDriver;
    let options: chrome.Options
    let window: string;
    let target: string;
    let locale: LANGUAGE

    // 2: Runs once BEFORE ALL tests
    beforeAll(async () => {
        // 2.1: Set up browser
        options = new chrome.Options();
        options.addArguments(
            '--incognito',
            // '--start-maximized',
        );
        chromeDriver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
        window = await chromeDriver.getWindowHandle();
    });

    // 3: Runs once AFTER ALL tests
    afterAll(async () => {
        await chromeDriver.quit();
    });

    // 4: English Tests
    describe('EN', () => {
        beforeAll(() => {
            target = HOMEWEB_LANDING_URL_EN;
            locale = LANGUAGE.ENGLISH;
        });

        describe('Homeweb', () => {
            test('BAT-WEB-001', async () => {
                await chromeDriver.get(target);
                window = await chromeDriver.getWindowHandle();
            })

            test('BAT-WEB-002', async () => {
                // TODO: Homepage articles
            })

            test('BAT-WEB-003', async () => {
                // TODO: Login
            })

            test('BAT-WEB-004', async () => {
                // TODO: Validate article
            })

            test('BAT-WEB-005', async () => {
                // TODO: Validate Sentio kick-out
            })

            test('BAT-WEB-006', async () => {
                // TODO: Logout
            })

            test('BAT-WEB-007', async () => {
                // TODO: Login different account
            })

            test('BAT-WEB-008', async () => {
                // TODO: Validate kick outs (ChildCar, ElderCar, HRA)
            })

            test('BAT-WEB-009', async () => {
                // TODO: Validate course consent
            })

        })

        describe('Customer Portal', () => {
            test('BAT-WEB-010', async () => {
                // TODO: Customer Portal
            })

            test('BAT-WEB-011', async () => {
                // TODO: Login
            })
        })

    })

})
