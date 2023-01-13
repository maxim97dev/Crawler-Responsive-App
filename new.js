const Apify = require('apify');
const { log } = Apify.utils;

log.setLevel(log.LEVELS.OFF);
Apify.main(async () => {

    const requestQueue = await Apify.openRequestQueue();
    await requestQueue.addRequest({ url: 'https://yavid.by/' });

    const crawler = new Apify.PuppeteerCrawler({
        requestQueue,
        launchContext: {
            launchOptions: {
                headless: false,
                // Other Puppeteer options
            },
        },
        minConcurrency: 1,
        maxConcurrency: 5,
        handlePageFunction: async ({ request, page }) => {
            await page.setViewport({ width: 320, height: 568});
            await page.waitForTimeout(1700);
            const title = await page.title();

            const dimensions = await page.evaluate(() => {
                return {
                  scroll: document.documentElement.scrollWidth,
                  width: document.documentElement.clientWidth,
                  height: document.documentElement.clientHeight,
                  deviceScaleFactor: window.devicePixelRatio,
                };
            });

            const dataset = await Apify.openDataset();

            await dataset.pushData({
                url: request.url,
                test: '123'
            });

            // open default dataset
            const dataSet = await Apify.openDataset();

            // calling map function and filtering through mapped items
            const pageArray = (await dataSet.map(item => item));

            // saving result of map to default Key-value store
            await Apify.setValue('pages', pageArray);

            //console.log(dimensions.width + '|' +  css);
            console.log('Dimension:', dimensions, 'URL', request.url);

            await Apify.utils.enqueueLinks({
               requestQueue,
               page,
               pseudoUrls: ['https://yavid.by/[.*]'],
            });
        },
    });

    await crawler.run();
});
