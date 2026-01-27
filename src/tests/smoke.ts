import { headerAnonEn } from './common/header-anon-en';
import { Header } from './common/Header';

/**
 * Main
 */
async function main() {
    try {
        // await headerAnonEn();
        const header = new Header();
        await header.run();
    }
    catch (error: any) {
        console.error('MAIN->onFailure', error);
    }
}
main()

