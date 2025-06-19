import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/mongodb';
import Admin from '../../../models/Admin';
import bcrypt from 'bcryptjs';
import { verifyToken } from '../../../lib/utils';

function getEmailFromAuthHeader(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  return decoded && decoded.email ? decoded.email : null;
}

export async function POST(request) {
  try {
    await dbConnect();
    const { oldPassword, newPassword } = await request.json();
    const adminEmail = getEmailFromAuthHeader(request);

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: 'Both old and new passwords are required.' }, { status: 400 });
    }

    if (!adminEmail) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found.' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Old password is incorrect.' }, { status: 401 });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    admin.passwordHash = newHash;
    admin.updatedAt = new Date();
    await admin.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// (Optional) GET: Return admin email for UI
export async function GET(request) {
  try {
    await dbConnect();
    const adminEmail = getEmailFromAuthHeader(request);
    
    if (!adminEmail) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found.' }, { status: 404 });
    }
    return NextResponse.json({ email: admin.email });
  } catch (error) {
    console.error('Get admin error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
} 