const express = require('express');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Cocktail = require("../models/Cocktail");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get("/", async (req, res, next) => {
    try {
        const role = req.get('Role');

        const query = {};
        if (role === 'anon' || role === 'user') {
            query.is_published = true;
            const cocktails = await Cocktail.find(query);
            return res.send(cocktails);
        }

        if (role === 'admin') {
            const cocktails = await Cocktail.find();
            return res.send(cocktails);
        }

    } catch(e) {
        next(e);
    }
});

router.get("/myCocktails", auth, async (req, res, next) => {
    try {
        const cocktails = await Cocktail.find({user: req.user._id});
        return res.send(cocktails);
    } catch(e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);
        return res.send(cocktail);
    } catch(e) {
        next(e);
    }
});


router.post('/:id/publish', auth, permit('admin'), async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);
        cocktail.is_published = true;
        cocktail.save();
        return res.send({message: 'OK!'});
    } catch (e) {
        next(e);
    }
});

router.post("/", auth, upload.single('image'), async (req, res, next) => {
    try {
        const cocktailData = {
            user: req.user._id,
            name: req.body.name,
            recipe: req.body.recipe,
            image: null,
            is_published: false,
            ingredients: JSON.parse(req.body.ingredients)
        };

        if (req.file) {
            cocktailData.image = req.file.filename;
        }

        if (req.user.role === 'admin') {
            cocktailData.is_published = true
        }

        const cocktail = new Cocktail(cocktailData);
        await cocktail.save();
        return res.send(cocktail);
    } catch(e) {
        next(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        await Cocktail.deleteOne({_id : req.params.id});
        return res.send({message: 'OK!'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
