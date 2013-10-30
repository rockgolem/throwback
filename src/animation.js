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
			this.on = false;
			this.dirty = false;
			this.currentFrame = 0;
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
		 * Return string for backgroundImage
		 * @return {[type]}
		 */
		getBackgroundImage : function(){
			return 'url("' + this.sprite.image.src + '") ';
		},

		/**
		 * Limits the animation to certain frames, with a frames-per-second value
		 *
		 * @param Array frames
		 * @param Number fps
		 * @return void
		 */
		sequence : function(frames, fps){
			if (this.sprite.verifyFrames(frames)){
				this.frames = frames;
				this.fps = fps || 15;
				this.frameTime = 1000 / this.fps;
			} else {
				throw new Error('frames out of bounds');
			}
		},

		/**
		 * Turns the animation on
		 *
		 * @return void
		 */
		start : function(){
			this.previousFrameTime = (new Date()).getTime();
			this.on = true;
		},

		/**
		 * Advance the current frame
		 *
		 * @return void
		 */
		step : function(){
			var current = this.currentFrame;
			this.currentFrame = current === this.frames.length -1 ? 0 : current + 1;
			this.dirty = true;
		},

		/**
		 * Turns the animation off
		 *
		 * @return void
		 */
		stop : function(){
			this.dirty = this.on = false;
		},

		/**
		 * Returns a CSS value for `background-position`
		 *
		 * @param void
		 * @return String
		 */
		toString : function(){
			var frame = this.frames[this.currentFrame];
			var sprite = this.sprite;
			var params = sprite.options;
			var width = params.width;
			var frameWidth = params.frameWidth;
			var frameHeight = params.frameHeight;
			var x = 0;
			var y = 0;
			var linear = frame * frameWidth;

			while(linear >= width) {
				linear -= width;
				y += frameHeight;
			}
			x = -linear;
			y = -y;
			return x.toString() + 'px ' + y.toString() + 'px';
		},

		/**
		 * Compares the time against the previous time
		 * and advances the frame if needed.
		 *
		 * @param Number now
		 * @return void
		 */
		update : function(now){
			var interval = now - this.previousFrameTime;
			var frameTime = this.frameTime;
			var dirty;
			while(interval >= frameTime) {
				this.step();
				interval -= frameTime;
			}
			dirty = this.dirty;
			if (dirty){
				this.previousFrameTime = now;
			}
			return dirty;
		}
	});