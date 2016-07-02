app = app || {};
app.controllers = app.controllers || {};

app.controllers.application = (function($){

	var sections = {
		primary: document.getElementById('primary'),
	}

	var exampleElements = {
		P: app.components.person,
		V1: app.components.verbFactory(1),
		V2: app.components.verbFactory(2),
		V3: app.components.verbFactory(3),
		Ving: app.components.verbFactory('+ ing'),
		S: app.components.plainFactory('Subject'),
		TM: app.components.timeMarkerFactory,
		A: app.components.axilaryFactory,
		AS: app.components.axilaryFactory,
		N: app.components.axilaryFactory,
		Q: app.components.axilaryFactory,
	}

	function headersFactory(text) {
		var element = document.createElement('h4');
		element.innerHTML = text;
		return element;
	}

	function prebuildResponse(data) {
		var parent = document.createElement('div');

		[].forEach.call(data, function(node, index){
			if (node.title !== undefined) {
				var title = document.createElement('h2');
				title.innerHTML = (index + 1) + '. ' + node.title;
				parent.appendChild(title);
			}

			if (node.description !== undefined) {
				var description = document.createElement('p');
				description.innerHTML = node.description;
				description.className = 'alert alert-success';
				parent.appendChild(description);
			}

			if (node.schema !== undefined) {
				['positive', 'negative', 'question'].forEach(function(type){
					var block = document.createElement('div');
					block.className = "example";
					parent.appendChild(headersFactory(type));
					[].forEach.call(node.schema[type], function(el) {
						var atom;
						if (typeof exampleElements[el] == 'function') {
							atom = exampleElements[el](el, node).cloneNode(true);
						} else {
							atom = exampleElements[el].cloneNode(true);
						}
						block.appendChild(atom);
					});
					parent.appendChild(block);
				});
			}
		})

		return parent;
	}

	function removeActiveSelections() {
		var listItems = document.querySelectorAll('.list-group-item');
		[].forEach.call(listItems, function(element){
			element.className = element.className.replace("active","");
		});
	}

	function render(data) {
		var element = prebuildResponse(data);

		sections.primary.innerHTML = '';
		sections.primary.appendChild(element);

	}

	function setListListeners(element) {
		element.addEventListener('click', function(event){
			var file;

			removeActiveSelections();
			event.target.className = event.target.className + ' active';
			file = event.target.getAttribute('data-rule');
			app.xhr.get(file, render, fail);
		})
	}

	function initAction() {
		var listItems = document.querySelectorAll('.list-group-item');
		[].forEach.call(listItems, setListListeners);
	}

	function ok(response) {
		console.log(response);
	}

	function fail(response) {
		console.log(response);
	}

	initAction();

})(jQuery);