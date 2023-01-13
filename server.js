const express = require('express'); // Adding Express
const app = express(); // Initializing Express

// const crawlee

const { Dataset, KeyValueStore, CriticalError, PuppeteerCrawler } = require('crawlee');

// import { Dataset, KeyValueStore, PuppeteerCrawler } from 'crawlee';

const criticalError = new CriticalError;

app.get('/start', async (req, res) => {
  res.json({
    status: 'start',
  });

  await crawler.run(['https://modern-house.by/']);
});

app.get('/stop', (req, res) => {
  res.json({
    status: 'stop',
  });

});



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


// Making Express listen on port 5000
app.listen(5000, function () {
  console.log(`Running on port 5000.`);
});
