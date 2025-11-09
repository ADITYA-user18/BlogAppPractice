import express, { Router } from 'express';
import NoteModel from '../model/UserModel.js';

const route = express.Router()



route.post('/', async (req, res) => {
    const { title, desc } = req.body;
    if (!title || !desc) {
        res.status(403).json({ message: 'Must required All the Credentials to save the data' })
    }
    const DataSaver = await NoteModel.create({
        title: title,
        desc: desc
    });
    res.json(DataSaver)
});


route.delete(`/:id`, async (req, res) => {
    const DataId = req.params.id
    const searchAndDeleteData = await NoteModel.findByIdAndDelete(DataId)
    if (!searchAndDeleteData) {
        res.status(404).json({ message: 'Unable to Delete the Data ' })
    }

    res.status(200).json({ message: 'Data Deleted Successfully' })

});

// PUT /user/:id  → Update a specific blog by ID
route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    if (!title || !desc) {
      return res.status(400).json({ message: "Both title and desc are required" });
    }

    // Find and update the document
    const updatedNote = await NoteModel.findByIdAndUpdate(
      id,
      { title, desc },
      { new: true } // ✅ returns the updated document instead of the old one
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedNote); // ✅ send updated data back to frontend
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog", error });
  }
});





export default route