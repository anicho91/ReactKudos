const User = require('../models/Users');
const Kudos = require('../models/Kudos');

module.exports = function(app) {
  app.get('/api/kudos', function (req, res) {
    Kudos.find({})
    .populate('from')
    .populate('to')
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
  });

  app.get('/api/users', function (req, res) {
    User.find({})
    
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
  });

  app.post('/api/users', function (req, res) {
    User.create(req.body)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
  });

  app.delete('/api/kudos', function (req, res) {
    Kudos.deleteMany(req.body)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
  });

  app.post('/api/kudos', function (req, res) {
    const userId = req.body.userId;
    const newKudo = {
      to: req.body.to,
      from: req.body.from,
      title: req.body.title,
      body: req.body.body
    }

    Kudos.create(newKudo)
      .then(function (kudoData) {
        return User.findOneAndUpdate({_id: userId}, { $push: { kudos: kudoData._id } }, { new: true });
    })
    .then(function(userData) {
      res.json(userData);
    })
    .catch(function (err) {
      res.json(err);
    });
  });

}  