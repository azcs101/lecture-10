const express = require('express');
const bodyParser = require('body-parser');

const people = [];
let id = 0;
/**
 * id
 * name
 * age
 * weight
 * height
 */

const app = express();
app.use(bodyParser());

app.get('/', function(req, res) {
    res.send(people);
});

app.post('/', function(req, res) {
    const newItem = req.body;
    newItem.id = id++;
    people.push(newItem);

    res.send({
        id: newItem.id,
        result: 'OK'
    });
});


app.get('/:id', function(req, res) {
    const id = req.params.id;
    const personArray = people.filter(function(obj) {
        return obj.id == id;
    });

    if (personArray.length == 0) {
        res.statusCode = 404;
        res.send({ result: 'NOT FOUND' });
    } else {
        res.send(personArray[0]);
    }
});

app.put('/:id', function(req, res) {
    const id = req.params.id;
    let found = -1;
    for (let i = 0; i < people.length; ++i) {
        if (people[i].id == id) {
            found = i;
            break;
        }
    }

    if (found == -1) {
        res.statusCode = 404;
        res.send({ result: 'NOT FOUND' });
    } else {
        const body = req.body;
        people[found] = body;
        people[found].id = id;
        res.send({ result: 'OK' });
    }
});

app.patch('/:id', function(req, res) {
    const id = req.params.id;
    let found = -1;
    for (let i = 0; i < people.length; ++i) {
        if (people[i].id == id) {
            found = i;
            break;
        }
    }

    if (found == -1) {
        res.statusCode = 404;
        res.send({ result: 'NOT FOUND' });
    } else {
        const body = req.body;
        Object.keys(body).forEach(function(key) {
            people[found][key] = body[key];
        });
        people[found].id = id;
        res.send({ result: 'OK' });
    }
});

app.delete('/:id', function(req, res) {
    const id = req.params.id;
    let found = -1;
    for (let i = 0; i < people.length; ++i) {
        if (people[i].id == id) {
            found = i;
            break;
        }
    }

    if (found == -1) {
        res.statusCode = 404;
        res.send({ result: 'NOT FOUND' });
    } else {
        delete people[found];
        res.send({ result: 'OK' });
    }
});

app.listen(3000);
