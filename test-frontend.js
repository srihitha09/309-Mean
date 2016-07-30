casper.test.begin('CourseTutor', 15, function suite(test) {
    casper.start("http://localhost:3000/#!/", function() {
        test.assertTitle("CourseTutor - Development Environment", "homepage title is the one expected");

    });

    casper.thenOpen("http://localhost:3000/#!/courses", function() {
    	test.assertUrlMatch('/courses', 'Navigate to courses page correctly');
    	casper.waitForSelector(".list-group-item",
		    function pass () {
		        test.pass("List of courses exist");
		    },
		    function fail () {
		        test.fail("Did not load list of courses");
		    }
		);
		casper.waitForSelector("h1",
		    function pass () {
		        test.pass("Course name is displayed on the page");
		    },
		    function fail () {
		        test.fail("Did not load element course name");
		    }
		);
    });

    casper.thenOpen("http://localhost:3000/#!/signin", function() {
    	test.assertUrlMatch('/signin', 'Navigate to signin page correctly');
    });

    casper.thenOpen("http://localhost:3000/#!/signup", function() {
    	test.assertUrlMatch('/signup', 'Signup page exists');
    	casper.waitForSelector("form",
		    function pass () {
		        test.pass("Found signup form");
		    },
		    function fail () {
		        test.fail("Did not load form successfully");
		    }
		);
		casper.waitForText("Sign up",
		    function pass () {
		        test.pass("Page body contains 'Sign up'");
		    },
		    function fail () {
		        test.fail("Did not load text successfully");
		    }
		);
    });

    casper.thenOpen("http://localhost:3000/#!/comments", function() {
    	test.assertUrlMatch('/comments', 'Comments page exists');
    	casper.waitForSelector("input.form-control",
		    function pass () {
		        test.pass("Found search field for comments");
		    },
		    function fail () {
		        test.fail("Did not find search field");
		    }
		);
    });

    casper.thenOpen("http://localhost:3000/#!/profiles", function() {
    	test.assertUrlMatch('/profiles', 'User profile exists');
    	casper.waitForText("Sessions",
		    function pass () {
		        test.pass("Found option for scheduling tutoring sessions");
		    },
		    function fail () {
		        test.fail("Did not find sessions");
		    }
		);
		casper.waitForText("Friends",
		    function pass () {
		        test.pass("Found option for adding friends");
		    },
		    function fail () {
		        test.fail("Did not find adding friends option");
		    }
		);
    });

    casper.thenOpen("http://localhost:3000/#!/settings/accounts", function() {
    	test.assertUrlMatch('/settings/accounts', 'Able to connect to other accounts');
    });

    casper.thenOpen("http://localhost:3000/#!/settings/password", function() {
    	test.assertUrlMatch('/settings/password', 'Able to connect to password pg');
    });







    casper.run(function() {
        test.done();
    });
});

