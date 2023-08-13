import { Request, Response, NextFunction } from "express";
import { AbilityBuilder, Ability } from "@casl/ability";

async function buildUserAbilities(permissions: string[]) {
  const { can, build } = new AbilityBuilder(Ability);
  permissions.forEach((permission) => {
    const [action, subject] = permission.split(":"); //  [manage , user ]
    can(action, subject);
  });

  return build();
}

export default (action: string, subject: string) => {
  {
    return async (req: Request, res: Response, next: NextFunction) => {
      const ability = await buildUserAbilities(req.user.permissions);
      if (!ability.can(action, subject)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    };
  }
};
