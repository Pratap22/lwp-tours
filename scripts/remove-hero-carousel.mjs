import mongoose from 'mongoose';

// MongoDB connection string - replace with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bhutan-travel';

async function removeHeroCarousel() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Dynamically import the Content model
    const { default: Content } = await import('../src/app/models/Content.js');

    // Find all content documents
    const contents = await Content.find({});
    console.log(`Found ${contents.length} content documents`);

    // Remove heroCarousel field from each document
    for (const content of contents) {
      if (content.heroCarousel) {
        console.log(`Removing heroCarousel from document ${content._id}`);
        
        // Remove the heroCarousel field
        delete content.heroCarousel;
        
        // Save the updated document
        await content.save();
        console.log(`Successfully removed heroCarousel from document ${content._id}`);
      } else {
        console.log(`Document ${content._id} doesn't have heroCarousel field`);
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the migration
removeHeroCarousel(); 