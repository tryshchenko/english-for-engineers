var app = app || {};
app.components = app.components || {};

app.components.plainFactory = (function(){
	return function(type) {
		var element = document.createElement('div');

		element.className = 'col-md-2 plain-element';
		element.innerHTML = '<span class="decor btn btn-default">' + type + '</span>';

		return element;
	}
})();