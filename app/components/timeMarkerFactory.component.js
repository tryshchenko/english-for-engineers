var app = app || {};
app.components = app.components || {};

app.components.timeMarkerFactory = (function(){
	return function(type, node) {
		var element = document.createElement('div');
		var select = document.createElement('select');
		element.className = 'col-md-2 plain-element';
		select.className = 'form-control';
		[].forEach.call(node.timeMarkers, function(marker) {
			var option = document.createElement('option');

			option.innerHTML = marker;
			select.appendChild(option);
		});
		element.appendChild(select);

		return element;
	}
})();