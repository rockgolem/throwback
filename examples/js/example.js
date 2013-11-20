/* globals Throwback, jQuery */
(function($, undefined){
	$(function(){
		var game = new Throwback.Game();

		/**
		 * Sprite Animation Example
		 */
		var PlayerSprite = new Throwback.Sprite({
			img : '/img/steampunk_f10.png',
			width : 128,
			height : 192,
			frameWidth : 32,
			frameHeight : 48
		});
		var PlayerAnimation = new Throwback.Animation(PlayerSprite);
		var player = new Throwback.Entity({
			animations : { walking : PlayerAnimation }
		});

		PlayerAnimation.sequence([0, 1, 2, 3], 4);
		player.move(100, 100);
		game.stage.addChild(player);


		/**
		 * Child Moving Example
		 */
		var parent = new Throwback.Entity();
		var child = new Throwback.Entity();
		var parentDirection = 0, childDirection = 0, step = 0;

		parent.move(200, 200);
		child.move(210, 210);
		parent.css({
			width : 50,
			height : 50,
			background : 'black'
		});
		child.css({
			width : 10,
			height : 10,
			background : 'red'
		});
		parent.addChild(child);
		game.stage.addChild(parent);

		game.tick(function(){
			switch(parentDirection) {
				case 0: parent.move(1, 0); break;
				case 1: parent.move(0, 1); break;
				case 2: parent.move(-1, 0); break;
				case 3: parent.move(0, -1); break;
			}

			switch(childDirection) {
				case 0: child.move(1, 0); break;
				case 1: child.move(0, 1); break;
				case 2: child.move(-1, 0); break;
				case 3: child.move(0, -1); break;
			}
			child.rotate(-0.1);

			if (step === 50){
				parentDirection = parentDirection === 3 ? 0 : parentDirection + 1;
				childDirection = childDirection === 3 ? 0 : childDirection + 1;
				step = 0;
			} else {
				step++;
			}
		});
		game.start();
	});
}(jQuery));