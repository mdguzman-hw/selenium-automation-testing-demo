export function generateLogFileName(prefix: string) {
    let logFilename = ''
    const LOGS_DIRECTORY = 'logs';

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dateStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
    const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

    // TODO: Ensure logs directory exists, if not create
    /**
     * node_modules/@types/node/fs/promises.d.ts
     *
     * Using fsPromises.access() to check for the accessibility of a file before calling fsPromises.open() is not
     * recommended. Doing so introduces a race condition, since other processes may change the file's state between
     * the two calls.
     *
     * Instead, user code should open/read/write the file directly and handle the error raised if the file is not
     * accessible.
     */
    // 1: Check if logs directory exists
    try {
        // const exists = await open(LOGS_DIRECTORY);
        // if (exists) {
            // return exists;
            logFilename = `${LOGS_DIRECTORY}/${prefix}-${dateStr}_${timeStr}.txt`;
            return logFilename;
        // }
        // for await (const dirent of dir)
        //     console.log(dirent.name);
    }
    catch (error: any) {
        console.log('ERROR::getLog->', error);
        return logFilename;
        // const message_driver = `DRIVER->success\n`;
        // await appendFile(logFilename, message_driver );
    }
    // return `${LOGS_DIRECTORY}/header-results-${dateStr}_${timeStr}.txt`;
}

export function generateSummary(total: number, pass: number, fail: number, time: number) {
    return `\nSUMMARY\nTOTAL: ${total}\nPASS: ${pass}\nFAIL: ${fail}\nTIME TAKEN: ${time}ms\n`
}

export function generateReport(total: number, pass: number, fail: number) {
    return `\nREPORT\nTOTAL: ${total}\nPASS: ${pass}\nFAIL: ${fail}\n\n`
}
