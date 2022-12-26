import express from 'express'; 
import cors from 'cors';
import db from './db';
import routes from './routes';
import bodyParser from 'body-parser'

db.connect();

const app = express();
const port = process.env.PORT || 4000;

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);
app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use(bodyParser.json());