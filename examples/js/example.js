/* globals Throwback */
(function($, undefined){
	$(function(){
		var game = new Throwback.Game();
		game.setup(function(){
			var PlayerSprite = new Throwback.Sprite('/img/steampunk_f10.png');
			var PlayerAnimation = new Throwback.Animation(PlayerSprite);

		});
	});
}(jQuery));