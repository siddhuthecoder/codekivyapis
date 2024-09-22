const express = require('express');
const router = express.Router();


//test route
router.get("/test",(req,res) => {
    res.send("test");
});


module.exports = router;