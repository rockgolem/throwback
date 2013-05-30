/**
 * throwback v0.0.1 - 2013-05-29
 * Retro Game Rendering Engine
 *
 * Copyright (c) 2013 Stephen Young <steve@rockgolem.com>
 * Licensed MIT
 */
;(function(undefined){
    "use strict";
	var Throwback = {};
/**
	 * Throwback likes to be in control of jQuery.
	 */
	if (this.$ && this.jQuery === this.$){
		this.$.noConflict();
		var $ = this.jQuery;
	}
var Base = Throwback.Base = function(){};

	/**
	 * Create subclass and correctly set up the prototype chain.
	 *
	 * @return Object
	 */
	Base.extend = function(properties, statics) {
		var child, parent, Surrogate;

		parent = this;

		if (properties && typeof properties.constructor === 'function'){
			child = properties.constructor;
		} else {
			child = function(){ return parent.apply(this, arguments); };
		}

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
var Node = Throwback.Node = Base.extend();
if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Throwback;
    } else {
        this.Throwback = Throwback;
    }
}).call(this);