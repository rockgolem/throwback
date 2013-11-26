/* globals describe, it, expect, jasmine, Throwback, spyOn */
describe('Entity', function(){
	var sprite = new Throwback.Sprite({
		img : 'someImage.jpg',
		width : 200,
		height : 100,
		frameWidth : 20,
		frameHeight : 20
	});
	var animation = new Throwback.Animation(sprite);
	animation.sequence([1, 2, 3, 4]);

	describe('Static', function(){
		it('can take a sprite', function(){
			var entity = new Throwback.Entity({ sprite : sprite });

			expect(entity.sprite).toBe(sprite);
		});
		it('will style the element based on sprite info', function(){
			var entity = new Throwback.Entity({ sprite : sprite });
			var secondSprite = new Throwback.Sprite({
				img : 'anotherImage.jpg',
				width : 10,
				height : 20
			});

			expect(entity.el.style.width).toBe(sprite.get('frameWidth') + 'px');
			expect(entity.el.style.height).toBe(sprite.get('frameHeight') + 'px');
			expect(entity.el.style.backgroundImage).toBe('url(' + sprite.image.src + ')');

			entity.styleFromSprite(secondSprite);

			expect(entity.el.style.width).toBe(secondSprite.get('frameWidth') + 'px');
			expect(entity.el.style.height).toBe(secondSprite.get('frameHeight') + 'px');
			expect(entity.el.style.backgroundImage).toBe('url(' + secondSprite.image.src + ')');
		});
	});
	describe('Animated', function(){
		it('can have animation objects', function(){
			var entity = new Throwback.Entity({
				animations : { walking : animation }
			});

			expect(entity.animations.walking).toEqual(jasmine.any(Throwback.Animation));
		});

		it('contains an empty animations object if one is not passed in', function(){
			var entity = new Throwback.Entity();

			expect(entity.animations).toEqual(jasmine.any(Object));
		});

		it('sets a default animation, and a current animation', function(){
			var entity = new Throwback.Entity({
				animations : { walking : animation },
				defaultAnimation : 'walking'
			});

			expect(entity.currentAnimation).toBe(animation);
		});

		it('will set a default animation named defaultAnimation', function(){
			var entity = new Throwback.Entity({
				animations : { defaultAnimation : animation }
			});

			expect(entity.currentAnimation).toBe(animation);
		});

		it('will set a default animation if one is not specified', function(){
			var entity = new Throwback.Entity({
				animations : { walking : animation }
			});

			expect(entity.currentAnimation).toBe(animation);
		});

		it("can make it's animation update", function(){
			var animation = new Throwback.Animation(sprite);
			var entity = new Throwback.Entity({
				animations : { walking : animation }
			});
			animation.sequence([0,1,2]);
			spyOn(animation, 'update');
			entity.animate(10);
			expect(animation.update).toHaveBeenCalledWith(10);
		});

		it('will not do anything if the animation is not active', function(){
			var animation = new Throwback.Animation(sprite);
			var entity = new Throwback.Entity({
				animations : { walking : animation }
			});
			animation.sequence([0,1,2]);
			spyOn(animation, 'update');
			animation.stop();
			entity.animate(10);
			expect(animation.update).not.toHaveBeenCalled();
		});

		it('will stop the current animation if a new one is selected', function(){
			var standing = new Throwback.Animation(sprite);
			var entity = new Throwback.Entity({
				animations : { walking : animation, standing : standing },
				defaultAnimation : 'standing'
			});

			spyOn(standing, 'stop');
			entity.setAnimation('walking');
			expect(standing.stop).toHaveBeenCalled();
		});

		it('will style the width/height when an animation exists', function(){

			var entity = new Throwback.Entity({
				animations : { walking : animation }
			});
			expect(entity.el.style.width).toBe(sprite.get('frameWidth') + 'px');
			expect(entity.el.style.height).toBe(sprite.get('frameHeight') + 'px');
		});
	});
});