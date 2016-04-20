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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.enable('trust proxy');

app.engine('ejs', _ejs2.default.__express);
app.set('view engine', 'ejs');

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.urlencoded({ extended: false, limit: '1mb' }));
app.use(_bodyParser2.default.json({ limit: '1mb' }));

app.use(_express2.default.static(_path2.default.join(__dirname, '../public'), {
	maxAge: 0
}));

app.use('*', _root2.default);

app.listen(3000);