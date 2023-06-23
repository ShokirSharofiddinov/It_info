const { Schema, model } = require("mongoose");

const topicSchema = new Schema(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    topic_title: {
      type: String,
      required: true,
    },
    topic_text: {
      type: String,
      required: true,
    },
    created_date: {
      type: Date,
      required: true,
      default: Date(),
    },
    updated_date: {
      type: Date,
      default: Date(),
    },
    is_checked: {
      type: Boolean,
      default: false,
    },
    is_approved: {
      type: Boolean,
      default: false,
    },
    expert_id: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Topic", topicSchema);
