const request = require('request');

module.exports = {
    getMid: function (req, res) {
        let send = function (a) {
            res.send(a)
        }
        let getmid = function (songName, callback) {
            let list = []
            request({
                method: 'GET',
                url: `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?`,
                qs: {
                    ct: 24,
                    qqmusic_ver: 1298,
                    new_json: 1,
                    remoteplace: 'txt.yqq.song',
                    searchid: 71831764714167148,
                    t: 0,
                    aggr: 1,
                    cr: 1,
                    catZhida: 1,
                    lossless: 0,
                    flag_qc: 0,
                    p: 1,
                    n: 10,
                    w: `${songName}`,
                    g_tk_new_20200303: 5381,
                    g_tk: 5381,
                    loginUin: 0,
                    hostUin: 0,
                    format: 'json',
                    inCharset: 'utf8',
                    outCharset: 'utf - 8',
                    notice: 0,
                    platform: 'yqq.json',
                    needNewCode: 0,
                }
            }, (err, res, body) => {
				let c = JSON.parse(body).data.song.list;
                c.forEach(function (value) {
                    list.push({
                        name: value.name,
                        singer: value.singer[0].name,
						mid: value.mid,
						pmid:value.album.pmid
                    })
                })
                callback(list)
            })
        }
        getmid(req.params.name,send);
    }
}