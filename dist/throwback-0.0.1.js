/**
 * throwback v0.0.1 - 2013-06-03
 * Retro Game Rendering Engine
 *
 * Copyright (c) 2013 Stephen Young <steve@rockgolem.com>
 * Licensed MIT
 */
;(function(jQuery, undefined){
    "use strict";
	var Throwback = {};
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
/**
	 * Discourage global use of jQuery
	 */
	if (jQuery){
		Throwback.jQuery = jQuery.noConflict();
	}

	var Bootstrap = Throwback.Bootstrap = Base.extend({
		constructor : function(){}
	});
var Timer = Throwback.Timer = Base.extend();
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
		}
	});
var Node = Throwback.Node = Base.extend();
var Entity = Throwback.Entity = Node.extend();
var Group = Throwback.Group = Node.extend();
var Layer = Throwback.Layer = Node.extend();
var Scene = Throwback.Scene = Node.extend();
var Stage = Throwback.Stage = Node.extend();
var Animation = Throwback.Animation = Base.extend();
var Sprite = Throwback.Sprite = Base.extend();
var Audio = Throwback.Audio = Base.extend();
var Music = Throwback.Music = Audio.extend();
var Sound = Throwback.Sound = Audio.extend();
if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Throwback;
    } else {
        this.Throwback = Throwback;
    }
}).call(this, this.jQuery);