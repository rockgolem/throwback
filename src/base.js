	/* globals Throwback */

	/**
	 * Base object.
	 *
	 * All Throwback constructors inherit from this object.
	 */
	var Base = Throwback.Base = function(){};

	/**
	 * Create a subclass and correctly set up the prototype chain.
	 *
	 * @return Object
	 */
	Base.extend = function(properties, statics) {
		var child, parent, Surrogate, $;

		parent = this;

		if (properties && properties.hasOwnProperty('constructor')){
			child = properties.constructor;
		} else {
			child = function(){ return parent.apply(this, arguments); };
		}

		$ = Throwback.jQuery;
		$.extend(child, parent, statics);
		Surrogate = function(){ this.constructor = child; };
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();
		child.__super__ = parent.prototype;

		if (properties){
			$.extend(child.prototype, properties);
		}

		return child;
	};