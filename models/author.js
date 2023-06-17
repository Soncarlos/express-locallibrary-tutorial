const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name},${this.first_name}`;
  }
  if (!this.first_name || !this.family_name) {
    fullname = "";
  }
  return fullname;
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("d_b_formatted").get(function () {
  const formatter = new Intl.DateTimeFormat("es-NI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  if (this.date_of_birth) {
    return this.date_of_birth.toJSON().slice(0, 10);
  }

  return " ";
});

AuthorSchema.virtual("d_d_formatted").get(function () {
  if (this.date_of_death) {
    return this.date_of_death.toJSON().slice(0, 10);
  }
  return " ";
});

AuthorSchema.virtual("lifespan").get(function () {
  return `${this.d_b_formatted} , ${this.d_d_formatted}`;
});

module.exports = mongoose.model("Author", AuthorSchema);
