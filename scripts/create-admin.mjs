import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../src/app/models/Admin.js';
import pkg from '../src/app/lib/mongodb.js';
const { dbConnect } = pkg;

async function createAdmin() {
  await dbConnect();
  const email = 'admin@holidaykosh.com';
  const password = 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);

  let admin = await Admin.findOne({ email });
  if (admin) {
    console.log('Admin already exists.');
    process.exit(0);
  }

  admin = new Admin({ email, passwordHash });
  await admin.save();
  console.log('Admin user created:', email);
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error('Error creating admin:', err);
  process.exit(1);
}); 