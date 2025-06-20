import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  iconBackgroundColor: { type: String, default: '#3b82f6' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
});

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
  themes: [themeSchema],
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
    description: { type: String },
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

export default mongoose.models.Content || mongoose.model('Content', ContentSchema); 