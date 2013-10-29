/* globals describe, it, expect, jasmine, Throwback, runs, waits */
describe('Game', function(){
	describe('constructor', function(){
		it('generates a new stage object', function(){
			var game = new Throwback.Game();
			expect(game.stage).toBeDefined();
			expect(game.stage).toEqual(jasmine.any(Throwback.Stage));
		});
		it('can accept an injected stage', function(){
			var CustomStage = Throwback.Stage.extend(),
				game = new Throwback.Game({ stage : new CustomStage() });

			expect(game.stage).toEqual(jasmine.any(CustomStage));
		});
	});

	it('has a setup function that is called when the game is initialized', function(){
		var game = new Throwback.Game();
		var worked = false;
		game.setup(function(){
			worked = true;
		});
		game.start();
		expect(worked).toBe(true);
	});

	it('allows you to define an update method that gets callled every frame', function(){
		var game = new Throwback.Game();
		var worked = false;

		game.tick(function(){
			worked = true;
		});

		runs(function(){
			game.start();
		});
		waits(100);
		runs(function(){
			expect(worked).toBe(true);
		});
	});
});