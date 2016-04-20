'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavMenu = function (_Component) {
	_inherits(NavMenu, _Component);

	function NavMenu() {
		_classCallCheck(this, NavMenu);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NavMenu).apply(this, arguments));
	}

	_createClass(NavMenu, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'ul',
				{ className: 'uk-subnav uk-subnav-pill uk-float-right' },
				_react2.default.createElement(
					'li',
					{ 'data-uk-dropdown': '{mode:\'click\'}' },
					_react2.default.createElement(
						'a',
						{ href: '#' },
						'Actions ',
						_react2.default.createElement('i', { className: 'uk-icon-angle-down' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'uk-dropdown uk-dropdown-small' },
						_react2.default.createElement(
							'ul',
							{ className: 'uk-nav uk-nav-dropdown' },
							_react2.default.createElement(
								'li',
								null,
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/' },
									_react2.default.createElement('i', { className: 'uk-icon-folder-o' }),
									' action1'
								)
							),
							_react2.default.createElement(
								'li',
								null,
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/' },
									_react2.default.createElement('i', { className: 'uk-icon-folder-o' }),
									' action2'
								)
							)
						)
					)
				)
			);
		}
	}]);

	return NavMenu;
}(_react.Component);

exports.default = NavMenu;