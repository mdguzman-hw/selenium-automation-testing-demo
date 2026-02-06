/* MDG 2026 */

/**
 * Imports
 */
import { BaseTest } from './tests/BaseTest';
import { HOMEWEB_DOMAIN, ID, LANGUAGE, TAG, TIMEOUT } from './common/Constants';
import { By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { ElementType } from './types/ElementType';
import { appendFile } from 'node:fs/promises';
import { translate } from './common/Utility';

/**
 * Login - Tests
 */
export class Login extends BaseTest {
    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: LANGUAGE, driver: WebDriver, target: string, handle?: string) {
        super(locale, driver, target, TAG.LOGIN, handle);
    }// End of constructor()

    public async testInput(testElement: ElementType, input: string) {
        const {id, identifier} = testElement;
        let element: WebElement;

        // 1: Find element
        element = await this.chromeDriver.findElement(By.id(identifier))

        // 2: Scroll to element
        await this.chromeDriver.executeScript(
            "arguments[0].scrollIntoView({ block: 'center', inline: 'center' });",
            element
        );
        await this.chromeDriver.sleep(TIMEOUT.S_HALF);
        await this.chromeDriver.wait(until.elementIsVisible(element), TIMEOUT.S_FIVE);
        await this.chromeDriver.wait(until.elementIsEnabled(element), TIMEOUT.S_FIVE);

        // 3: Click element
        await element.click();

        // 4: Ensure input is cleared
        await element.clear();

        // 5: Enter input
        await element.sendKeys(input);
        const success_message = `${id}->success\n`;
        await appendFile(this.logFilename, success_message);
    }

    public async testButton(buttonElement: ElementType) {
        const {id, identifier, route} = buttonElement;

        // 1: Find element
        const button = await this.chromeDriver.findElement(By.css(identifier))
        const buttonText = await button.getText();

        // 2: Scroll to element
        await this.chromeDriver.executeScript(
            "arguments[0].scrollIntoView({ block: 'center', inline: 'center' });",
            button
        );
        await this.chromeDriver.sleep(TIMEOUT.S_HALF);
        await this.chromeDriver.wait(until.elementIsVisible(button), TIMEOUT.S_FIVE);
        await this.chromeDriver.wait(until.elementIsEnabled(button), TIMEOUT.S_FIVE);

        // 3: Click element
        await button.click();

        // 4: Check which button was clicked
        switch (buttonText) {
            case translate('login_next'):
                // 4.1: Next button clicked, check if password field is located
                await this.chromeDriver.wait(until.elementLocated(By.id(ID.PASSWORD)))
                break;
            case translate('login_submit'):
                const url = new URL(await this.chromeDriver.getCurrentUrl());

                // 4.2: Domain Check - Homeweb
                if (url.origin === HOMEWEB_DOMAIN) {
                    // 4.2.1: Route Check - Dashboard
                    if (url.pathname === route) {
                        // 4.2.1: Test - Pass
                        const success_message = `${id}->success\n`;
                        await appendFile(this.logFilename, success_message);
                    }
                    else {
                        // 4.2.2: Test - Fail | Pathname doesn't match
                        throw new Error(`Expected route ${route}, got ${url.pathname}`);
                    }
                }
                // 4.3: Domain Check - UNKNOWN
                else {
                    // 4.3.1: Test - Fail | Domain doesn't match
                    throw new Error(`UNKNOWN ORIGIN: ${url.origin}`);
                }
                break;
        }

        // 5: Additional check to ensure page content has been loaded
        await this.chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)))
        const success_message = `${id}->success\n`;
        await appendFile(this.logFilename, success_message);
    }
}
