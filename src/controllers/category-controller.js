const { categoryService } = require("../services");

class CategoryController {
  async create(req, res, next) {
    const { name } = req.body;

    try {
      const addedCategory = await categoryService.create({
        name,
      });
      return res.status(200).json(addedCategory);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const categoryList = await categoryService.getAll();
      return res.status(200).json(categoryList);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;

      const updatedCategory = await categoryService.update(name, categoryId);

      return res.status(200).json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { categoryId } = req.params;
      const deletedCategory = await categoryService.deleteById(categoryId);
      res.status(200).json(deletedCategory);
    } catch (e) {
      next(e);
    }
  }
}

const categoryController = new CategoryController();

module.exports = { categoryController };
