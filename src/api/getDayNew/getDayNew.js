const request = require('request');

module.exports = {
	getDayNew:function(req,res) {
		let send = function (a) {
			res.send(a);
		}
		let getdaynew = function (callback) {
			request({
				method: 'GET',
				url: 'https://i.match.qq.com/ninja/fragcontent?pull_urls=news_top_2018&callback=__jp0',
				qs: {
					pull_urls: 'news_top_2018',
					callback: '__jp0'
				}
			}, (err, res, body) => {
				if (err) throw err;
				let data=body;
				callback(data);
			})
		}
		getdaynew(send);
	}
}