	/* globals Throwback, $:true */

	/**
	 * Throwback likes to be in control of jQuery.
	 */
	if (this.$ && this.jQuery === this.$){
		this.$.noConflict();
		var $ = this.jQuery;
	}