import { Router } from 'express'
const router = Router();
import Task from '../models/Task.js'

router.get('/', async (req, res) => {
    const tasks = await Task.findAll();
    res.send(tasks);
});

router.post('/', async(req, res) => {
    const { title, description} = req.body;
    if (!title) return res.writeHead(400).end('Title must be provided');
    if (!description) return res.writeHead(400).end('Description must be provided');
    await Task.create({
        title,
        description,
    });
    res.writeHead(201).end();
});

router.put('/:id', async (req, res) => {
    const { title, description} = req.body;
    if (!title) return res.writeHead(400).end('Title must be provided');
    if (!description) return res.writeHead(400).end('Description must be provided');
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.writeHead(404).end('Task not found');
    await Task.update({
        title,
        description,
    }, {
        where: {
            id: req.params.id,
        }
    });
    res.writeHead(204).end();
});

router.delete('/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.writeHead(404).end('Task not found');
    await Task.destroy({
        where: {
            id: req.params.id,
        }
    })
    res.writeHead(204).end();
});
router.patch('/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.writeHead(404).end('Task not found');
    const { completed_at } = req.body;
    if (!completed_at) return res.writeHead(400).end('Complete_at must be provided');
    await Task.update({
        completed_at: completed_at,
    }, {
        where: {
            id: req.params.id,
        }
    });
    res.writeHead(200).end();
});

export default router;