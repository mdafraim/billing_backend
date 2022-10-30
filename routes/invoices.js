const {Invoice, validate} = require('../models/invoice');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const invoices = await Invoice.find().sort('name');
  res.send(invoices);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let invoice = new Invoice({
    invoice_id: req.body.invoice_id,
    invoice_to: req.body.invoice_to,
    amount: req.body.amount,
    created_on: req.body.created_on,
    last_date: req.body.last_date,
    status: req.body.status
  });

  let invoice_id = await Invoice.findOne({ invoice_id: req.body.invoice_id });
  if (invoice_id) return res.status(400).send('User already registered.');

  invoice = await invoice.save();

  res.send({message:'Invoice added successfully'});
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const invoice = await Invoice.findByIdAndUpdate(req.params.id,
    {
      invoice_id: req.body.invoice_id,
      invoice_to: req.body.invoice_to,
      amount: req.body.amount,
      created_on: req.body.created_on,
      last_date: req.body.last_date,
      status: req.body.status
      }, { new: true });

  if (!invoice) return res.status(404).send('The invoice with the given ID was not found.');

  res.send({message:'Invoice updeted successfully'});
});

router.delete('/:id', async (req, res) => {
  const invoice = await Invoice.findByIdAndRemove(req.params.id);

  if (!invoice) return res.status(404).send('The invoice with the given ID was not found.');

  res.send({message:'Invoice deleted successfully'});
});

router.get('/:id', async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);

  if (!invoice) return res.status(404).send('The invoice with the given ID was not found.');

  res.send(invoice);
});

module.exports = router;