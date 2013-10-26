/* globals _stagedNodes */
var _render = function(delta){
	var length = _stagedNodes.length;
	var i, position, transform, node, style;

	for(i = 0; i < length; i++){
		node = _stagedNodes[i];
		position = node.updatePosition();
		transform = 'translate3d(' + position[0] + 'px,' + position[1] + 'px, 0)';

		style = node.el.style;
		style["-webkit-transform"] = transform;
		style.transform = transform;
	}
};