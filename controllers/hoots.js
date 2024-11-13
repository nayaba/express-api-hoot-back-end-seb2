const express = require('express')
const verifyToken = require('../middleware/verify-token')
const Hoot = require('../models/hoot')
const router = express.Router()

// ========= Public Routes ===========


// ======= Protected Routes ==========
router.use(verifyToken)

// CREATE HOOT
router.post('/', async (req, res) => {
    try {
        req.body.author = req.user._id
        const hoot = await Hoot.create(req.body)
        hoot._doc.author = req.user
        res.status(201).json(hoot)
    } catch (error) {
        res.status(500).json(error)
    }
})

// INDEX - GET ALL THE HOOTS
router.get('/', async (req, res) => {
    try {
        const hoots = await Hoot.find({}).populate('author').sort({ createdAt: 'desc' })
        res.status(200).json(hoots)
    } catch (error) {
        res.status(500).json(error)
    }
})


// SHOW - GET ONE HOOT
router.get('/:hootId', async (req, res) => {
    try {
        const hoot = await Hoot.findById(req.params.hootId).populate('author')
        res.status(200).json(hoot)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router