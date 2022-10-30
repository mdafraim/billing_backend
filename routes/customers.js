const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    address: req.body.address,
    zip: req.body.zip,
    phone: req.body.phone
  });

  let email = await Customer.findOne({ email: req.body.email });
  if (email) return res.status(400).send('User already registered.');

  customer = await customer.save();

  res.send({message:'Customer added successfully'});
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      address: req.body.address,
      zip: req.body.zip,
      phone: req.body.phone
      }, { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send({message:'Customer updeted successfully'});
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send({message:'Customer deleted successfully'});
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

module.exports = router;