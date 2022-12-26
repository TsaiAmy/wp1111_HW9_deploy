import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ScoreSchema = new Schema({
    name: String,
    subject: String,
    score: Number
});
const ScoreC = mongoose.model('Student', ScoreSchema);

export default ScoreC