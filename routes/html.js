const path = require('path');
const router = require('express').Router();


// Jerrod Linderman helped me with this code.
router.get('/notes', function(req, res){
  res.sendFile(path.join(__dirname, '../public/notes.html'))
});

router.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '../public/index.html'))
});



module.exports = router;