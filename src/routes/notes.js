const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')


/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */
router.get('/', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes - Fetching all notes`)

  /* 
    TODO-3:
      Fetch all notes from the database
      Return an array of note objects

      Your return object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
  

    // Your code here...

  const notes = []; // this is the response object, make sure to replace with actual value
    
  // query to fetch all notes from table
  db.query(`SELECT * FROM tb_notes`, function(err, results) {

    if (err) {

      // Upon fail, run the following line to respond with an error
      console.log(err.message);          
      // --- begin of fail flow ---
      res.status(500).send('Fail to query');
      // --- end of fail flow ---          

    }else{

      // Upon succ, run the following lines to validate the response object and respond to client

      // replacing response object with actual values
      const notes = JSON.parse(JSON.stringify(results));
      
      // --- begin of succ flow ---
      if (!validateNoteArray(notes)){     
        res.status(500).send('Invalid data type');
      }else{
        res.send({ notes });                 
      }
        // --- end of succ flow ---

    }          

  });
          
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-7 - Search Notes -------------------------- */
router.get('/search/:searchKey', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes/search - Searching notes`)

  /*
    TODO-7:
      Given a search key
      Fetch all notes from the database that contains the search key in the note content
      Return an array of matching note objects

      Search key is sotred in variable searchKey

      Your notes object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
  const searchKey = req.params.searchKey;
  console.log(searchKey);
  
  // Your code here...

  const notes = [];      // this is the response object, make sure to replace with actual value 

  // fetch all records from table where search key is present in note content
  db.query(`SELECT * FROM tb_notes WHERE text LIKE "%` +searchKey+ `%"`, function(err, results){

    if(err){

      // Upon fail, run the following line to response with error
      console.log(err);
      // --- begin of fail flow ---
      res.status(500).send('Fail to query')
      // --- end of fail flow ---

    }else{
            
      // Upon succ, run the following lines to validate the response object and respond to client      

      // replacing response object with actual values
      const notes = JSON.parse(JSON.stringify(results));

      // --- begin of succ flow ---
      if (!validateNoteArray(notes)) {
        res.status(500).send('Invalid data type')
      }
      res.send({ notes })
      // --- end of succ flow ---
      
    }

  }); 

})
/* -------------------------------------------------------------------------- */

/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/notes - Deleting all notes`)

  /*
    TODO-8:
      Delete all notes from the database
  */

  
  // Your code here...
  
  // query to delete all notes from the table
  db.query(`TRUNCATE tb_notes`, function(err, result) {

    if(err){

      // Upon fail, run the following line to respond with an error
      console.log(err);
      // --- begin of fail flow ---
      res.status(500).send('Fail to delete');
      // --- end of fail flow ---

    }else{

      // Upon succ, run the following lines to validate the response object and reponse to client
      // --- begin of succ flow ---
      res.send();
      // --- end of succ flow ---

    }
    
  });
})
/* -------------------------------------------------------------------------- */

module.exports = router;
