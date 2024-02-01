const express = require("express")

const { createContact, enterPriseEmail } = require('../controllers/contactController')


const router = express.Router();


router.post("/contact", createContact)
router.post("/enterprise/email", enterPriseEmail)

module.exports = router