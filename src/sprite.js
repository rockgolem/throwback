	/* globals Throwback, Base */
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
		img.onLoad = img.onError = function(){ async.resolve(); };
		return img;
	};