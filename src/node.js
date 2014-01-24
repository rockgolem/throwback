	/* globals Throwback, Base, Node:true, numeric */

	/**
	 * Object used in Node.prototype.css method.  Extracted for memory performance.
	 *
	 * @type Object
	 */
	var includeChildren = { children : true };

	var defaultNodeStyle = { position:'absolute', top : 0, left : 0 };

	var Node = Throwback.Node = Base.extend({

		/**
		 * Adds another node as a child
		 *
		 * @param Node node
		 */
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

		/**
		 * @constructor
		 */
		constructor : function(){
			var el;
			this.el = el = document.createElement('div');
			this.parent = null;
			this.children = [];
			this.matrix = identityMatrix.slice();
			this.position = identityMatrix[3].slice();
			this.dirty = false;
			Throwback.jQuery(el).css(defaultNodeStyle);
		},

		/**
		 * jQuery.css proxy
		 *
		 * Can style child nodes via the options object
		 *
		 * @param Object styles
		 * @param Object options { children : Boolean, onlyChildren : Boolean }
		 * @return void
		 */
		css : function(styles, options){
			var i, length, children;

			if (options && (options.children || options.onlyChildren)){
				children = this.children;
				length = children.length;
				for(i = 0; i < length; i++) {
					children[i].css(styles, includeChildren);
				}
			}
			if(!options || !options.onlyChildren){
				Throwback.jQuery(this.el).css(styles);
			}
		},

		/**
		 * Move (translate) the node
		 *
		 * @param Number x units of movement relative to the current position
		 * @param Number y units of movement relative to the current position
		 * @return Array
		 */
		move : function(x, y, z){
			var children, i, length, matrix;

			this.matrix = matrix = numeric.dotMMsmall(this.matrix, translationMatrix(x, y, z));

			children = this.children;
			length = children.length;
			for(i = 0; i < length; i++) {
				children[i].move(x, y, z);
			}
			this.dirty = true;
			return matrix;
		},

		/**
		 * Move (translate) the node over time
		 *
		 * @param Number x units of movement relative to the current position
		 * @param Number y units of movement relative to the current position
		 * @param Number time in milliseconds
		 * @return Array
		 */
		moveTo : function(x, y, time){

		},

		/**
		 * Rotate the node
		 *
		 * @param Number s
		 * @return void
		 */
		rotate : function(degree){
			var current = this.matrix[3];

			this.move(-current[0], -current[1], -current[2]);
			this.matrix = numeric.dotMMsmall(this.matrix, rotationMatrix(degree));
			return this.move.apply(this, current);
		},

		/**
		 * Scales the node up or down
		 *
		 * @param Number s
		 * @return void
		 */
		scale : function(s){
			var children, i, length, matrix;
			this.matrix = matrix = numeric.dotMMsmall(this.matrix, scaleMatrix(s));

			children = this.children;
			length = children.length;
			for(i = 0; i < length; i++) {
				children[i].scale(s);
			}
			this.dirty = true;
			return matrix;
		}
	});

	var identityMatrix = [
		[1,0,0,0],
		[0,1,0,0],
		[0,0,1,0],
		[0,0,0,1]
	];

	var rotationMatrix = function(degree){
		var cos = Math.cos;
		var sin = Math.sin;
		return [
			[cos(degree),sin(-degree),0,0],
			[sin(degree),cos(degree),0,0],
			identityMatrix[2],
			identityMatrix[3]
		];
	};

	var scaleMatrix = function(s){
		return [
			[s,0,0,0],
			[0,s,0,0],
			[0,0,s,0],
			identityMatrix[3]
		];
	};

	var translationMatrix = function(x, y, z){
		z = z || 0;
		return [
			identityMatrix[0],
			identityMatrix[1],
			identityMatrix[2],
			[x,y,z,1]
		];
	};