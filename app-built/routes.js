'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _NotFound = require('./components/NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _Item = require('./components/Item');

var _Item2 = _interopRequireDefault(_Item);

var _Items = require('./components/Items');

var _Items2 = _interopRequireDefault(_Items);

var _Transaction = require('./components/Transaction');

var _Transaction2 = _interopRequireDefault(_Transaction);

var _Transactions = require('./components/Transactions');

var _Transactions2 = _interopRequireDefault(_Transactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
	_reactRouter.Route,
	{ path: '/', component: _App2.default, name: 'Home' },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: 'item', component: _Item2.default, name: 'Create Item' }),
	_react2.default.createElement(_reactRouter.Route, { path: 'item/:id', component: _Item2.default, name: 'Edit Item' }),
	_react2.default.createElement(_reactRouter.Route, { path: 'items', component: _Items2.default, name: 'Manage Items' }),
	_react2.default.createElement(_reactRouter.Route, { path: 'transaction/', component: _Transaction2.default, name: 'Create Transaction' }),
	_react2.default.createElement(_reactRouter.Route, { path: 'transaction/:id', component: _Transaction2.default, name: 'Edit Transaction' }),
	_react2.default.createElement(_reactRouter.Route, { path: 'transactions', component: _Transactions2.default, name: 'Manage Transactions' }),
	_react2.default.createElement(_reactRouter.Route, { path: '*', component: _NotFound2.default, name: 'Not Found' })
);