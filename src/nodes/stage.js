	/* globals Throwback, Scene, Node:true */
	var attachStage;

	/**
	 * The stage object keeps track of layers and represents the base element.
	 */
	var Stage = Throwback.Stage = Node.extend({

		addChild : function(node){
			Node.prototype.addChild.call(this, node);
			this.attach(node);
		},

		// Make a node append to the stage element
		attach : function(node){
			var children, stage;

			if(!node.stage){
				node.stage = stage = this;

				Throwback.jQuery(node.el).appendTo(this.el);

				children = node.children;
				if (children.length){
					children.forEach(function(node){
						stage.attach(node);
					});
				}
			}
		},
		constructor : function(config){
			var options = Throwback.jQuery.extend({}, config);

			Node.call(this);
			this.el = options.el || this.el;
			attachStage.call(this, options.container);
		}
	});

	/**
	 * Creates a stage object and appends it to the provided container, or to the body
	 *
	 * @param String container a selector
	 * @return void
	 */
	attachStage = function(container) {
		Throwback
			.jQuery(this.el)
			.addClass('stage')
			.appendTo(container || 'body');
	};