import restfulApi from '../modules/restfulApi';
import db from './mongojs';

restfulApi.use('Item', 'POST', (resourceName, req, res, done) => {
	const {name, price, paymentTypes, paymentTypes:{upfront, downpayment, multiplepayments}} = req.body;
	const errors = [];
	if (!name) {
		errors.push({ field : 'name', message : 'Name is required' });
	}
	if (!price) {
		errors.push({ field : 'price', message : 'Price is required' });
	}
	if (!upfront && !downpayment && !multiplepayments) {
		erros.push({ field : 'paymentType', message : 'Payment type is required' });
	}
	if (errors.length > 0) {
		res.json({
			errors
		});
		return done();
	}
	db.Item.insert({
		name,
		price,
		paymentTypes
	}, (err, doc) => {
		if (err) {
			return done(err);
		}
		res.send(doc);
		done();
	})
});

restfulApi.use('Items', 'GET', (resourceName, req, res, done) => {
	db.Item.find({}).sort({ $natural : -1 }, (err, docs) => {
		if (err) {
			return done(err);
		}
		res.json(docs);
		done();
	});
});
