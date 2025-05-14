import mongoose from "mongoose";
import GitHubSlugger from "github-slugger";

const slugger = new GitHubSlugger();

const truckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "truck name is required"],
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
});

truckSchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    return next();
  }

  // TODO: ensure slugs are unique
  this.slug = slugger.slug(this.name);
  next();
});

export default mongoose.model("Truck", truckSchema);
