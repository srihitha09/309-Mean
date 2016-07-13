var divClone;

$(document).on('click', '#courses-btn', function(){ 
		divClone = $("#search-section").clone();
	
		$('#search-section').html('<h3>Search for</h3>' +
			'<form method="get" action="/search" id="search"><input name="q" type="search" size="40" placeholder="tutor name" /></form>' +
			'<h3>at</h3>' + 
			'<form method="get" action="/search" id="search"><input name="q" type="search" size="40" placeholder="university name" /></form>' +
			'<button id="go">GO</button>' + '<br>' +
			'<button id="cancel">Cancel</button>')



});

$(document).on('click', '#programs-btn', function(){ 
		divClone = $("#search-section").clone();
	
		$('#search-section').html('<h3>Search for</h3>' +
			'<form method="get" action="/search" id="search"><input name="q" type="search" size="40" placeholder="student name" /></form>' +
			'<h3>at</h3>' + 
			'<form method="get" action="/search" id="search"><input name="q" type="search" size="40" placeholder="university name" /></form>' +
			'<button id="go">GO</button>' + '<br>' +
			'<button id="cancel">Cancel</button>')



});

$(document).on('click', '#cancel', function(){ 
		$("#search-section").replaceWith(divClone);
		divClone = $("#search-section").clone();
 });