import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    module: {
      type: String,
    },
    targetedId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    Ip: String,
    userAgent: String,
  },
  {
    timestamps: true,
  },
);

const AuditLog = mongoose.model("AuditLog", auditSchema);

export default AuditLog;
