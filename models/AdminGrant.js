import mongoose from "mongoose";

const AdminGrantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: String, required: true }, // assuming courses are identified by string IDs
  grantedByAdminId: { type: mongoose.Schema.Types.ObjectId, ref: "Marketer", required: true },
  expiresAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

// Prevent duplicate grants for same user+course
AdminGrantSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.AdminGrant || mongoose.model("AdminGrant", AdminGrantSchema);
