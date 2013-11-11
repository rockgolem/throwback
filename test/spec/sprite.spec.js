/* globals describe, it, expect, jasmine, Throwback */
describe('Sprite', function(){
	describe('constructor', function(){
		it('takes an image path string and creates an image representation', function(){
			var sprite = new Throwback.Sprite('/someImage.jpg');
			expect(sprite.image).toBeDefined();
			expect(sprite.image.toString()).toBe('[object HTMLImageElement]');
		});

		it('can also take a configuration object', function(){
			var sprite = new Throwback.Sprite({
				img : 'someImage.jpg',
				width : 200,
				height : 100,
				frameWidth : 20,
				frameHeight : 20
			});
			expect(sprite.image).toBeDefined();
			expect(sprite.image.toString()).toBe('[object HTMLImageElement]');
			expect(sprite.get('width')).toBe(200);
		});
	});
	it('can determine a total frame count', function(){
		var sprite = new Throwback.Sprite({
			img : 'someImage.jpg',
			width : 200,
			height : 100,
			frameWidth : 20,
			frameHeight : 20
		});
		expect(sprite.getFrameCount()).toBe(50);
	});

	it('defaults to a frame size of 100% if one is not set', function(){
		var sprite = new Throwback.Sprite({
			width : 200,
			height : 100
		});
		expect(sprite.get('frameHeight')).toBe(100);
		expect(sprite.get('frameWidth')).toBe(200);
	});

	it('has a minimum frame size of 1px', function(){
		var sprite = new Throwback.Sprite({
			width : 200,
			height : 100,
			frameWidth : 0,
			frameHeight : 0.5
		});
		expect(sprite.get('frameHeight')).toBe(1);
		expect(sprite.get('frameWidth')).toBe(1);
	});

	it('can identify if a set of frames is valid', function(){
		var sprite = new Throwback.Sprite({
			img : 'someImage.jpg',
			width : 200,
			height : 100,
			frameWidth : 20,
			frameHeight : 20
		});
		expect(sprite.verifyFrames([0, 1, 2])).toBe(true);
		expect(sprite.verifyFrames([48, 49, 50])).toBe(false);

		sprite = new Throwback.Sprite('someImage.jpg');
		expect(sprite.verifyFrames([0])).toBe(true);
	});

	it('Throws an error if the image load fails', function(){
		var sprite = new Throwback.Sprite({ width : 10, height : 10 });

		sprite.config({ img : 'bogus.jpg' });
		expect(sprite.image.onError).toThrow('Could not load image: bogus.jpg');
	});
});