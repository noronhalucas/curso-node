import multer from "multer";
import UploadConfig from "./config/multer";
import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RemoveUserController } from "./controllers/user/RemoveUserControler";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { EditCategoryController } from "./controllers/category/EditCategoryController";
import { ListCategoryController } from "./controllers/category/ListcategoryController";
import { RemoveCategoryController } from "./controllers/category/RemoveCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { EditProductController } from "./controllers/product/EditProductController";
import { ListProductController } from "./controllers/product/ListProductController";
import { RemoveProductController } from "./controllers/product/RemoveProductController";
import { SaleProductController } from "./controllers/sale/SaleProductController";

const router = Router();
const upload = multer(UploadConfig.upload("./tmp"));
router.get("/test", (req: Request, res: Response) => {
    return res.json({ ok: true });
});

//USER ROUTES
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.delete("/user/remove", new RemoveUserController().handle);

//CATEGORY ROUTES
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.put("/category/edit", isAuthenticated, new EditCategoryController().handle);
router.get("/category/all", isAuthenticated, new ListCategoryController().handle);
router.delete("/category/remove", isAuthenticated, new RemoveCategoryController().handle);

//PRODUCT ROUTES
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);
router.put("/product/edit", isAuthenticated, upload.single("file"), new EditProductController().handle);
router.get("/products", isAuthenticated, new ListProductController().handle);
router.delete("/product/delete", isAuthenticated, new RemoveProductController().handle);

//SALE PRODUCT
router.put("/sale/product", isAuthenticated, new SaleProductController().handle);

export { router };
