import { Router } from "express";
const router = Router();
import projectModel from "../models/project.model";
import ControllerFactory from "../controllers/factory.controller";
const projectCtrlFactory = new ControllerFactory(projectModel);
import validationMw from "../middlewares/validation.mw";
import roleAuthMw from "../middlewares/role-auth.mw";
import checkPermissionsMw from "../middlewares/check-permissions.mw";

// Parent 1 // get  post
router
  .route("/")
  .post(
    checkPermissionsMw("create", "project"),
    (req, res, next) => validationMw(next, ["addProject", req.body]),
    projectCtrlFactory.create
  )
  .get(checkPermissionsMw("read", "project"), projectCtrlFactory.getAll(""));

router
  .route("/search")
  .post(
    checkPermissionsMw("search", "project"),
    projectCtrlFactory.search("", ["employeesNumber"])
  );

router
  .route("/options")
  .get(checkPermissionsMw("options", "project"), projectCtrlFactory.getOptions);

// 2 patch  get  delete
router
  .route("/:id")
  .all((req, res, next) => validationMw(next, ["mongoId", req.params.id]))
  .get(
    checkPermissionsMw("readID", "project"),
    projectCtrlFactory.getById("id")
  )
  .patch(
    checkPermissionsMw("update", "project"),
    (req, res, next) => validationMw(next, ["updateProject", req.body]),
    projectCtrlFactory.updateById("id")
  )
  .delete(
    checkPermissionsMw("delete", "project"),
    projectCtrlFactory.deleteById("id")
  );

export default router;
