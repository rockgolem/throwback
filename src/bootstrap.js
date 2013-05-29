	/* globals Throwback */

	/**
	 * Throwback likes to be in control of jQuery.
	 */
	if (window && window.$ && window.jQuery === window.$){
		window.$.noConflict();
		Throwback.$ = window.jQuery;
	}