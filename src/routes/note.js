const express = require('express')
const router = express.Router()
const { validateNote } = require('../utils/validators')

/* ------------------------ TODO-4 - Create New Note ------------------------ */
router.post('/', (req, res) => {
  console.log(`[POST] http://localhost:${global.port}/note - Storing a new note`)

  /*
  	TODO-4:
  		Given node content
  		Create a new node and store the node to the database,
  		Return the newly created note object

  		Note content is stored in variable newText

  		Your return object should be something similar to this:
      	{ id, text, dateCreated, lastModified }
  */
 
  //Your code here...

  // defining variables for storing values of text, date created, and last modified
  const newText = req.body.text;
  const dateCreated = new Date().toISOString().split('T')[0];
  const lastModified = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        
  // query for inserting new note into the table
  db.query(`INSERT INTO tb_notes (text, dateCreated, lastModified) VALUES (?, ?, ?)`, [newText, dateCreated, lastModified], function(err, results, fields) {

    if (err) {
      
      // Upon fail, run the following lines to respond with an error
      console.log(err.message);
      // --- begin of fail flow ---
      res.status(500).send('Fail to insert');
      // --- end of fail flow ---

    }else{

      // query to get values of the newly stored note from the database
      db.query(`SELECT * FROM tb_notes WHERE id = ?`, results.insertId, function(err, returnedResult) {

        if (err) {

          console.log(err.message);
          res.status(500).send('Fail to query');

        }else{
            
          // Upon succ, run the following lines to validate the response object and respond to client

          // this is the response object, make sure to replace with actual value
          const newNote = {id: returnedResult[0].id, text: returnedResult[0].text, dateCreated: returnedResult[0].dateCreated, lastModified: returnedResult[0].lastModified};          
          
          // --- begin of succ flow ---
          if (!validateNote(newNote)) {
            res.status(500).send('Invalid data type')
          }     
          res.status(201).send({ newNote })
          // --- end of succ flow ---

        }

      });

    }  

  });
  
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-5 - Update A Note ------------------------- */
router.put('/', (req, res) => {
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`)

  /*
		TODO-5:
			Given note id and content
			Update the note's content with the given id in the database
			Return the updated note object

			Note id is stored in variable noteId
			Note content is stored in variable newText

			Your return object should be something similar to this:
        { id, text, dateCreated, lastModified }
	*/

  // You code here...
  
  // defining variables for updating values of text and last modified
	const noteId = req.body.id
	const updatedText = req.body.text;
  const lastModified = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

  // query for updating a note in the table based on noteId
  db.query(`UPDATE tb_notes SET text = ?, lastModified = ? WHERE id = ?`, [updatedText, lastModified, noteId], function(err, result){
    
    if (err) {

      // Upon fail, run the following lines to respond with an error
      console.log(err);
      // --- begin of fail flow ---
      res.status(500).send('Fail to update')
      // --- end of fail flow ---

    }else{
      
      // query fetching all newly updated values for the updated note after successful updation to pass to the response object
      db.query(`SELECT * FROM tb_notes WHERE id = ?`, noteId, function(err, returnedResult) {

        if (err) {

          console.log(err.message);
          res.status(500).send('Fail to query');

        }else{
          
          // Upon succ, run the following lines to validate the response object and respond to client

          // defining response object
          const updatedNote = {id: returnedResult[0].id, text: returnedResult[0].text, dateCreated: returnedResult[0].dateCreated, lastModified: returnedResult[0].lastModified};          

          // --- begin of succ flow ---
          if (!validateNote(updatedNote)) {
            res.status(500).send('Invalid data type');
          }else{
            res.send({ updatedNote });            
          }
          // --- end of succ flow ---

        }

      });

    }

  });

})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-6 - Delete A Note ------------------------- */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`)

  /*
	  TODO-6:
      Given a note id
		  Delete note with the given id from the database

		  Note id is stored in variable noteId 
	*/
	const noteId = req.body.id


  // Your code here...


  // query to delete the note with the give noteId from the table
  db.query(`DELETE FROM tb_notes WHERE id = ?`, noteId, function(err, result) {

    if (err){

      // Upon fail, run the following lines to respond with an error
      console.log(err);
      // --- begin of fail flow ---
      res.status(500).send('Fail to delete');
      // --- end of fail flow ---      

    }else{

      // Upon succ, run the following lines to validate the response object and respond to client
      // --- begin of succ flow ---
      res.send();
      // --- end of succ flow ---

    }         

  });
    
})
/* -------------------------------------------------------------------------- */

module.exports = router
