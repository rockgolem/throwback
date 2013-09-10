	/* globals Throwback, Base */
	var imageCache, makeImage;

	imageCache = {};

	/**
	 * Sprite object is a wrapper for an image.
	 */
	var Sprite = Throwback.Sprite = Base.extend({

		/**
		 * @param String filename
		 * @return void
		 */
		constructor : function(filename){
			this.setImage(filename);
		},

		/**
		 * @param {[type]} filename [description]
		 * @return {[type]}
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