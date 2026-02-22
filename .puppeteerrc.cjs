const fs = require('fs');

function findChromium() {
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
        return process.env.PUPPETEER_EXECUTABLE_PATH;
    }

    const paths = [
        '/app/.apt/usr/bin/google-chrome-stable',
        '/app/.apt/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/google-chrome',
    ];

    for (const p of paths) {
        if (fs.existsSync(p)) return p;
    }
    return undefined;
}

module.exports = {
    executablePath: findChromium(),
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    skipDownload: !!process.env.DYNO || !!process.env.PUPPETEER_SKIP_DOWNLOAD,
};
