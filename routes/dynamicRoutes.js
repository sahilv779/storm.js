const express = require('express');
const fs = require('fs');
const path = require('path');
const parseQuery = require('../middlewares/queryParser');
const { verifyToken } = require('../auth/auth');
const { PrismaClient } = require('@prisma/client');
const BaseController = require('../controllers/baseController');

const router = express.Router();
const prisma = new PrismaClient();
const hooksPath = path.join(__dirname, '../hooks');

const getModel = (modelName) => {
    if (prisma[modelName]) {
        return prisma[modelName];
    }
    return null;
};

const getHooks = (modelName) => {
    try {
        return require(path.join(hooksPath, `${modelName}Hooks.js`));
    } catch (e) {
        return {};
    }
};

router.param('model', (req, res, next, model) => {
    const modelInstance = getModel(model);
    if (modelInstance) {
        const hooks = getHooks(model);
        req.controller = new BaseController(modelInstance, hooks);
        next();
    } else {
        res.status(404).json({ error: 'Model not found' });
    }
});

router.get('/:model', verifyToken, parseQuery, (req, res) => req.controller.getAll(req, res));
router.post('/:model', verifyToken, (req, res) => req.controller.create(req, res));
router.get('/:model/:id',  (req, res) => req.controller.getById(req, res));
router.put('/:model/:id', verifyToken, (req, res) => req.controller.update(req, res));
router.delete('/:model/:id', verifyToken, (req, res) => req.controller.delete(req, res));

module.exports = router;
