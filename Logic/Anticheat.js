const crypto = require('crypto');

module.exports.rnd = function(seed) {
    crypto.createHash('sha256')
	.update(seed)
	.digest('hex').charCodeAt(2);
}