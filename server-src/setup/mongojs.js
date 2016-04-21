import mongojs from 'mongojs';
import config from '../../server.config';

const
	{url:{mongodb:databaseUrl}} = config
	, db = mongojs(databaseUrl, ['Item']);

db.on('error', err => console.log(err));
db.on('ready', () => console.log('Connected to mongo db'));

export default db;