var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'escng_totem',
  password: 'M1a4$1t4E8r0',
  database: 'escng_totem'
});

con.connect(function(err) {
  if (err) {throw err;}
  console.log('Connected!');
});

exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    var sql = 'select * from products where id = ' + id;
    con.query(sql, function (err, result) {
        var item = result;
        console.log(item);
        res.json(item);
    });
};

exports.findByCategory = function(req, res) {
    var id = parseInt(req.params.id);
    console.log('findByCategory: ' + id);
    var sql = 'select * from products where categoryId = ' + id;
    con.query(sql, function (err, result) {
        var item = result;
        console.log(item);
        res.json(item);
    });
};

exports.findAll = function(req, res) {
    var name = req.query.name;
    var sql = '';
    if (name) {
        sql = 'select * from products where name like concat(%,' + name + ',%)';
    } else {
        sql = 'select * from products';
    }
    con.query(sql, function (err, result) {
        if(err){
            console.log(err);
        }
        console.log(result);
        res.json(result);
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    console.log('Populating product database...');
    var products = [
        {'id': 1, 'code': 'James', 'name': 'King', 'fullName': 'James King', 'categoryId': 0, 'categoryName': '', 'title': 'President and CEO', 'department': 'Corporate', 'cellPhone': '617-000-0001', 'officePhone': '781-000-0001', 'email': 'jking@fakemail.com', 'city': 'Boston, MA', 'pic': 'james_king.jpg', 'twitterId': '@fakejking', 'blog': 'http://coenraets.org'},
        {'id': 2, 'code': 'Julie', 'name': 'Taylor', 'fullName': 'Julie Taylor', 'categoryId': 1, 'categoryName': 'James King', 'title': 'VP of Marketing', 'department': 'Marketing', 'cellPhone': '617-000-0002', 'officePhone': '781-000-0002', 'email': 'jtaylor@fakemail.com', 'city': 'Boston, MA', 'pic': 'julie_taylor.jpg', 'twitterId': '@fakejtaylor', 'blog': 'http://coenraets.org'},
        {'id': 3, 'code': 'Eugene', 'name': 'Lee', 'fullName': 'Eugene Lee', 'categoryId': 1, 'categoryName': 'James King', 'title': 'CFO', 'department': 'Accounting', 'cellPhone': '617-000-0003', 'officePhone': '781-000-0003', 'email': 'elee@fakemail.com', 'city': 'Boston, MA', 'pic': 'eugene_lee.jpg', 'twitterId': '@fakeelee', 'blog': 'http://coenraets.org'},
        {'id': 4, 'code': 'John', 'name': 'Williams', 'fullName': 'John Williams', 'categoryId': 1, 'categoryName': 'James King', 'title': 'VP of Engineering', 'department': 'Engineering', 'cellPhone': '617-000-0004', 'officePhone': '781-000-0004', 'email': 'jwilliams@fakemail.com', 'city': 'Boston, MA', 'pic': 'john_williams.jpg', 'twitterId': '@fakejwilliams', 'blog': 'http://coenraets.org'},
        {'id': 5, 'code': 'Ray', 'name': 'Moore', 'fullName': 'Ray Moore', 'categoryId': 1, 'categoryName': 'James King', 'title': 'VP of Sales', 'department': 'Sales', 'cellPhone': '617-000-0005', 'officePhone': '781-000-0005', 'email': 'rmoore@fakemail.com', 'city': 'Boston, MA', 'pic': 'ray_moore.jpg', 'twitterId': '@fakermoore', 'blog': 'http://coenraets.org'},
        {'id': 6, 'code': 'Paul', 'name': 'Jones', 'fullName': 'Paul Jones', 'categoryId': 4, 'categoryName': 'John Williams', 'title': 'QA category', 'department': 'Engineering', 'cellPhone': '617-000-0006', 'officePhone': '781-000-0006', 'email': 'pjones@fakemail.com', 'city': 'Boston, MA', 'pic': 'paul_jones.jpg', 'twitterId': '@fakepjones', 'blog': 'http://coenraets.org'},
        {'id': 7, 'code': 'Paula', 'name': 'Gates', 'fullName': 'Paula Gates', 'categoryId': 4, 'categoryName': 'John Williams', 'title': 'Software Architect', 'department': 'Engineering', 'cellPhone': '617-000-0007', 'officePhone': '781-000-0007', 'email': 'pgates@fakemail.com', 'city': 'Boston, MA', 'pic': 'paula_gates.jpg', 'twitterId': '@fakepgates', 'blog': 'http://coenraets.org'},
        {'id': 8, 'code': 'Lisa', 'name': 'Wong', 'fullName': 'Lisa Wong', 'categoryId': 2, 'categoryName': 'Julie Taylor', 'title': 'Marketing category', 'department': 'Marketing', 'cellPhone': '617-000-0008', 'officePhone': '781-000-0008', 'email': 'lwong@fakemail.com', 'city': 'Boston, MA', 'pic': 'lisa_wong.jpg', 'twitterId': '@fakelwong', 'blog': 'http://coenraets.org'},
        {'id': 9, 'code': 'Gary', 'name': 'Donovan', 'fullName': 'Gary Donovan', 'categoryId': 2, 'categoryName': 'Julie Taylor', 'title': 'Marketing category', 'department': 'Marketing', 'cellPhone': '617-000-0009', 'officePhone': '781-000-0009', 'email': 'gdonovan@fakemail.com', 'city': 'Boston, MA', 'pic': 'gary_donovan.jpg', 'twitterId': '@fakegdonovan', 'blog': 'http://coenraets.org'},
        {'id': 10, 'code': 'Kathleen', 'name': 'Byrne', 'fullName': 'Kathleen Byrne', 'categoryId': 5, 'categoryName': 'Ray Moore', 'title': 'Sales Representative', 'department': 'Sales', 'cellPhone': '617-000-0010', 'officePhone': '781-000-0010', 'email': 'kbyrne@fakemail.com', 'city': 'Boston, MA', 'pic': 'kathleen_byrne.jpg', 'twitterId': '@fakekbyrne', 'blog': 'http://coenraets.org'},
        {'id': 11, 'code': 'Amy', 'name': 'Jones', 'fullName': 'Amy Jones', 'categoryId': 5, 'categoryName': 'Ray Moore', 'title': 'Sales Representative', 'department': 'Sales', 'cellPhone': '617-000-0011', 'officePhone': '781-000-0011', 'email': 'ajones@fakemail.com', 'city': 'Boston, MA', 'pic': 'amy_jones.jpg', 'twitterId': '@fakeajones', 'blog': 'http://coenraets.org'},
        {'id': 12, 'code': 'Steven', 'name': 'Wells', 'fullName': 'Steven Wells', 'categoryId': 4, 'categoryName': 'John Williams', 'title': 'Software Architect', 'department': 'Engineering', 'cellPhone': '617-000-0012', 'officePhone': '781-000-0012', 'email': 'swells@fakemail.com', 'city': 'Boston, MA', 'pic': 'steven_wells.jpg', 'twitterId': '@fakeswells', 'blog': 'http://coenraets.org'}
    ];
    populateDB(products);
};
