const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const migrateContent = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  try {
    const oldContent = await mongoose.connection.db.collection('contents').findOne();

    if (!oldContent) {
      console.log('No existing content found to migrate.');
      return;
    }

    const sections = [
      { sectionId: 'gallery', order: 1, ...oldContent.gallery },
      { sectionId: 'awards', order: 2, ...oldContent.awards },
      { sectionId: 'aboutBhutan', order: 3, ...oldContent.aboutBhutan },
      { sectionId: 'customJourney', order: 4, ...oldContent.customJourney },
      { sectionId: 'travelThemes', order: 5, ...oldContent.travelThemes },
      { sectionId: 'whyChooseUs', order: 6, ...oldContent.whyChooseUs },
      { sectionId: 'testimonials', order: 7, ...oldContent.testimonials },
      { sectionId: 'bookingProcess', order: 8, ...oldContent.bookingProcess },
      { sectionId: 'smallGroupTours', order: 9, ...oldContent.smallGroupTours },
      { 
        sectionId: 'navigation', 
        order: 10, 
        isActive: oldContent.navigation?.isActive,
        navigationItems: oldContent.navigation?.items 
      }
    ].filter(section => section.sectionId);

    // Define the Content schema inline since we can't import the model directly
    const sectionSchemaDefinition = {
      sectionId: { type: String, required: true, unique: true },
      order: { type: Number, required: true },
      isActive: { type: Boolean, default: true },
      title: { type: String },
      subtitle: { type: String },
      content: { type: String },
      ctaText: { type: String },
      ctaLink: { type: String },
      themeTitle: { type: String },
      themeContent: { type: String },
      images: [{
        src: { type: String, required: true },
        alt: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 }
      }],
      items: [new mongoose.Schema({
        icon: { type: String },
        title: { type: String },
        description: { type: String },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 }
      }, { _id: false })],
      themes: [new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
        iconBackgroundColor: { type: String, default: '#3b82f6' },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 }
      }, { _id: false })],
      reasons: [new mongoose.Schema({
        title: { type: String },
        description: { type: String },
        icon: { type: String },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 }
      }, { _id: false })],
      testimonials: [new mongoose.Schema({
        name: { type: String },
        location: { type: String },
        content: { type: String },
        rating: { type: Number, min: 1, max: 5, default: 5 },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 }
      }, { _id: false })],
      steps: [new mongoose.Schema({
        title: { type: String },
        description: { type: String },
        icon: { type: String },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 }
      }, { _id: false })],
      benefits: [new mongoose.Schema({
        text: { type: String },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 }
      }, { _id: false })],
      navigationItems: [new mongoose.Schema({
        name: { type: String },
        href: { type: String },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 }
      }, { _id: false })]
    };

    const SectionSchema = new mongoose.Schema(sectionSchemaDefinition, { _id: false });
    const ContentSchema = new mongoose.Schema({
      sections: [SectionSchema],
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });

    const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

    const newContent = {
      sections: sections,
      createdAt: oldContent.createdAt || new Date(),
      updatedAt: new Date(),
    };

    await Content.deleteMany({});
    await Content.create(newContent);

    console.log('Content migration successful!');
  } catch (error) {
    console.error('Error during content migration:', error);
  } finally {
    mongoose.disconnect();
  }
};

migrateContent(); 