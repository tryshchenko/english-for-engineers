app = app || {};
app.controllers = app.controllers || {};

app.controllers.application = (function($){

	/**
	 * Encapsulated declarations of the document elements
	 * @type {Object}
	 */
	var sections = {
		primary: document.getElementById('primary'),
		sharingIcons: document.querySelectorAll('.social-share'),
		groupItems: document.querySelectorAll('.list-group-item')
	}

	/**
	 * Blocks map
	 * @type {Object}
	 */
	var exampleElements = {
		P: app.components.person,
		V1: app.components.verbFactory(1),
		V2: app.components.verbFactory(2),
		V3: app.components.verbFactory(3),
		Ving: app.components.verbFactory('+ ing'),
		S: app.components.plainFactory('details'),
		TM: app.components.timeMarkerFactory,
		A: app.components.axilaryFactory,
		AS: app.components.axilaryFactory,
		N: app.components.axilaryFactory,
		Q: app.components.axilaryFactory,
	}

	/**
	 * Builds heading into the tense description
	 * @param  {content} text
	 * @return {object}      Document node
	 */
	function headersFactory(text) {
		var element = document.createElement('h4');

		element.innerHTML = text;
		return element;
	}

	/**
	 * Makes HTML from structured JSON
	 * @param  {object} data Parsed json
	 * @return {object}      DOM node with compiled data
	 */
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

	/**
	 * Remove highlighted menu elements
	 */
	function removeActiveSelections() {
		var listItems = sections.groupItems;
		[].forEach.call(listItems, function(element){
			element.className = element.className.replace("active","");
		});
	}

	/**
	 * Build HTML and attach it into a document
	 * @param  {object} data Parsed json
	 * @return {[type]}      [description]
	 */
	function render(data) {
		// @TODO reduce child calls
		var element = prebuildResponse(data);

		sections.primary.innerHTML = '';
		sections.primary.appendChild(element);
	}

	/**
	 * Attach listener to menu element
	 * @param {object} element Menu element
	 */
	function setListListeners(element) {
		element.addEventListener('click', function(event){
			var file;

			removeActiveSelections();
			event.target.className = event.target.className + ' active';
			file = event.target.getAttribute('data-rule');
			app.xhr.get(file, render, fail);
		})
	}

	/**
	 * Attach social sharing helper to each social button
	 */
	function initSocialSharing() {
		var sharingButtons = sections.sharingIcons;
		[].forEach.call(sharingButtons, function(element){
			element.addEventListener('click', app.share);
		});
	}

	/**
	 * Push menu listeners
	 */
	function initAction() {
		var listItems = sections.groupItems;
		[].forEach.call(listItems, setListListeners);
	}

	/**
	 * Success callback to xhr helper
	 * @param  {string} response
	 */
	function ok(response) {
		console.log(response);
	}

	/**
	 * Fail callback to xhr helper
	 * @param  {string} response
	 */
	function fail(response) {
		console.log(response);
	}

	initAction();
	initSocialSharing();

})(jQuery);