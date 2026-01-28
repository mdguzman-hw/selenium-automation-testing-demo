/* MDG 2026 */

/**
 * Imports
 */
import { generateLogFileName } from '../../Utility';
import { WebDriver } from 'selenium-webdriver';

/**
 * Base Test class
 */
export class BaseTest {
    /**
     * Member Variables
     */
    protected chromeDriver: WebDriver;
    protected originalWindow?: string;
    protected logFilename: string;
    protected targetURL: string;

    protected startTime: number;
    protected testTotal: number;
    protected passed: number;
    protected failed: number;

    /**
     * Constructor
     */
    constructor (locale: string, driver: WebDriver, target: string, component: string, handle?: string) {
        this.chromeDriver = driver;
        this.originalWindow = handle;
        this.logFilename = generateLogFileName(`${component}-${locale}`);
        this.targetURL = target;

        this.testTotal = 0;
        this.startTime = 0;
        this.passed = 0;
        this.failed = 0;
    }// End of constructor
}// End of class
// End of file
