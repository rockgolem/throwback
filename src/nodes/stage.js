	/* globals Throwback, Node:true */
	var makeStageElement;

	/**
	 * The stage object keeps track of layers and represents the base element.
	 */
	var Stage = Throwback.Stage = Node.extend({
		constructor : function(config){
			var options = Throwback.jQuery.extend({}, config);
			this.el = options.el || makeStageElement();
		}
	});

	makeStageElement = function() {
		var el = document.createElement('div');
		Throwback.jQuery(el).appendTo('body');
		return el;
	};