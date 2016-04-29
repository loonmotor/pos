'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _root = require('./routes/root');

var _root2 = _interopRequireDefault(_root);

var _item = require('./routes/item');

var _item2 = _interopRequireDefault(_item);

var _items = require('./routes/items');

var _items2 = _interopRequireDefault(_items);

var _transaction = require('./routes/transaction');

var _transaction2 = _interopRequireDefault(_transaction);

var _transactions = require('./routes/transactions');

var _transactions2 = _interopRequireDefault(_transactions);

var _heartBeat = require('./routes/heartBeat');

var _heartBeat2 = _interopRequireDefault(_heartBeat);

var _noScriptItem = require('./routes/noScriptItem');

var _noScriptItem2 = _interopRequireDefault(_noScriptItem);

var _noScriptItems = require('./routes/noScriptItems');

var _noScriptItems2 = _interopRequireDefault(_noScriptItems);

var _noScriptTransaction = require('./routes/noScriptTransaction');

var _noScriptTransaction2 = _interopRequireDefault(_noScriptTransaction);

var _noScriptTransactions = require('./routes/noScriptTransactions');

var _noScriptTransactions2 = _interopRequireDefault(_noScriptTransactions);

var _home = require('./routes/home');

var _home2 = _interopRequireDefault(_home);

require('./setup/restfulApi');

require('./setup/noScriptRestfulApi');

var _sse = require('sse');

var _sse2 = _interopRequireDefault(_sse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.enable('trust proxy');

app.engine('ejs', _ejs2.default.__express);
app.set('view engine', 'ejs');

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.urlencoded({ extended: false, limit: '1mb' }));
app.use(_bodyParser2.default.json({ limit: '1mb' }));

app.use('/data', _item2.default);
app.use('/data', _items2.default);
app.use('/data', _transaction2.default);
app.use('/data', _transactions2.default);
app.use('/data', _home2.default);
app.use('/heart-beat', _heartBeat2.default);
app.use('/noscript/data', _noScriptItem2.default);
app.use('/noscript/data', _noScriptItems2.default);
app.use('/noscript/data', _noScriptTransaction2.default);
app.use('/noscript/data', _noScriptTransactions2.default);

app.use(_express2.default.static(_path2.default.join(__dirname, '../public'), {
	maxAge: 0
}));

app.use('*', _root2.default);

var server = app.listen(3000);

var sse = new _sse2.default(server);

sse.on('connection', function (connection) {
	console.log('new connection');
	var intervalId = setInterval(function () {
		connection.send({
			event: 'heartbeat',
			data: Date.now().toString()
		});
	}, 5000);

	connection.on('close', function () {
		console.log('lost connection');
		clearInterval(intervalId);
	});
});