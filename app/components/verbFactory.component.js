var app = app || {};
app.components = app.components || {};

app.components.verbFactory = (function(){
	return function(type) {
		var element = document.createElement('div');

		element.className = 'col-md-2 person-element';
		element.innerHTML = '<span class="btn btn-success"><span class="glyphicon glyphicon-refresh"></span>' + ' Verb' + type + '</span>';

		return element;
	}
})();