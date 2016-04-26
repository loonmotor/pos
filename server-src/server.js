import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import restLogger from 'morgan';
import path from 'path';
import rootRoute from './routes/root';
import itemRoute from './routes/item';
import itemsRoute from './routes/items';
import heartBeatRoute from './routes/heartBeat';
import './setup/restfulApi';
import SSE from 'sse';

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
app.use('/heart-beat', heartBeatRoute);

app.use(express.static(path.join(__dirname, '../public'), {
	maxAge : 0
}));

app.use('*', rootRoute);

const server = app.listen(3000);

const sse = new SSE(server);

sse.on('connection', connection => {
	console.log('new connection');
	const intervalId = setInterval(() => {
		connection.send({
			event : 'heartbeat',
			data : Date.now().toString()
		});
	}, 5000);

	connection.on('close', () => {
		console.log('lost connection');
		clearInterval(intervalId);
	});
});

