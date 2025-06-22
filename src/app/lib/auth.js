import jwt from 'jsonwebtoken';
import Admin from '@/app/models/Admin';
import { dbConnect } from '@/app/lib/mongodb';

export const verifyAdmin = async (request) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { success: false, status: 401, data: { message: 'Not authorized, no token' } };
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
      return { success: false, status: 401, data: { message: 'Not authorized, no token' } };
    }

    await dbConnect();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const admin = await Admin.findById(decoded.adminId).select('-passwordHash');
    
    if (!admin) {
      return { success: false, status: 401, data: { message: 'Not authorized, admin not found' } };
    }
    
    return { success: true, status: 200, data: { adminId: admin._id } };
  } catch (error) {
    console.error('AUTH_VERIFY_ERROR', error);
    return { success: false, status: 401, data: { message: 'Not authorized, token failed' } };
  }
}; 