var app = app || {};
app.components = app.components || {};

app.components.axilaryFactory = (function(){

	var mapper = {
		N: 'negativeMarker',
		A: 'questionMarker',
		Q: 'questionMarker',
		AS: 'specialMarker',
	}

	function buildDropdown(mapping, node) {
		var element = document.createElement('div');
		var select = document.createElement('select');
		element.className = 'col-md-3 plain-element';
		select.className = 'form-control';

		['singular', 'plural'].forEach(function(element){
			var optgroup = document.createElement('optgroup');
			optgroup.label = element;
			["1","2","3"].forEach(function(type) {
				var option = document.createElement('option');
				option.innerHTML = type + ': ' + node[mapping][element][type];
				optgroup.appendChild(option);
			});
			select.appendChild(optgroup);
		})

		element.appendChild(select);
		return element;
	}

	return function(type, node) {
		console.log(type, node);
		var target = buildDropdown(mapper[type], node);
		return target;
		console.log('target', target);
		// element.innerHTML = type;
		return element;
	}
})();