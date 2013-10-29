	/* globals Throwback, Node:true */
	var Entity = Throwback.Entity = Node.extend({
		constructor : function(config){
			var options = Throwback.jQuery.extend({}, config);

			Node.call(this);
			this.animation = options.animation;
		}
	});