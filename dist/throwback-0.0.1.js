/**
 * throwback v0.0.1 - 2013-05-30
 * Retro Game Rendering Engine
 *
 * Copyright (c) 2013 Stephen Young <steve@rockgolem.com>
 * Licensed MIT
 */
;(function(jQuery, undefined){
    "use strict";
	var Throwback = {};
var Base = Throwback.Base = function(){};

	/**
	 * Create subclass and correctly set up the prototype chain.
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
/**
	 * Discourage global use of jQuery
	 */
	if (jQuery){
		Throwback.jQuery = jQuery.noConflict();
	}

	var Bootstrap = Throwback.Bootstrap = Base.extend({
		constructor : function(){}
	});
var Node = Throwback.Node = Base.extend();
var Entity = Throwback.Entity = Node.extend();
var Group = Throwback.Group = Node.extend();
var Layer = Throwback.Layer = Node.extend();
var Scene = Throwback.Scene = Node.extend();
var Stage = Throwback.Stage = Node.extend();
if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Throwback;
    } else {
        this.Throwback = Throwback;
    }
}).call(this, this.jQuery);