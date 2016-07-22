var async = require('async'),
  request = require('request');

var data = [
  {'name': 'CSCA08H3', 'description': 'Introduction to Computer Science I', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '1'},
  {'name': 'CSCA48H3', 'description': 'Introduction to Computer Science II', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '1' },
  {'name': 'CSCA20H3', 'description': 'Introduction to Programming', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '1'},
  {'name': 'CSCA67H3', 'description': 'Discrete Mathematics', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '1'},
  {'name': 'CSCB07H3', 'description': 'Software Design', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '2'},
  {'name': 'CSCB09H3', 'description': 'Software Tools and System Programming', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '2'},
  {'name': 'CSCB20H3', 'description': 'Introduction to Databases and Web applications', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '2'},
  {'name': 'CSCB29H3', 'description': 'Concepts in Elementary Computer Science', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '2'},
  {'name': 'CSCB36H3', 'description': 'Introduction to Theory of Computation', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '2'},
  {'name': 'CSCB63H3', 'description': 'Design Analysis of Data Structures', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '2'},
  {'name': 'CSCC01H3', 'description': 'Introduction to Software Engineering', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '3'},
  {'name': 'CSCB58H3', 'description': 'Computer Organization', 'program': 'Computer Science', 'school': 'University of Toronto Scarborough', 'year': '2'},
  {'name': 'CSC108H1', 'description': 'Introduction to Computer Programming', 'program': 'Computer Science', 'school': 'University of Toronto St.George', 'year': '1'},
  {'name': 'CSC120H1', 'description': 'Computer Science for the Sciences', 'program': 'Computer Science', 'school': 'University of Toronto St.George', 'year': '1'},
  {'name': 'CSC148H1', 'description': 'Introduction to Computer Science', 'program': 'Computer Science', 'school': 'University of Toronto St.George', 'year': '1'},
  {'name': 'CSC165H1', 'description': 'Mathematical Expression and Reasoning', 'program': 'Computer Science', 'school': 'University of Toronto St.George', 'year': '1'},
  {'name': 'CSC207H1', 'description': 'Software Design', 'program': 'Computer Science', 'school': 'University of Toronto St.George', 'year': '2'},
  {'name': 'CSC209H1', 'description': 'Software Tools and Systems Programming', 'program': 'Computer Science', 'school': 'University of Toronto St.George', 'year': '2'},
  {'name': 'CSC236H1', 'description': 'Introduction to theory of Computation', 'program': 'Computer Science', 'school': 'University of Toronto St.George', 'year': '2'},
  {'name': 'CSC258H1', 'description': 'Computer Organization', 'program': 'Computer Science', 'school': 'University of Toronto St.George', 'year': '2'},
  ];

exports.up = function(next) {

  async.each(data, function(c, callback) {
    var options = {
        method: 'post',
        body: c,
        json: true,
        url: 'http://localhost:3000/courses',
        auth: {
          user: 'admin',
          pass: 'password'
        }
    };

    request(options, function (err, response) {
      if (response.statusCode == 201) {
        callback();
      } else {
        callback(err);
      }
    });
  }, function(err) {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
};

exports.down = function(next) {
  async.each(data, function(c, callback) {
    var options = {
        method: 'delete',
        body: c,
        json: true,
        url: 'http://localhost:3000/courses',
        auth: {
          user: 'admin',
          pass: 'password'
        }
    };

    request(options, function (err, response) {
      if (response.statusCode == 201) {
        callback();
      } else {
        callback(err);
      }
    });
  }, function(err) {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
};