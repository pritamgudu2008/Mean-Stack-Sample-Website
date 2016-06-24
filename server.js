var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyparser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());


app.get('/contactlist', function(req, res){
	console.log("I received a get request")


	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
	/*person1 = {
		name: 'Pritam',
		email: 'pkm@test.com',
		contact: '(222) 222-2222'
	};

	person2 = {
		name: 'Hariram',
		email: 'hari@test.com',
		contact: '(222) 992-0022'
	};

	person3 = {
		name: 'Priti',
		email: 'Priti@test.com',
		contact: '(234) 552-2222'
	};

	var contactlist = [person1, person2, person3];
	res.json(contactlist);*/
});

app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, update: {$set: {name: req.body.name, email: req.body.email, 
		contact: req.body.contact}}, new: true}, function(err, doc){
			res.json(doc);
	});
});

app.listen(3000);
console.log("server is running on port 3000");