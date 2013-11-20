	/* globals Throwback, Base, Node:true, numeric */

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
			this.matrix = identityMatrix();
			this.position = [0, 0, 0, 1];
			this.dirty = false;
			Throwback.jQuery(el).css({ position:'absolute', top : 0, left : 0 });
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
			var $ = Throwback.jQuery;
			var i, length, children;

			options = $.extend({}, { children : false, onlyChildren : false }, options);
			if (options.children || options.onlyChildren){
				children = this.children;
				length = children.length;
				for(i = 0; i < length; i++) {
					children[i].css(styles, { children : true });
				}
			}
			if(!options.onlyChildren){
				$(this.el).css(styles);
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

			this.matrix = matrix = numeric.dot(this.matrix, translationMatrix(x, y, z));

			children = this.children;
			length = children.length;
			for(i = 0; i < length; i++) {
				children[i].move(x, y, z);
			}

			return matrix;
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
			this.matrix = numeric.dot(this.matrix, rotationMatrix(degree));
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
			this.matrix = matrix = numeric.dot(this.matrix, scaleMatrix(s));

			children = this.children;
			length = children.length;
			for(i = 0; i < length; i++) {
				children[i].scale(s);
			}

			return matrix;
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