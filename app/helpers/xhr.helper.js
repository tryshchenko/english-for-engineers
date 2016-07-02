var app = app || {};

app.xhr = (function($){
	'use strict';

	var version = '1.0';
	var _storageUrl = document.location.origin + document.location.pathname + 'app/rules/';
	var _shortHandUrl = document.location.origin + '/app/rules/';
	var _storageKey = '_englishLesson-' + version;

	/**
	 * Decorator for success calback. Saves value to cache after success.
	 * @param  {string} key             filename (also a key in cache)
	 * @param  {function} successCallback Original success callback
	 * @return {function}                 Decorated success callback
	 */
	var successDecorator = function(key, successCallback) {
		return function(response) {
			window.localStorage.setItem(_storageKey + key, JSON.stringify(response));
			successCallback(response);
		}
	}

	/**
	 * jQuery Get method decorator (Cache + Fallback for an old path)
	 * @param  {string} what    Filename without path and extension
	 * @param  {function} success callback
	 * @param  {function} fail    callback
	 * @return {object}         Object with decorated method
	 */
	var get = function(what, success, fail) {
		var file = what + '.json';

		// If it exists in the cache
		if (window.localStorage[_storageKey + file] !== undefined) {
			return success(JSON.parse(window.localStorage[_storageKey + file]));
		}

		success = successDecorator(file, success);

		$.get(_storageUrl + file, success).done().fail(function(error){
			if (error.status == 200) {
				return;
			}
			// Fallback
			$.get(_shortHandUrl + file, success).done().fail(fail);
		});
	}

	return { get: get }

})(jQuery);