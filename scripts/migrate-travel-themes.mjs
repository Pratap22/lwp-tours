import mongoose from 'mongoose';
import Content from '../src/app/models/Content.js';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

async function migrateTravelThemes() {
  await dbConnect();

  try {
    const travelThemesContent = await Content.findOne({ 'travelThemes.items': { $exists: true } });

    if (travelThemesContent) {
      console.log('Found travelThemes content with "items". Migrating...');

      const result = await Content.updateOne(
        { _id: travelThemesContent._id },
        { 
          $rename: { 'travelThemes.items': 'travelThemes.themes' }
        }
      );

      if (result.modifiedCount > 0) {
        console.log('Successfully migrated "items" to "themes" in travelThemes.');
      } else {
        console.log('Migration did not modify any documents. It might have been run before or the field name is incorrect.');
      }
    } else {
      console.log('No travelThemes content with "items" field found. No migration needed.');
    }
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
}

migrateTravelThemes(); 