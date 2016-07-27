function showFindingPosts() {
	generatePosts('finding');
}

function showOfferingPosts() {
	generatePosts('offering');
}

function generatePosts(keyword) {
	$('#posts').empty();

	var i=0;
	for (i=0; i<5; i++) {
		var $post = $('<section/>', {
			class: 'single_post'
		});

		var $userInfo = $('<section/>', {
			class: 'post_userInfo',
			style: 'padding: 5px 0px;'
		});
		$userInfo.append($('<img/>', {
			src: 'assets/img/avatar.png',
			width: '100px',
			height: '100px'
		}));
		var $name_wrap = $('<h4/>', {
			style: 'margin: 5px 0px;'
		});
		$name_wrap.append($('<a />', {
			text: 'User'+i,
			href: ''
		}));
		$userInfo.append($name_wrap);
		var $contactButton = $('<button/>', {
			text: 'Contact'
		});
		$contactButton.on('click', openMessagingBox);
		$userInfo.append($contactButton);
		$post.append($userInfo);

		var $detail = $('<section>', {
			class: 'post_detail'
		});
		$detail.append($('<p/>', {
			text: 'This is the '+i+'th post '+keyword
		}));
		$post.append($detail);

		$('#posts').append($post);
	}
}

function openMessagingBox() {
	var $parent = $(this).parent().parent();
	console.log($(this));

	// textarea object
	$parent.append($('<textarea/>', {
		class: 'post_message_textarea expand',
		rows: '6',
		name: 'message_content',
		form: 'message_form',
		placeholder: 'Please enter your comment'
	}));

	// form object with a checkbox and a submit button
	var $formObj = $('<form/>', {
		id: 'message_form',
		class: 'expand',
		style: 'width: 90%; text-align: end;'
	});

	var $cancelButton = $('<a/>', {
		text: 'Cancel',
		href: 'javascript:void 0;'
	});
	var $commentButton = $(this);
	$cancelButton.on('click', function(){
		$('.expand').hide();
		$commentButton.show();
	})
	$formObj.append($cancelButton);

	$formObj.append($('<input/>', {
		type: 'submit',
		value: 'Send'
	}));

	$parent.append($formObj);

	// hide the comment button
	$(this).hide();
}