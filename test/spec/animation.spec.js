/* globals describe, it, expect, jasmine, Throwback */
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
});