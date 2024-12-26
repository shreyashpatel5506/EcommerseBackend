const express = require("express")
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const note = require('../modeuls/Note')
const { body, validationResult } = require('express-validator');

//fetch the all data of specific user /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error("some error find");
        res.status(500).json({ error: 'Internal server error' });
    }
})

//ad notes for a user using post1   
router.post('/addnotes', fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })],
    async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, tag } = req.body;
            const Note = new note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savednote = await Note.save();
            res.json(savednote)
        } catch (error) {
            console.error("some error find");
            res.status(500).json({ error: 'Internal server error' });   
        }

    })

    //routes for notes updation using put
router.put('/updatenotes/:id', fetchuser,
        async (req, res) => {
            try {
                
                const {title,description,tag} = req.body;
                
                // create new note object
                const newNote= {};
                if(title){newNote.title = title};
                if(description){newNote.description = description};
                if(tag){newNote.tag = tag}
                
                //find the note and update the note
                let Note= await note.findById(req.params.id);
                if(!Note){return res.status(404).send("not found")}
                
                //check the note is user note
                if(Note.user.toString() !== req.user.id){
                    return res.status(401).send("Not Allowed")
                }
                
                Note = await note.findByIdAndUpdate(req.params.id,{$set :newNote},{new:true}) 
                res.json({Note})
            } catch (error) {
                console.error("some error find");
            res.status(500).json({ error: 'Internal server error' });   
            }
            })

 //routes for note delete using delete
 router.delete('/deletenotes/:id', fetchuser,
    async (req, res) => {
        try {
            
            
    
    
             //find the note and delete the note
             let Note= await note.findById(req.params.id);
             if(!Note){return res.status(404).send("not found")}
    
             //check the note is user note
             if(Note.user.toString() !== req.user.id){
             return res.status(401).send("Not Allowed")
    
             }
            Note = await note.findByIdAndDelete(req.params.id)
            res.send("note deleted sucessfully")
        
        } catch (error) {
            console.error("some error find");
            res.status(500).json({ error: 'Internal server error' });   
        }
}
)
module.exports = router