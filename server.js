const express = require('express'); // Adding Express
const app = express(); // Initializing Express
const fs = require('fs');
const cors = require('cors');
const { Dataset, KeyValueStore, PuppeteerCrawler } = require('crawlee');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST',
    credentials: true
  })
);

app.post('/api/test', (req, res) => {

  res.json({
    status: 'test'
  })
});

app.post('/api/start', async (req, res) => {

  res.json({
    status: 'start',
  });

  await crawler.run([`${req.body.url}`]);
});

app.get('/api/start', async (req, res) => {
  res.json({
    status: 'start',
  });

  await crawler.run(['https://news.ycombinator.com/']);
});

app.get('/api/abort', async (req, res) => {
  res.json({
    status: 'abort',
  });

  await crawler.teardown();
});

app.get('/api/getData', async (req, res) => {
  try {
    const crawlData = getCrawlerData();
    console.log("File written successfully");
    if (typeof crawlData === 'object' && crawlData.length) res.json(crawlData);
  } catch(err) {
    console.error('err');
    res.json([]);
  }

});

app.listen(5000, function () {
  console.log(`Running on port 5000.`);
});


function getCrawlerData() {
  return JSON.parse(fs.readFileSync('storage/key_value_stores/default/pages.json', 'utf8'));
}

let id = 1;

const crawler = new PuppeteerCrawler({
  launchContext: {
    launchOptions: {
      headless: false,
    },
  },
  maxRequestsPerMinute: 20,
  minConcurrency: 1,
  maxConcurrency: 2,
  async requestHandler({ request, page, enqueueLinks }) {
    await page.setViewport({
      width: 320,
      height: 568,
    });

    const domain = await page.evaluate(() => document.location.origin);
    const pageInfo = await page.evaluate(() => {
      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        responsive: document.documentElement.clientWidth === document.documentElement.scrollWidth,
      };
    });

    const dataSet = await Dataset.open();
    const array = await dataSet.map(item => item);

    await Dataset.pushData({
      id: id++,
      url: request.url,
      ...pageInfo
    });

    console.log(domain);

    await KeyValueStore.setValue('pages', array);
    await enqueueLinks({
      strategy: 'same-domain',
      // globs: ['https://news.ycombinator.com/' + '[(?!\\S+(?:jpe?g|png|bmp|gif|page|sort=|display=|year=|RID=|set_filter=))\\S+]'],
      globs: [domain + '/*'],
    });
  },
});

