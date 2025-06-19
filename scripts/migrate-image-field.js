const { dbConnect } = require('../src/app/lib/mongodb');
const Tour = require('../src/app/models/Tour');

async function migrateTours() {
  try {
    await dbConnect();
    
    // Find all tours
    const tours = await Tour.find({});
    
    // Update each tour
    for (const tour of tours) {
      if (tour.image && !tour.imageUrl) {
        tour.imageUrl = tour.image;
        await tour.save();
        console.log(`Updated tour: ${tour.title}`);
      }
    }
    
    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateTours(); 