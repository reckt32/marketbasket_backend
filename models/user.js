const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  purchaseHistory: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      date: { type: Date, default: Date.now }
    }
  ]
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
