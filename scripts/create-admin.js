const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const ADMIN_EMAIL = 'admin@holidaykosh.com';
const ADMIN_PASSWORD = 'admin123';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  let admin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (admin) {
    console.log('Admin already exists.');
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  admin = new Admin({ email: ADMIN_EMAIL, passwordHash });
  await admin.save();
  console.log('Admin user created:', ADMIN_EMAIL);
  await mongoose.disconnect();
}

createAdmin().catch((err) => {
  console.error('Error creating admin:', err);
  mongoose.disconnect();
}); 