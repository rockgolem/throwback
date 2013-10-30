/* globals describe, it, expect, jasmine, Throwback, waitsFor, runs */
describe('Animation', function(){
	it('wraps a sprite', function(){
		var sprite = new Throwback.Sprite('someImage.jpg');
		var anim = new Throwback.Animation(sprite);
		expect(anim.sprite).toBeDefined();
		expect(anim.sprite).toEqual(jasmine.any(Throwback.Sprite));
	});
	it('derives info from the sprite, defaulting to frame count of 1', function(){
		var sprite, anim;

		sprite = new Throwback.Sprite({
			img : 'someImage.jpg',
			width : 200,
			height : 100,
			frameWidth : 20,
			frameHeight : 20
		});
		anim = new Throwback.Animation(sprite);
		waitsFor(function(){
			return sprite.async.state() === 'resolved';
		}, 'The image should load or error, resolving the async property.', 750);
		runs(function(){
			expect(anim.getFrameCount()).toBe(1);
		});
	});

	it('can define a sequence from a subset of all of the sprite frames', function(){
		var sprite = new Throwback.Sprite({
			img : 'someImage.jpg',
			width : 200,
			height : 100,
			frameWidth : 20,
			frameHeight : 20
		});
		var anim = new Throwback.Animation(sprite);

		anim.sequence([4, 5, 6, 7]);
		expect(anim.getFrameCount()).toBe(4);
	});

	it('explodes if a sequence is out of bounds', function(){
		var outOfBounds = false;
		var sprite = new Throwback.Sprite({
			img : 'someImage.jpg',
			width : 200,
			height : 100,
			frameWidth : 20,
			frameHeight : 20
		});
		var anim = new Throwback.Animation(sprite);
		try {
			anim.sequence([49, 50, 51]);
		} catch(e){
			outOfBounds = true;
		}
		expect(outOfBounds).toBe(true);
	});

	it('can define frames per second', function(){
		var sprite = new Throwback.Sprite({
			img : 'someImage.jpg',
			width : 200,
			height : 100,
			frameWidth : 20,
			frameHeight : 20
		});
		var anim = new Throwback.Animation(sprite);
		anim.sequence([4, 5, 6, 7], 20); // 20 fps
		expect(anim.fps).toBe(20);
	});

	it('can be turned on or off', function(){
		var sprite = new Throwback.Sprite({
			img : 'someImage.jpg',
			width : 200,
			height : 100,
			frameWidth : 20,
			frameHeight : 20
		});
		var anim = new Throwback.Animation(sprite);
		expect(anim.on).toBe(false);

		anim.start();
		expect(anim.on).toBe(true);

		anim.stop();
		expect(anim.on).toBe(false);
	});

	it('can advance the internal frame pointer', function(){
		var sprite = new Throwback.Sprite({
			img : 'someImage.jpg',
			width : 200,
			height : 100,
			frameWidth : 20,
			frameHeight : 20
		});
		var anim = new Throwback.Animation(sprite);

		anim.sequence([1, 2, 3, 5]);
		expect(anim.currentFrame).toBe(0);
		anim.step();
		expect(anim.currentFrame).toBe(1);
		anim.step();
		anim.step();
		expect(anim.currentFrame).toBe(3);
		anim.step();
		expect(anim.currentFrame).toBe(0);
	});

	it('producces a background-position for CSS when converted to a string', function(){
		var sprite = new Throwback.Sprite({
			img : 'someImage.jpg',
			width : 200,
			height : 100,
			frameWidth : 20,
			frameHeight : 20
		});
		var anim = new Throwback.Animation(sprite);

		anim.sequence([4, 9, 10, 15]);

		expect(anim.toString()).toMatch(/\-80px\s0px/);
		anim.step();
		expect(anim.toString()).toMatch(/\-180px\s0px/);
		anim.step();
		expect(anim.toString()).toMatch(/0px\s\-20px/);
		anim.step();
		expect(anim.toString()).toMatch(/\-100px\s\-20px/);
		anim.step();
		expect(anim.toString()).toMatch(/\-80px\s0px/);
	});

	it('producces a backgroundImage url for CSS', function(){
		var sprite = new Throwback.Sprite({
			img : 'someImage.jpg',
			width : 200,
			height : 100,
			frameWidth : 20,
			frameHeight : 20
		});
		var anim = new Throwback.Animation(sprite);

		anim.sequence([4, 9, 10, 15]);

		expect(anim.getBackgroundImage()).toMatch(/url\(".+someImage.jpg"\)/);
	});
});