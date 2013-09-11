/**
 * throwback v0.0.1 - 2013-09-11
 * Retro Game Rendering Engine
 *
 * Copyright (c) 2013 Stephen Young <steve@rockgolem.com>
 * Licensed MIT
 */
;(function(jQuery, undefined){
    "use strict";
var Throwback = {};

	/**
	 * A Collection of useful utility methods.
	 */
	Throwback.Util = {
		uuid : function(){
			return (Math.PI * Math.max(0.01, Math.random())).toString(36).substr(2);
		}
	};
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
		}
	});
var Node = Throwback.Node = Base.extend();
var Entity = Throwback.Entity = Node.extend();
var Group = Throwback.Group = Node.extend();
var Layer = Throwback.Layer = Node.extend();
var Scene = Throwback.Scene = Node.extend();
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
var Animation = Throwback.Animation = Base.extend({

		/**
		 * Wraps a sprite
		 *
		 * @param Throwback.Sprite sprite
		 * @return void
		 */
		constructor : function(sprite){
			var anim = this;
			this.sprite = sprite;
			sprite.async.done(function(){
				anim.sequence([0]);
			});
		},

		/**
		 * Returns the frame count of the animation
		 *
		 * @return Number
		 */
		getFrameCount : function(){
			var frames = this.frames;
			return frames ? frames.length : this.sprite.getFrameCount();
		},

		/**
		 * Limits the animation to certain frames
		 *
		 * @param Array frames
		 * @return void
		 */
		sequence : function(frames){
			if (this.sprite.verifyFrames(frames)){
				this.frames = frames;
			} else {
				throw new Error('frames out of bounds');
			}
		}
	});
var imageCache, makeImage, guessSize;

	imageCache = {};

	/**
	 * Sprite object is a wrapper for an image.
	 */
	var Sprite = Throwback.Sprite = Base.extend({

		/**
		 * @param String|Object param
		 * @return void
		 */
		constructor : function(param){
			this.async = new Throwback.jQuery.Deferred();
			this.options = {};
			if (typeof param === 'string') {
				this.setImage(param);
			} else {
				this.config(param);
			}
		},

		/**
		 * Store configuration data about the Sprite
		 *
		 * @param Object options
		 * @return void
		 */
		config : function(options){
			Throwback.jQuery.extend(this.options, options);
			if (options.img){
				this.setImage(options.img);
			}
		},

		/**
		 * Returns a config option by key
		 * @param String key
		 * @return Mixed
		 */
		get : function(key){
			return this.options[key];
		},

		getFrameCount : function(){
			var width, height, frameWidth, frameHeight;

			width = this.get('width') || 0;
			height = this.get('height') || 0;
			frameWidth = this.get('frameWidth') || 1;
			frameHeight = this.get('frameHeight') || 1;

			return Math.floor(width / frameWidth) * Math.floor(height / frameHeight);
		},

		/**
		 * @param String filename
		 * @return void
		 */
		setImage : function(filename){
			var image;

			image = imageCache[filename];
			if (image){
				this.image = image;
				this.async.resolve();
			} else {
				this.image = (imageCache[filename] = makeImage(filename, this.async));
			}
			guessSize.call(this);
		},

		verifyFrames : function(frames){
			var min, max;
			min = Math.min.apply(Math, frames);
			max = Math.max.apply(Math, frames);
			return min >= 0 && max <= this.getFrameCount() - 1;
		}
	});

	/**
	 * Attempts to set the width/height, if they have not already been set.
	 *
	 * @return void
	 */
	guessSize = function(){
		var sprite = this,
			image = this.image;

		if (image){
			this.async.done(function(){
				var el, width, height;

				el = Throwback.jQuery(image);
				width = sprite.get('width') || el.width();
				height = sprite.get('height') || el.height();
				sprite.config({
					width : width,
					height : height,
					frameWidth : sprite.get('frameWidth') || width || 1,
					frameHeight : sprite.get('frameHeight') || height || 1
				});
			});
		}
	};

	/**
	 * Creates a new image object, and sets the src to filename.
	 *
	 * @param String filename
	 * @param jQuery.Defered async
	 * @return Image
	 */
	makeImage = function(filename, async){
		var img = new Image();
		img.src = filename;
		// TODO: Fix error state.  onError isn't right.  Tests failing
		img.onLoad = img.onError = function(){ async.resolve(); };
		return img;
	};
var Audio = Throwback.Audio = Base.extend();
var Music = Throwback.Music = Audio.extend();
var Sound = Throwback.Sound = Audio.extend();
if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Throwback;
    } else {
        this.Throwback = Throwback;
    }
}).call(this, this.jQuery);