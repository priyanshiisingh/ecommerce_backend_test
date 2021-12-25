import express from "express";
import Category from "../services/mongodb/models/Category";
import { body, validationResult } from "express-validator";

const router = express.Router();

/*
type : GET
path : /api/v1/auth/category/all 
params: none
isProtected : false (PUBLIC ROUTE) 
*/

router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ categories, message: "categories fetched successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ category: [], message: "can't fetch categories" });
  }
});

/*
type : POST
path : /api/v1/auth/category/all 
params: none
isProtected : true (true) (private) 
*/

router.post(
  "/add",
  body("name").isLength({ min: 1 }),
  body("description").isLength({ min: 10 }),

  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0)
      return res.status(403).json({ errors, message: "Bad request" });

    try {
      const { name, description } = req.body;
      const category = new Category({
        name,
        description,
      });
      await category.save();

      res.status(200).json({ category, message: "Saved category" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ category: null, message: "Unable save category" });
    }
  }
);

/*
type : PUT
path : /api/v1/category/update/:id
params : id
isProtected: private (admin)
*/

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      category,
      message: "Updated category in DB",
    });
  } catch (error) {
    return res.status(500).json({
      category: null,
      message: "Unable to update category in DB",
    });
  }
});

/*
type : DELETE
path : /api/v1/category/delete/:id
params : id
isProtected: private (admin)
*/

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndRemove(id);
    res.status(200).json({
      category,
      message: "deleted category in DB",
    });
  } catch (error) {
    return res.status(500).json({
      category: null,
      message: "Unable to delete category in DB",
    });
  }
});

export default router;
