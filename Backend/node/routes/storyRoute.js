const express = require("express")
const imageupload = require("../utils/lib/imageUpload");

const { addStory, getAllStories, detailStory, likeStory, editStory, deleteStory, editStoryPage } = require("../controllers/storyController");
const { checkStoryExist, checkUserAndStoryExist } = require("../middlewares/database/databaseErrorhandler");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/addstory", [isAuthenticatedUser, imageupload.single("image")], addStory)


router.post("/:slug", checkStoryExist, detailStory)

router.post("/:slug/like", [isAuthenticatedUser, checkStoryExist], likeStory)

router.get("/editStory/:slug", [isAuthenticatedUser, checkStoryExist], editStoryPage)

router.put("/:slug/edit", [isAuthenticatedUser, checkStoryExist, imageupload.single("image")], editStory)

router.delete("/:slug/delete", [isAuthenticatedUser, checkStoryExist], deleteStory)

router.get("/getAllStories", getAllStories)


module.exports = router