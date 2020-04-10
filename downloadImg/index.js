var request = require('request');
var fs = require('fs');
var imgs = [
    "http://wj.zljweb.com/zljfiles/UploadFile/Contract/20191104/8886e6e3-f7e9-4836-89cf-40440a56d508.jpg"
  ]
for (let index = 0; index < imgs.length; index++) {
    const src = imgs[index];
    setTimeout(() => {
        var filename = Math.random().toString(16).substring(2);
        request.head(src, function (err, res, body) {
            if (err) {
                console.log(err);
            }
        });
        var img_filename = `${filename}.jpg`;
        request(src).pipe(fs.createWriteStream('./img/' + img_filename));
        console.log(img_filename)
    }, index * 1000)
}


