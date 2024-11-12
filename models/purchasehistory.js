const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const PurchaseHistory = mongoose.model('purchase_historys', purchaseHistorySchema);
module.exports = PurchaseHistory;
