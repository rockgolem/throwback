	/* globals Throwback, Base */

	/**
	 * Discourage global use of jQuery
	 */
	if (jQuery){
		Throwback.jQuery = jQuery.noConflict();
	}