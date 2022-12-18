const { Router } = require("express");
const { shopController } = require("../controllers");
const { isLoggedIn, isAdmin } = require("../middlewares");

const shopRouter = Router();
const shopAdminRouter = Router();

shopRouter.get("/", shopController.getAll);
shopRouter.get("/:shopId", shopController.getByShopId);

shopRouter.use("/admin", isLoggedIn, isAdmin, shopAdminRouter);

shopAdminRouter.post("/", shopController.create);
shopAdminRouter.patch("/:shopId", shopController.update);
shopAdminRouter.delete("/:shopId", shopController.delete);

module.exports = { shopRouter };
