const Joi = require('joi');
const mongoose = require('mongoose');

const Invoice = mongoose.model('Invoice', new mongoose.Schema({
invoice_id: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  invoice_to: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  amount: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  created_on: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  last_date: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  status: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

function validateInvoice(invoice) {
  const schema = {
    invoice_id: Joi.string().min(5).max(50).required(),
    invoice_to: Joi.string().min(5).max(50).required(),
    amount: Joi.string().min(3).max(20).required(),
    created_on: Joi.string().min(5).max(50).required(),
    last_date: Joi.string().min(5).max(50).required(),
    status: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(invoice, schema);
}

exports.Invoice = Invoice;
exports.validate = validateInvoice;