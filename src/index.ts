import express, { Express, Request, Response } from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors'

const app: Express = express();

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:  true}));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/html-to-pdf', async (req: Request, res: Response) => {
  const { html } = req.body;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({
    format: 'Letter',
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '50px'
    }
  });
  await browser.close();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=file.pdf');
  res.send(pdf);
});


app.listen(4000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:4000`);
});


