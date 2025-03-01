import express from 'express';
import Ticket from '../models/Ticket.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const newTicket = new Ticket({
      title,
      description,
      user: req.userId
    });
    
    const ticket = await newTicket.save();
    
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    let tickets;
    
    if (req.user.role === 'admin') {
      // Admin can see all tickets
      tickets = await Ticket.find().populate('user', 'name email');
    } else {
      // Regular users can only see their own tickets
      tickets = await Ticket.find({ user: req.userId });
    }
    
    res.json(tickets);
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['open', 'in progress', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    ticket.status = status;
    ticket.updatedAt = Date.now();
    
    await ticket.save();
    
    res.json(ticket);
  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;