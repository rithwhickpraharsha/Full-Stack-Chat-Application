import express from 'express';
import Route from './routes/route.js';
//in js we need to write .js while in jsx we dont
import cors from 'cors';
//cors is used if we have page in one port and any operation leads use to another port then search engine shows error ...cors handles this error

import bodyParser from 'body-parser';
import Connection from './database/db.js';
const app = express();
app.use(cors());
app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended : true}));
app.use('/',Route);
Connection();
const PORT =8000;

app.listen(PORT,()=> console.log(`SERVER IS successfull at that ${PORT}`)); 