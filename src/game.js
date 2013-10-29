	/* globals Throwback, Base, requestAnimationFrame, _render */

	/**
	 * Function set by the user to be called before starting the event loop.
	 *
	 * @var Function
	 */
	var _gameSetup = function(){};

	/**
	 * Function set by the user to be called each tick.
	 *
	 * @var Function
	 */
	var _logicUpdate = function(){};

	/**
	 * Used by the game loop to keep track of elapsed time.
	 *
	 * @var Number
	 */
	var _previousTime = (new Date()).getTime();

	/**
	 * Used by the game loop to keep track of slow processes.
	 *
	 * @var Number
	 */
	var _lag = 0.0;

	/**
	 * Number if miliseconds allowed per update.
	 *
	 * @var Number
	 */
	var MS_PER_UPDATE = 60;

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

	/**
	 * Primary game loop
	 *
	 * @var Function
	 */
	var _mainLoop = function(){
		var now;

		now = (new Date()).getTime();
		_lag += now - _previousTime;
		_previousTime = now;

		// TODO: process user input here

		while(_lag >= MS_PER_UPDATE) {
			_logicUpdate();
			_lag -= MS_PER_UPDATE;
		}

		_render(_lag / MS_PER_UPDATE, now);

		requestAnimationFrame(_mainLoop);
	};