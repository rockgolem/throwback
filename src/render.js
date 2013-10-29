/* globals _stagedNodes */
var _render = function(delta){
	var length = _stagedNodes.length;
	var i, k, position, transform, node, style, matrix;

	for(i = 0; i < length; i++){
		node = _stagedNodes[i];

		matrix = node.matrix;

		transform  = 'matrix3d(';
		transform += [
			matrix[0].join(','),
			matrix[1].join(','),
			matrix[2].join(','),
			matrix[3].join(',')
		].join(',');
		transform += ')';

		style = node.el.style;
		style["-webkit-transform"] = transform;
		style.transform = transform;
	}
};