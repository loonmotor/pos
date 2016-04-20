'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _routes = require('../../app-built/routes');

var _routes2 = _interopRequireDefault(_routes);

var _server = require('react-dom/server');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var getPropsFromRoute = function getPropsFromRoute(_ref, componentProps) {
	var routes = _ref.routes;

	var props = {};
	var lastRoute = routes[routes.length - 1];
	routes.reduceRight(function (prevRoute, currRoute) {
		componentProps.forEach(function (componentProp) {
			if (!props[componentProp] && currRoute.component[componentProp]) {
				props[componentProp] = currRoute.component[componentProp];
			}
		});
	}, lastRoute);
	return props;
};

var renderRoute = function renderRoute(res, routeObj) {
	var routeProps = getPropsFromRoute(routeObj, ['requestInitialData']);
	if (routeProps.requestInitialData) {
		routeProps.requestInitialData().then(function (data) {
			var handleCreateElement = function handleCreateElement(Component, props) {
				return _react2.default.createElement(Component, _extends({ initialData: data }, props));
			};
			res.render('index', {
				reactInitialData: JSON.stringify(data),
				content: (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, _extends({ createElement: handleCreateElement }, routeObj)))
			});
		}, function (error) {
			res.send(error.message);
		});
	} else {
		res.render('index', {
			reactInitialData: null,
			content: (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, routeObj))
		});
	}
};

router.get('/', function (req, res) {
	(0, _reactRouter.match)({ routes: _routes2.default, location: req.originalUrl }, function (error, redirectLocation, routeObj) {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (routeObj) {
			renderRoute(res, routeObj);
		} else {
			res.status(404).send('Not found');
		}
	});
});

exports.default = router;