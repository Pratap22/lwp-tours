import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  travelTheme: { type: String },
  createdAt: { type: Date, default: Date.now },
  groupSize: { type: String, required: true },
  difficulty: { type: String, required: true },
  bestTime: { type: String, required: true },
  included: [{ type: String }],
  excluded: [{ type: String }],
  itinerary: [{
    short: { type: String, required: true },
    long: { type: String, required: true }
  }],
  gallery: [{ type: String }],
  isHero: { type: Boolean, default: false },
  featured: { type: Boolean, default: false, required: false },
});

export default mongoose.models.Tour || mongoose.model("Tour", TourSchema);
