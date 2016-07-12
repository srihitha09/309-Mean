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
		$userInfo.append($('<button/>', {
			text: 'Contact'
		}));
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