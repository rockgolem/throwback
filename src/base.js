	/* globals Throwback */
	var Base = Throwback.Base = function(){};

	/**
	 * Create subclass and correctly set up the prototype chain.
	 *
	 * @return Object
	 */
	Base.extend = function(properties, statics) {
		var parent, child;

		parent = this;

		if (properties && typeof properties.constructor === 'function'){
			child = properties.constructor;
		} else {
			child = function(){ return parent.apply(this, arguments); };
		}
	};