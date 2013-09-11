	/* globals Throwback, Base */
	var imageCache, makeImage;

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
			this.options = {};
			if (typeof param === 'string') {
				this.setImage(param);
			} else {
				this.config(param);
			}
		},

		/**
		 * Store configuration data about the Sprite
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

		/**
		 * @param String filename
		 * @return void
		 */
		setImage : function(filename){
			this.image = imageCache[filename] || (imageCache[filename] = makeImage(filename));
		}
	});

	/**
	 * Creates a new image object, and sets the src to filename.
	 *
	 * @param String filename
	 * @return Image
	 */
	makeImage = function(filename){
		var img = new Image();
		img.src = filename;
		img.onLoad = function(){};
		return img;
	};