	/* globals Throwback, Base, Node:true */
	var Node = Throwback.Node = Base.extend({
		addChild : function(node){
			var stage;

			node.parent = this;
			this.children.push(node);

			// handle retroactive stage attachment
			stage = this.stage;
			if(stage) {
				stage.attach(node);
			}
		},
		constructor : function(){
			this.el = document.createElement('div');
			this.parent = null;
			this.children = [];
			this.matrix = [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 1]
			];
		}
	});