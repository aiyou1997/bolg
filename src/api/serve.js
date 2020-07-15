const experss = require('express');
const app = experss();
const { getMid } = require('./getMid/getMid');
const { getM4aUrl } = require('./getM4aUrl/getM4aUrl');
const { getDayNew } = require('./getDayNew/getDayNew');

app.all("*", function (req, res, next) { //解决跨域请求问题
	res.header({
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Origin': req.headers.origin || '*',
		'Access-Control-Allow-Headers': 'content-type',
		'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
		'Content-Type': 'application/json; charset=utf-8'
	});
	if (req.method === "OPTIONS") {
		res.status(200).send("OK")
		// eslint-disable-next-line no-console
		console.log("has option")
	} else {
		next()
	}
});

app.get('/api/getMid/:name', getMid);
app.get('/api/getM4aUrl/:mid',getM4aUrl);
app.get('/api/getDayNew/new', getDayNew);

app.listen(9527)