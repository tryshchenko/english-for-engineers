var app = app || {};

app.share = (function(){
	return function(event) {
		// If you are mistaken - let user share even in facebook instead of error :)
		var social = event.target.getAttribute('data-social') || 'facebook';
		var sharingMap = {
			facebook: function() {
				var link = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location);
				window.open(link,'_blank');
			},
			linkedin: function() {
				var link = 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(window.location) + '&title=English for engineers&summary=&source=';
				window.open(link, '_blank');
			},
			twitter: function() {
				var link = 'https://twitter.com/intent/tweet?url=' + window.location.href + '&text=English for engineers';
				window.open(link,'_blank');
			}
		}

		sharingMap[social]();
	}
})();