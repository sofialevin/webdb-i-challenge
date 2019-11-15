const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    }) 
    .catch (err => {
      res.status(500).json({ message: 'Failed to get accounts' });
    });
  });

  server.get('/api/accounts/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id })
    .then(account => {
        if (account.length) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: 'Could not find account with given id.' })
        }
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to get account' });
      })
})

server.post('/api/accounts', (req, res) => {
    const { name, budget } = req.body

    db('accounts').insert({ name: name, budget: budget })
    .then(account => {
        res.status(201).json(account);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to create account'});
    })
})

server.put('/api/accounts/:id', (req, res) => {
    const accountData = req.body
    console.log(accountData)
    const { id } = req.params

    db('accounts').where({ id: id})
    .update(accountData)
    .then(account => {
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: 'Could not find account with given id.' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to update account'});
    })
})

server.delete('/api/accounts/:id', (req, res) => {
    const { id } = req.params
    db('accounts').where({ id: id}).del()
    .then((count) => {
        console.log(count)
        if (count) {
            console.log(count)
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Could not find account with given id.' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete account'});
    })
})

module.exports = server;