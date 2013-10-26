	/* globals Throwback, Base, requestAnimationFrame */
	var _gameSetup, _logicUpdate, _mainLoop, _previousTime, _lag;

	var MS_PER_UPDATE = 60;


	_gameSetup = _logicUpdate = function(){};

	/**
	 * Game object is the primary constructor
	 *
	 * It creates a stage and maintains the game loop
	 *
	 * @param Object
	 * @return void
	 */
	var Game = Throwback.Game = Base.extend({
		constructor : function(config){
			var options = Throwback.jQuery.extend({}, config);
			this.stage = options.stage || new Throwback.Stage();
		},

		setup : function(fn){
			_gameSetup = fn;
		},

		start : function(){
			_gameSetup();
			_mainLoop();
		},

		tick : function(fn){
			_logicUpdate = fn;
		},
	});

	_previousTime = (new Date()).getTime();
	_lag = 0.0;

	/**
	 * Main logic / render loop.
	 *
	 * @return void
	 */
	_mainLoop = function(){
		var now;

		now = (new Date()).getTime();
		_lag += now - _previousTime;
		_previousTime = now;

		// TODO: process user input here

		while(_lag >= MS_PER_UPDATE) {
			_logicUpdate();
			_lag -= MS_PER_UPDATE;
		}

		_render(_lag / MS_PER_UPDATE);

		requestAnimationFrame(_mainLoop);
	};