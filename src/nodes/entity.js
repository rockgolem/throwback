	/* globals Throwback, Node:true */
	var Entity = Throwback.Entity = Node.extend({

		/**
		 * Process entity animation
		 *
		 * @param Number now
		 * @return void
		 */
		animate : function(now){
			var animation = this.currentAnimation;
			if (animation && animation.on){
				if(animation.update(now)) {
					this.render();
				}
			}
		},

		constructor : function(config){
			var options = Throwback.jQuery.extend({}, config);

			Node.call(this);
			this.animations = options.animations || {};
			this.defaultAnimation = options.defaultAnimation;
			this.setAnimation();
		},

		/**
		 * Set the background image
		 *
		 * @return void
		 */
		render : function(){
			this.css({
				backgroundPosition : this.currentAnimation.toString()
			});
		},

		/**
		 * Sets the animation to one specified, or back to the default if not specified.
		 *
		 * @param String name
		 * @return void
		 */
		setAnimation : function(name){
			var current = this.currentAnimation;
			if (current){
				current.stop();
			}
			this.currentAnimation = current = this.animations[name || this.defaultAnimation];
			if (current){
				current.start();
				this.css({ backgroundImage : current.getBackgroundImage() });
			}
		}
	});