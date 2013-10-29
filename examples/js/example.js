/* globals Throwback, jQuery */
(function($, undefined){
	$(function(){
		var game = new Throwback.Game();
		var player = new Throwback.Entity();
		game.setup(function(){
			var PlayerSprite = new Throwback.Sprite('/img/steampunk_f10.png');
			var PlayerAnimation = new Throwback.Animation(PlayerSprite);

			game.stage.addChild(player);
			$(player.el).css({
				width: 10,
				height : 10,
				background : '#000'
			});
		});
		game.tick(function(){
			player.rotate(0.01);
			player.scale(1.01);
			player.move(0.5, 0.5);
		});
		game.start();
	});
}(jQuery));