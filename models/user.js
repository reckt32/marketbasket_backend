const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  purchaseHistory: [
    { type: Schema.Types.ObjectId, ref: 'PurchaseHistory' } 
  ]
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
