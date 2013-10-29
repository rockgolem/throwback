	/* globals Throwback, Base, Node:true, numeric */

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
			this.position = [0, 0, 0, 1];
			Throwback.jQuery(el).css({ position:'absolute', top : 0, left : 0 });
		},

		/**
		 * Move (translate) the node
		 *
		 * @param Number x units of movement relative to the current position
		 * @param Number y units of movement relative to the current position
		 * @return Array
		 */
		move : function(x, y, z){
			return this.matrix = numeric.dot(this.matrix, translationMatrix(x, y, z));
		},

		/**
		 * Rotate the node
		 *
		 * @param Number s
		 * @return void
		 */
		rotate : function(degree){
			return this.matrix = numeric.dot(this.matrix, rotationMatrix(degree));
		},

		/**
		 * Scales the node up or down
		 *
		 * @param Number s
		 * @return void
		 */
		scale : function(s){
			return this.matrix = numeric.dot(this.matrix, scaleMatrix(s));
		}
	});

	var identityMatrix = function(){
		return [
			[1,0,0,0],
			[0,1,0,0],
			[0,0,1,0],
			[0,0,0,1]
		];
	};

	var rotationMatrix = function(degree){
		var cos = Math.cos;
		var sin = Math.sin;
		return [
			[cos(degree),sin(-degree),0,0],
			[sin(degree),cos(degree),0,0],
			[0,0,1,0],
			[0,0,0,1]
		];
	};

	var scaleMatrix = function(s){
		return [
			[s,0,0,0],
			[0,s,0,0],
			[0,0,s,0],
			[0,0,0,1]
		];
	};

	var translationMatrix = function(x, y, z){
		z = z || 0;
		return [
			[1,0,0,0],
			[0,1,0,0],
			[0,0,1,0],
			[x,y,z,1]
		];
	};