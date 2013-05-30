var connect = require('connect'),
	http = require('http'),
	app = connect()
		.use(connect.static('examples'))
		.use(connect.directory('examples'));

http.createServer(app).listen(8080);