var connect = require('connect');

connect(connect.static(__dirname + '/examples')).listen(8080);