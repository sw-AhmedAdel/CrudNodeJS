import { Router } from "express";
const router = Router();
import departmentModel from "../models/departmen.model";
import ControllerFactory from "../controllers/factory.controller";
const departmentCtrlFactory = new ControllerFactory(departmentModel);
import validationMw from "../middlewares/validation.mw";
import roleAuthMw from "../middlewares/role-auth.mw";
import checkPermissionsMw from "../middlewares/check-permissions.mw";

// Parent 1 // get  post
router
  .route("/")
  .post(
    checkPermissionsMw("create", "department"),
    (req, res, next) => validationMw(next, ["addDepartment", req.body]),
    departmentCtrlFactory.create
  )
  .get(
    checkPermissionsMw("read", "department"),
    departmentCtrlFactory.getAll("")
  );

router
  .route("/search")
  .post(
    checkPermissionsMw("search", "department"),
    departmentCtrlFactory.search("", ["employeesNumber"])
  );

router
  .route("/options")
  .get(
    checkPermissionsMw("options", "department"),
    departmentCtrlFactory.getOptions
  );

// 2 patch  get  delete
router
  .route("/:id")
  .all((req, res, next) => validationMw(next, ["mongoId", req.params.id]))
  .get(
    checkPermissionsMw("readID", "department"),
    departmentCtrlFactory.getById("id")
  )
  .patch(
    checkPermissionsMw("update", "department"),
    (req, res, next) => validationMw(next, ["updateDepartment", req.body]),
    departmentCtrlFactory.updateById("id")
  )
  .delete(
    checkPermissionsMw("delete", "department"),
    departmentCtrlFactory.deleteById("id")
  );

export default router;
