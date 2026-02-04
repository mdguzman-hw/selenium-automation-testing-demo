/* MDG 2026 */

/**
 * Imports
 */
import { generateLogFileName, setLanguage } from '../../common/Utility';
import { LANGUAGE } from '../../common/Constants';
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
    public testTotal: number;
    public passed: number;
    public failed: number;

    /**
     * Constructor
     */
    constructor (locale: LANGUAGE, driver: WebDriver, target: string, component: string, handle?: string) {
        setLanguage(locale);

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
