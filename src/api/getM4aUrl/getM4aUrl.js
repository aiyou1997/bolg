const request = require('request');

module.exports = {
	getM4aUrl: function (req, res) {
		let send = function (a) {
			res.send(a)
		}
		let getPurl = function (mid, callback) {
			request({
				method: 'GET',
				url: 'https://u.y.qq.com/cgi-bin/musicu.fcg?',
				qs: {
					_: 'getplaysongvkey09159781386795607',
					g_tk: '1008611475',
					sign: 'zza0c5yh155juxir37ab06112dbfbf3915c55a22fded0db3',
					loginUin: '2359484655',
					hostUin: '0',
					format: 'json',
					inCharset: 'utf8',
					outCharset: 'utf-8',
					notice: '0',
					platform: 'yqq.json',
					needNewCode: '0',
					data: `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"5405819418","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"5405819418","songmid":["${mid}"],"songtype":[0],"uin":"2359484655","loginflag":1,"platform":"20"}},"comm":{"uin":2359484655,"format":"json","ct":24,"cv":0}}`
				}
			}, (err, res, body) => {
				if (err) throw err;
				let purl = JSON.parse(body).req_0.data.midurlinfo[0].purl;
				let sip = JSON.parse(body).req.data.sip;
				let m4aUrl = [];
				sip.forEach((item) => {
					return m4aUrl.push(item + purl);
				});
				// for (let i = 0; i < m4aUrl.length; i++) {
				// 	request({
				// 		method: 'GET',
				// 		url: `${m4aUrl[i]}`
				// 	}, (err, res) => {
				// 		if (res.statusCode === 200) {
				// 			M4aUrl = m4aUrl[i]
				// 			callback(M4aUrl,send)
				// 		}
				// 	})
				// }
				callback(m4aUrl,send)
			})
		}
		getPurl(req.params.mid, send)
	}
} 