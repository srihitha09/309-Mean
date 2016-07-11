function thumb_up_clicked(elem) {
	var countElem = $(elem).parent().find('.thumb_up_count');
	countElem.html(parseInt(countElem.html())+1);
	
}

function thumb_down_clicked(elem) {
	var countElem = $(elem).parent().find('.thumb_down_count');
	countElem.html(parseInt(countElem.html())+1);
}

function open_comment_edit_box(elem) {
	var $parent = $(elem).parent();

	// textarea object
	$parent.append($('<textarea/>', {
		class: 'comment_content_textarea',
		rows: '6',
		name: 'comment_content',
		form: 'comment_form',
		placeholder: 'Please enter your comment'
	}));

	// form object with a checkbox and a submit button
	var $formObj = $('<form/>', {
		id: 'comment_form',
		style: 'width: 90%; text-align: end;'
	});

	var $checkbox = $('<input/>', {
		type: 'checkbox',
		name: 'is_anonymous',
		checked: true
	});
	$formObj.append($checkbox);
	$formObj.append(' Anonymous');
	$formObj.append($('<input/>', {
		type: 'submit',
		value: 'Post'
	}));

	$parent.append($formObj);

	// hide the comment button
	$(elem).hide();
}