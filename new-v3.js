import { Dataset, KeyValueStore, purgeDefaultStorages, PuppeteerCrawler } from 'crawlee';

await purgeDefaultStorages();

const crawler = new PuppeteerCrawler({
    launchContext: {
        launchOptions: {
            headless: false,
            // Other Puppeteer options
        },
    },
    async requestHandler({ request, page, enqueueLinks }) {
        await page.setViewport({
              width: 320,
              height: 568,
        });

        const dimensions = await page.evaluate(() => {
          return {
            widthClient: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            responsiveCheck: document.documentElement.clientWidth === document.documentElement.scrollWidth ? 'true' : 'false',
          };
        });

        await Dataset.pushData({
            url: request.url,
            dimensions
        });

        const dataSet = await Dataset.open();

        const pageArray = await dataSet.map(item => item);

        await KeyValueStore.setValue('pages', pageArray);

        console.log('Dimension:', dimensions, 'URL', request.url);

        await enqueueLinks({
            pseudoUrls: ['https://modern-house.by/' + '[(?!\\S+(?:jpe?g|png|bmp|gif|page|sort=|display=|year=|RID=|set_filter=))\\S+]'],
        });
    },
    // maxRequestsPerCrawl: 10,
    maxRequestsPerMinute: 15,
});

await crawler.run(['https://modern-house.by/']);
