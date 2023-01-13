const Apify = require('apify');
const { log } = Apify.utils;
//const { GoogleSpreadsheet } = require('google-spreadsheet');

log.setLevel(log.LEVELS.OFF);


Apify.main(async () => {
    const requestQueue = await Apify.openRequestQueue();
    await requestQueue.addRequest({ url: 'https://modern-house.by/' });


    const crawler = new Apify.PuppeteerCrawler({
        requestQueue,
        launchContext: {
            // Here you can set options that are passed to the playwright .launch() function.
            launchOptions: {
                headless: false
            },
        },
        handlePageFunction: async ({ request, page, response }) => {
            await page.setViewport({
                width: 320,
                height: 568,
            });
            await page.waitForTimeout(1000);
            const title = await page.title();

            const dimensions = await page.evaluate(() => {
                return {
                  widthClient: document.documentElement.clientWidth,
                  scrollWidth: document.documentElement.scrollWidth,
                  responsiveCheck: document.documentElement.clientWidth == document.documentElement.scrollWidth ? 'true' : 'false',
                };
              });

            await Apify.pushData({
                url: request.url,
                width: dimensions.widthClient,
                scroll: dimensions.scrollWidth,
                responsiveStatus: dimensions.widthClient == dimensions.scrollWidth ? 'true' : 'false',
                statusCode: response._status
            });

            const dataSet = await Apify.openDataset('default');
            const pagetojson = (await dataSet.map(item => item));
            await Apify.setValue('array_page', pagetojson);

            console.log( 'StatusCode:', response._status, '| Dimensions:', dimensions, 'Page:', request.url);

            await Apify.utils.enqueueLinks({
                page,
                requestQueue,
                pseudoUrls: ['https://modern-house.by/' + '[(?!\\S+(?:jpe?g|png|bmp|gif|page|sort=|display=|year=|RID=|set_filter=))\\S+]'], //Исключаем парсинг по маске
            });
        },
        //maxRequestsPerCrawl: 2,
        maxConcurrency: 2,
    });

    await crawler.run();
});
