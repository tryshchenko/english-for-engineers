var app = app || {};

app.xhr = (function($){
	'use strict';

	var _storageUrl = document.location.origin + document.location.pathname + 'app/rules/';
	var _shortHandUrl = document.location.origin + '/app/rules/';
	var _storageKey = '_englishLesson-';

	var successDecorator = function(key, successCallback) {
		return function(response) {
			window.localStorage.setItem(_storageKey + key, JSON.stringify(response));
			successCallback(response);
		}
	}

	var get = function(what, success, fail) {
		var file = what + '.json';
		if (window.localStorage[_storageKey + file] !== undefined) {
			return success(JSON.parse(window.localStorage[_storageKey + file]));
		}
		success = successDecorator(file, success);

		$.get(_storageUrl + file, success).done().fail(function(error){
			if (error.status == 200) {
				return;
			}
			$.get(_shortHandUrl + file, success).done().fail(fail);
		});
	}

	return { get }

})(jQuery);