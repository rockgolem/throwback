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
			var animations = options.animations;
			var sprite = options.sprite;

			Node.call(this);

			this.sprite = sprite;
			if (sprite){
				this.styleFromSprite();
			}

			this.animations = animations || {};
			if (animations){
				this.setDefaultAnimation(options.defaultAnimation);
				this.setAnimation();
			}
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
			var sprite;
			if (current){
				current.stop();
			}
			this.currentAnimation = current = this.animations[name || this.defaultAnimation];
			if (current){
				current.start();
				sprite = current.sprite;
				this.css({
					width : sprite.get('frameWidth'),
					height : sprite.get('frameHeight'),
					backgroundImage : current.getBackgroundImage()
				});
			}
		},

		/**
		 * Sets the default animation if specified, or tries to derrive it.
		 *
		 * @param String name
		 */
		setDefaultAnimation : function(name){
			var animations, defaultSet;

			animations = this.animations;
			if (name){
				this.defaultAnimation = name;
			} else {
				defaultSet = animations.defaultAnimation ? 'defaultAnimation' : false;
				this.defaultAnimation = defaultSet || Object.keys(animations)[0];
			}
		},

		/**
		 * Styles the node based on the provided sprite, or the current sprite
		 *
		 * @param Sprite spriteParam
		 * @return void
		 */
		styleFromSprite : function(spriteParam){
			var sprite = spriteParam || this.sprite;

			if (sprite){
				this.css({
					height : sprite.get('frameHeight'),
					width : sprite.get('frameWidth'),
					backgroundImage : 'url("' + sprite.image.src + '")',
				});
			}
		}
	});