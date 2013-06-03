/* globals describe, it, expect, jasmine, Throwback */
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
});