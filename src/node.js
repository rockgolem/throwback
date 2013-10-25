	/* globals Throwback, Base, Node:true, numeric */

	var translationMatrix, identityMatrix;

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
			var el;
			this.el = el = document.createElement('div');
			this.parent = null;
			this.children = [];
			this.matrix = identityMatrix();
			this.position = [0, 0, 1];
			Throwback.jQuery(el).css({ position:'absolute', top : 0, left : 0 });
		},
		move : function(x, y){
			this.position = numeric.dot(translationMatrix(x, y), this.position);
		}
	});

	identityMatrix = function(){
		return [
			[1,0,0],
			[0,1,0],
			[0,0,1]
		];
	};

	translationMatrix = function(x, y){
		return [
			[1,0,x],
			[0,1,y],
			[0,0,1]
		];
	};