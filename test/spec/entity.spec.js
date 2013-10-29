/* globals describe, it, expect, jasmine, Throwback */
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

	it('can wrap an animation object', function(){
		var entity = new Throwback.Entity({ animation : animation });

		expect(entity.animation).toEqual(jasmine.any(Throwback.Animation));
	});
});