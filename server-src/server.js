import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import restLogger from 'morgan';
import path from 'path';
import rootRoute from './routes/root';
import itemRoute from './routes/item';
import itemsRoute from './routes/items';
import './setup/restfulApi';

const
	app = express();

app.enable('trust proxy');

app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');

app.use(restLogger('dev'));
app.use(bodyParser.urlencoded({ extended : false, limit : '1mb' }));
app.use(bodyParser.json({ limit : '1mb' }));

app.use('/data', itemRoute);
app.use('/data', itemsRoute);

app.use(express.static(path.join(__dirname, '../public'), {
	maxAge : 0
}));

app.use('*', rootRoute);

app.listen(3000);