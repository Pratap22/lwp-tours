import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  iconBackgroundColor: { type: String, default: '#3b82f6' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
});

const navigationItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  href: { type: String },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  children: [{ type: mongoose.Schema.Types.Mixed }] // Use Mixed type for nested items
}, { _id: false });

const sectionSchemaDefinition = {
  sectionId: { type: String, required: true, unique: true },
  order: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  hero: {
    title: { type: String },
    subtitle: { type: String },
    image: { type: String },
  },
  title: { type: String },
  subtitle: { type: String },
  content: { type: String },
  ctaText: { type: String },
  ctaLink: { type: String },
  cta: {
    title: { type: String },
    content: { type: String },
    ctaText: { type: String },
    ctaLink: { type: String },
  },
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
  values: [new mongoose.Schema({
    icon: { type: String },
    title: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }, { _id: false })],
  teamMembers: [new mongoose.Schema({
    name: { type: String },
    position: { type: String },
    links: {
      type: [String],
      validate: [v => v.length <= 3, 'A team member can have a maximum of 3 links.']
    },
    image: { type: String },
    bio: { type: String },
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
  faqs: [new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }, { _id: false })],
  navigationItems: [navigationItemSchema]
};

const SectionSchema = new mongoose.Schema(sectionSchemaDefinition, { _id: false });

const ContentSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Bhutan Travel' },
  siteLogo: { type: String, default: '/logo.svg' },
  footer: {
    companyName: { type: String, default: 'LWP Travel & Tours' },
    description: { type: String, default: 'Local Experts | Authentic Experiences' },
    address: { type: String, default: 'Bumthang, Bhutan' },
    email: { type: String, default: 'info@holidaykosh.com' },
    phone: { type: String, default: '+975 17 123 456' },
    copyright: { type: String, default: 'LWP Travel & Tours. All rights reserved.' },
    quickLinks: [{
      name: { type: String },
      href: { type: String },
    }],
    socialLinks: [{
      name: { type: String },
      href: { type: String },
    }],
  },
  sections: [SectionSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Content || mongoose.model('Content', ContentSchema); 