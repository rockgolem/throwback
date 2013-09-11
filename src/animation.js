	/* globals Throwback, Base */
	var Animation = Throwback.Animation = Base.extend({

		/**
		 * Wraps a sprite
		 *
		 * @param Throwback.Sprite sprite
		 * @return void
		 */
		constructor : function(sprite){
			this.sprite = sprite;
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
			this.frames = frames;
		}
	});