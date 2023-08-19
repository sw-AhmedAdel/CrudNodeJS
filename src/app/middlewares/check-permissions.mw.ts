import { Request, Response, NextFunction } from "express";
import { AbilityBuilder, createMongoAbility } from "@casl/ability";

async function buildUserAbilities(permissions: string[]): Promise<any> {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  permissions.forEach((permission) => {
    const [action, subject, ...fields] = permission
      .split(":")
      .map((field) => field.trim());

    if (fields.length > 0) {
      can(action, subject, fields);
    } else {
      can(action, subject);
    }
  });
  //  "update:user:firstName:lastName", "read:user"
  // can(update , user , [firstName , lastName])
  // can (read , user)
  return build();
}

function hasPermission(
  ability: any,
  action: string,
  subject: string,
  fields: string[]
): boolean {
  // find what abilit he has in the end point that he wants to access like the below
  //"update:user:firstName:lastName", "read:user"
  //"update:project:name
  const getAbility = ability.rules.find(
    (rule: any) => rule.action === action && rule.subject === subject
  );

  // manage: subject
  if (!getAbility) {
    return ability.can(action, subject);
  } else if (!getAbility.fields) {
    // can (update , user , [firstName , lastName]) compare [firstName , lastName] with req.body
    return ability.can(action, subject);
  } else {
    // can (update , user , [firstName , lastName]) compare [firstName , lastName] with req.body
    return fields.every((field) => ability.can(action, subject, field));
  }
}

export default (action: string, subject: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { permissions } = req.user;
      const fields = Object.keys(req.body);

      const ability = await buildUserAbilities(permissions);
      const hasAbility = hasPermission(ability, action, subject, fields);

      if (!hasAbility) {
        return res.status(401).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

/*
async function buildUserAbilities(permissions: string[]) {
  const { can, build } = new AbilityBuilder(createMongoAbility);
  permissions.forEach((permission) => {
    const [action, subject, ...fields] = permission
      .split(":")
      .map((field) => field.trim());
    if (fields.length > 0) {
      can(action, subject, fields);
    } else {
      can(action, subject);
    }
  });
  //  "update:user:firstName:lastName", "read:user"
  // can(update , user , [firstName , lastName])
  // can (read , user)
  return build();
}

export default (action: string, subject: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ability = await buildUserAbilities(req.user.permissions);
    const fields: string[] = Object.keys(req.body); // firstNme , middleName , email
    let hasAbility: any;
    // find what abilit he has in the end point that he wants to access like the below
    //"update:user:firstName:lastName", "read:user"
    //"update:project:name

    const getAbility = ability.rules.find(
      (rule) => rule.action === action && rule.subject === subject
    );

    // manage: subject
    if (!getAbility) {
      hasAbility = ability.can(action, subject);
    } else {
      // update: user -> subject there is no specific permissions like just firstName
      if (!getAbility.fields) {
        hasAbility = ability.can(action, subject);
      } else {
        // can (update , user , [firstName , lastName]) compare [firstName , lastName] with req.body
        hasAbility = fields.every((field) =>
          ability.can(action, subject, field)
        );
      }
    }

    if (!hasAbility) {
      return res.status(401).json({ message: "Forbidden" });
    }
    next();
  };
};*/
