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

	it('can have animation objects', function(){
		var entity = new Throwback.Entity({
			animations : {
				walking : animation
			}
		});

		expect(entity.animations.walking).toEqual(jasmine.any(Throwback.Animation));
	});

	it('sets a default animation, and a current animation', function(){
		var entity = new Throwback.Entity({
			animations : {
				walking : animation
			},
			defaultAnimation : 'walking'
		});

		expect(entity.currentAnimation).toBe(animation);
	});
});