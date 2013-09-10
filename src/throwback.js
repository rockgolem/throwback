	/**
	 * Throwback Namespace
	 */
	var Throwback = {};

	/**
	 * A Collection of useful utility methods.
	 */
	Throwback.Util = {
		uuid : function(){
			return (Math.PI * Math.max(0.01, Math.random())).toString(36).substr(2);
		}
	};