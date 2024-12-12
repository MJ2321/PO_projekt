const express = require('express');
const userModel = require('../models/users');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(userModel.getAllUsers());
});

router.get('/:id', (req, res) => {
    const user = userModel.getUserById(Number(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
});

router.post('/', (req, res) => {
    const { name, lastname } = req.body;
    if (!name || !lastname) {
        return res.status(400).json({ error: 'Invalid data' });
    }
    const user = userModel.addUser(name, lastname);
    res.status(201).json(user);
});

router.patch('/:id', (req, res) => {
    const updatedUser = userModel.updateUser(Number(req.params.id), req.body);
    if (updatedUser.error) {
        return res.status(400).json(updatedUser);
    }
    res.status(204).send();
});

router.delete('/:id', (req, res) => {
    const success = userModel.deleteUser(Number(req.params.id));
    if (!success) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
});

module.exports = router;
