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

	it('will render if the animation updates', function(){
		var animation = new Throwback.Animation(sprite);
		var entity = new Throwback.Entity({
			animations : { walking : animation }
		});
		animation.sequence([0,1,2]);
		spyOn(animation, 'update').andReturn(true);
		spyOn(entity, 'render');
		entity.animate(10);
		expect(entity.render).toHaveBeenCalled();
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

	it('renders to the current animation image', function(){
		var entity = new Throwback.Entity({
			animations : { walking : animation }
		});

		spyOn(entity, 'css');
		entity.render();
		expect(entity.css).toHaveBeenCalled();
		expect(entity.el.style.backgroundImage).toMatch(/url\("?.+someImage.jpg"?\)/);
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
});