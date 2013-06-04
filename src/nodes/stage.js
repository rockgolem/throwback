	/* globals Throwback, Node:true */
	var generateStage;

	/**
	 * The stage object keeps track of layers and represents the base element.
	 */
	var Stage = Throwback.Stage = Node.extend({
		constructor : function(config){
			var options = Throwback.jQuery.extend({}, config);
			this.el = options.el || generateStage(options.container);
		}
	});

	/**
	 * Creates a stage object and appends it to the provided container, or to the body
	 *
	 * @param String container a selector
	 * @return Object DOM Node
	 */
	generateStage = function(container) {
		var el = document.createElement('div');
		Throwback
			.jQuery(el)
			.addClass('stage')
			.appendTo(container || 'body');
		return el;
	};