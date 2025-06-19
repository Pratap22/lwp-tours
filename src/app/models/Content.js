import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  // Gallery
  gallery: {
    images: [{
      src: { type: String, required: true },
      alt: { type: String, required: true },
      isActive: { type: Boolean, default: true },
      order: { type: Number, default: 0 }
    }],
    isActive: { type: Boolean, default: true },
    title: { type: String, default: 'Bhutan Photo Gallery' },
    subtitle: { type: String, default: 'Discover the Beauty of Bhutan' }
  },

  // Awards Section
  awards: {
    isActive: { type: Boolean, default: true },
    items: [{
      icon: { type: String, required: true },
      title: { type: String, required: true },
      isActive: { type: Boolean, default: true },
      order: { type: Number, default: 0 }
    }]
  },

  // About Bhutan Section
  aboutBhutan: {
    isActive: { type: Boolean, default: true },
    title: { type: String, default: 'Bhutan travel, bespoke experiences' },
    content: { type: String, required: true },
    ctaText: { type: String, default: 'Meet our team' },
    ctaLink: { type: String, default: '/about-us' }
  },

  // Custom Journey Section
  customJourney: {
    isActive: { type: Boolean, default: true },
    title: { type: String, default: 'Custom-Made Journey' },
    content: { type: String, required: true },
    ctaText: { type: String, default: 'speak to us' },
    themeTitle: { type: String, default: 'Travel Theme' },
    themeContent: { type: String, required: true }
  },

  // Travel Themes Section
  travelThemes: {
    isActive: { type: Boolean, default: true },
    title: { type: String, default: 'Travel Themes' },
    subtitle: { type: String, default: 'Choose Your Adventure' },
    themes: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, required: true },
      isActive: { type: Boolean, default: true },
      order: { type: Number, default: 0 }
    }]
  },

  // Why Choose Us Section
  whyChooseUs: {
    isActive: { type: Boolean, default: true },
    title: { type: String, default: 'Why Choose Us' },
    subtitle: { type: String, default: 'Your Trusted Travel Partner' },
    reasons: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, required: true },
      isActive: { type: Boolean, default: true },
      order: { type: Number, default: 0 }
    }]
  },

  // Testimonials Section
  testimonials: {
    isActive: { type: Boolean, default: true },
    title: { type: String, default: 'What Our Travelers Say' },
    subtitle: { type: String, default: 'Real Stories from Real Travelers' },
    testimonials: [{
      name: { type: String, required: true },
      location: { type: String, required: true },
      content: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5, default: 5 },
      isActive: { type: Boolean, default: true },
      order: { type: Number, default: 0 }
    }]
  },

  // Booking Process Section
  bookingProcess: {
    isActive: { type: Boolean, default: true },
    title: { type: String, default: 'How to Book Your Trip' },
    subtitle: { type: String, default: 'Simple Steps to Your Dream Vacation' },
    steps: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, required: true },
      isActive: { type: Boolean, default: true },
      order: { type: Number, default: 0 }
    }]
  },

  // Small Group Tours Section
  smallGroupTours: {
    isActive: { type: Boolean, default: true },
    title: { type: String, default: 'Small Group Tours' },
    subtitle: { type: String, default: 'Intimate Experiences with Like-Minded Travelers' },
    description: { type: String, required: true },
    benefits: [{
      text: { type: String, required: true },
      isActive: { type: Boolean, default: true },
      order: { type: Number, default: 0 }
    }]
  },

  // Navigation (for Header)
  navigation: {
    isActive: { type: Boolean, default: true },
    items: [
      {
        name: { type: String, required: true },
        href: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 }
      }
    ]
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Content || mongoose.model('Content', ContentSchema); 