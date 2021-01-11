import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const port = parseInt(`${process.env.PORT}`);

app.listen(3000);
console.log(`Running on port ${port}`);