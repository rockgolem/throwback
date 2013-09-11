	/* globals Throwback, Base */
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