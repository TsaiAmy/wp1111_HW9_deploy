import express from 'express'; 
import cors from 'cors';
import db from './db';
import routes from './routes';
import bodyParser from 'body-parser'

db.connect();

const app = express();

console.log("env", process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
    app.use(cors());
}

// app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use(bodyParser.json());

if(process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function(req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    })
}

const port = process.env.PORT || 4000;

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);
