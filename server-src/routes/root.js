import express from 'express';
import React from 'react';
import {match, RouterContext} from 'react-router';
import routes from '../../app-built/routes';
import {renderToString} from 'react-dom/server';
import fs from 'fs';

const router = express.Router();

let getPropsFromRoute = ({routes}, componentProps) => {
	let props = {};
	let lastRoute = routes[routes.length -1];
	routes.reduceRight((prevRoute, currRoute) => {
		componentProps.forEach(componentProp => {
			if (!props[componentProp] && currRoute.component[componentProp]) {
				props[componentProp] = currRoute.component[componentProp];
			}
		});
	}, lastRoute);
	return props;
};

let renderRoute = (req, res, routeObj) => {
	let routeProps = getPropsFromRoute(routeObj, ['requestInitialData', 'noScriptPost']);
	if (routeProps.noScriptPost && req.method === 'POST') {
		routeProps.noScriptPost(req.body).then(
			data => {
				let handleCreateElement = (Component, props) => (
					<Component initialData={data} {...props} />
				);
				res.render('index', {
					reactInitialData : JSON.stringify(data),
					content : renderToString(<RouterContext createElement={handleCreateElement} {...routeObj} />)
				});
			},
			error => {
				res.render('index', {
					reactInitialData : null,
					content : renderToString(<RouterContext {...routeObj} />)
				});
			}
		);
		return;
	}
	if (routeProps.requestInitialData) {
		routeProps.requestInitialData({ server: { originalUrl : req.originalUrl.split('/'), query : req.query }}).then(
			data => {
				let handleCreateElement = (Component, props) => (
					<Component initialData={data} {...props} />
				);
				res.render('index', {
					reactInitialData : JSON.stringify(data),
					content : renderToString(<RouterContext createElement={handleCreateElement} {...routeObj} />)
				});
			}, 
			error => {
				res.render('index', {
					reactInitialData : null,
					content : renderToString(<RouterContext {...routeObj} />)
				});
			}
		);
	} else {
		res.render('index', {
			reactInitialData : null,
			content : renderToString(<RouterContext {...routeObj} />)
		});
	}
};

router.all('/', (req, res) => {
	match({ routes, location : req.originalUrl }, (error, redirectLocation, routeObj) => {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (routeObj) {
			renderRoute(req, res, routeObj);
		} else {
			res.status(404).send('Not found');
		}
	});

});

export default router;