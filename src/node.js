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

		/**
		 * Updates the internal matrix, but does not apply it to the position vector.
		 *
		 * @param Number x units of movement relative to the current position
		 * @param Number y units of movement relative to the current position
		 * @return Array
		 */
		move : function(x, y){
			return this.matrix = numeric.dot(this.matrix, translationMatrix(x, y));
		},

		/**
		 * Applies the internal matrix to the position vector
		 *
		 * @param void
		 * @return Array
		 */
		updatePosition : function(){
			var position = this.position = numeric.dot(this.matrix, this.position);

			this.matrix = identityMatrix();
			return position;
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