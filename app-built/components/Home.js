'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _HomeStore = require('../stores/HomeStore');

var _HomeStore2 = _interopRequireDefault(_HomeStore);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _HomeActionCreators = require('../actions/HomeActionCreators');

var _HomeActionCreators2 = _interopRequireDefault(_HomeActionCreators);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
	_inherits(Home, _Component);

	function Home() {
		_classCallCheck(this, Home);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));

		if (_this.props.initialData) {
			_HomeActionCreators2.default.setHome(_this.props.initialData);
		}
		return _this;
	}

	_createClass(Home, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (!this.props.initialData) {
				_HomeActionCreators2.default.getHome();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'uk-grid uk-text-center' },
				_react2.default.createElement(
					'div',
					{ className: 'uk-width-medium-4-5 uk-width-large-3-5 uk-container-center uk-margin-top' },
					_react2.default.createElement(
						'div',
						{ className: 'uk-grid' },
						_react2.default.createElement(
							'div',
							{ className: 'uk-width-3-6' },
							_react2.default.createElement(
								'div',
								{ className: 'uk-panel uk-panel-box uk-panel-box-primary' },
								_react2.default.createElement(
									'h1',
									null,
									this.state.data.itemCount
								),
								_react2.default.createElement(
									'h3',
									{ className: 'uk-panel-title' },
									_react2.default.createElement(
										_reactRouter.Link,
										{ to: 'items' },
										'Items'
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'uk-width-3-6' },
							_react2.default.createElement(
								'div',
								{ className: 'uk-panel uk-panel-box uk-panel-box-primary' },
								_react2.default.createElement(
									'h1',
									null,
									this.state.data.transactionCount
								),
								_react2.default.createElement(
									'h3',
									{ className: 'uk-panel-title' },
									_react2.default.createElement(
										_reactRouter.Link,
										{ to: 'transactions' },
										'Transactions'
									)
								)
							)
						)
					)
				)
			);
		}
	}]);

	return Home;
}(_react.Component);

Home.requestInitialData = function (_ref) {
	var server = _ref.server;
	var client = _ref.client;

	if (server) {
		return (0, _isomorphicFetch2.default)('http://localhost:3008/data/home').then(function (response) {
			return response.json();
		});
	}
};

Home.getStores = function () {
	return [_HomeStore2.default];
};

Home.calculateState = function (prevState) {
	return {
		data: _HomeStore2.default.getState()
	};
};

exports.default = _utils.Container.create(Home);