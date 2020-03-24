var request = require('request');
var fs = require('fs');

var img_src = 'https://c-ssl.duitang.com/uploads/item/202003/19/20200319121448_RrsR2.jpeg'; //获取图片的url
// request.head(img_src, function (err, res, body) {
//     if (err) {
//         console.log(err);
//     }
// });

var img_filename = 'mu.jpg';
request(img_src).pipe(fs.createWriteStream('./image' + img_filename))