const fs = require('fs');
const mineType = require('mime-types');
const pngPathToBase64=(path)=>{
	let data = fs.readFileSync( path);
	data =  Buffer.from(data).toString('base64');
	return 'data:' + mineType.lookup(path) + ';base64,' + data;

}

console.log(pngPathToBase64('captcha/edabfc70-24c9-11eb-bea1-cf439d33c20e.png'))

module.exports .pngPathToBase64=pngPathToBase64
