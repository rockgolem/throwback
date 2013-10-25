	/* globals Throwback, Base */
	var setup;
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
			setup = fn;
		},

		start : function(){
			setup();
		}
	});