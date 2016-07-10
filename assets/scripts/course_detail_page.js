function thumb_up_clicked(elem) {
	var countElem = $(elem).parent().find('.thumb_up_count');
	countElem.html(parseInt(countElem.html())+1);
	
}

function thumb_down_clicked(elem) {
	var countElem = $(elem).parent().find('.thumb_down_count');
	countElem.html(parseInt(countElem.html())+1);
}