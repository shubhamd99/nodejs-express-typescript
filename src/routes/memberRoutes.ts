import express, { Application, Request, Response, NextFunction } from 'express';
import uuid from 'uuid';
const router = express.Router();

import { members } from '../members';
import { Members } from '../types/interface';

// Gets all members
router.get('/members', (req: Request, res: Response) => {
  res.json(members);
})

// Get a single member
router.get('/members/:id', (req: Request, res: Response) => {
  const found: boolean = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    // res.send(req.params.id); It will give only id not whole details
    res.json(
      members.filter((member: Members) => member.id === parseInt(req.params.id))
    );
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` })
  }

})

// Create a member
router.post('/members', (req: Request, res: Response) => {
const newMember: Members = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' })
  }

  members.push(newMember);
  // res.json(members)
  res.redirect('/');
})

// Edit a member
router.put('/members/:id', (req: Request, res: Response) => {
  const found: boolean = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach((member: Members) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: 'Member updated', member: member })
      }
    })
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` })
  }

})

// Delete a single member
router.delete('/members/:id', (req: Request, res: Response) => {
  const found: boolean = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter((member: Members) => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` })
  }

})


export default router;
