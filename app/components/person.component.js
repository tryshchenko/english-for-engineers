var app = app || {};
app.components = app.components || {};

app.components.person = (function(){
	var element = document.createElement('div');
	element.className = 'col-md-1 person-element';
	element.innerHTML = '<div class="btn-lg"><span class="glyphicon glyphicon-user"></span></div>';
	return element;
})();