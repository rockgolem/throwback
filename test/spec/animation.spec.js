/* globals describe, it, expect, jasmine, Throwback */
describe('Animation', function(){
	it('wraps a sprite', function(){
		var sprite = new Throwback.Sprite('someImage.jpg');
		var anim = new Throwback.Animation(sprite);
		expect(anim.sprite).toBeDefined();
		expect(anim.sprite).toEqual(jasmine.any(Throwback.Sprite));
	});
	it('derives info from the sprite', function(){
		var sprite = new Throwback.Sprite({
			img : 'someImage.jpg',
			width : 200,
			height : 100,
			frameWidth : 20,
			frameHeight : 20
		});
		var anim = new Throwback.Animation(sprite);

		expect(anim.getFrameCount()).toBe(50);
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
});