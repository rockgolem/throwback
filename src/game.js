	/* globals Throwback, Base */

	/**
	 * Game object is the primary constructor
	 *
	 * It creates a stage and maintains the game loop
	 *
	 * @param Object
	 * @return void
	 */
	var Game = Throwback.Game = Base.extend({
		constructor : function(){
			this.stage = new Throwback.Stage();
		}
	});