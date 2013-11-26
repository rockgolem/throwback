/* globals _stagedNodes, _stageElement */
var _render = function(delta, now){
	var length = _stagedNodes.length;
	var i, transform, node, style, matrix;

	for(i = 0; i < length; i++){
		node = _stagedNodes[i];

		if (node.dirty){
			node.dirty = false;
			matrix = node.matrix;

			transform  = 'matrix3d(' +
				matrix[0].join(',') + ',' +
				matrix[1].join(',') + ','  +
				matrix[2].join(',') + ','  +
				matrix[3].join(',') +  ')';

			style = node.el.style;
			style.webkitTransform = style.transform = transform;
		}

		// process animations
		if (node.animate){
			node.animate(now);
		}
	}
};