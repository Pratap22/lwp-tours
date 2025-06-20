import { dbConnect } from './mongodb';
import Tour from '../models/Tour';
import Content from '../models/Content';

// Helper to safely stringify and parse data to avoid serialization errors
function serialize(data) {
  return JSON.parse(JSON.stringify(data));
}

export async function getTours() {
  try {
    await dbConnect();
    const tours = await Tour.find({}).lean();
    return serialize(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

export async function getContent() {
  try {
    await dbConnect();
    const content = await Content.findOne({}).lean();
    return serialize(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
} 