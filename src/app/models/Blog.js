import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Slug is required.'],
    unique: true,
    trim: true,
  },
  content: {
    type: Object,
    required: true,
    default: {},
  },
  featuredImage: {
    type: String,
    default: '',
  },
  author: {
    name: { type: String, default: 'Admin' },
    // Later, this could be: type: mongoose.Schema.Types.ObjectId, ref: 'Admin'
  },
  tags: [String],
  metaTitle: {
    type: String,
    trim: true,
  },
  metaDescription: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  publishedAt: {
    type: Date,
  },
}, { timestamps: true });

// Middleware to auto-generate slug from title before saving
BlogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 90);
  }
  next();
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema); 