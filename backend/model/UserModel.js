import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,     
    trim: true          
  },
  desc: {
    type: String,
    required: true,
    trim: true
  }
});

const NoteModel =  mongoose.model("Note", schema);
export default NoteModel
