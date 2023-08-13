"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ability_1 = require("@casl/ability");
async function buildUserAbilities(permissions) {
    const { can, build } = new ability_1.AbilityBuilder(ability_1.Ability);
    permissions.forEach((permission) => {
        const [action, subject] = permission.split(":"); //  [manage , user ]
        can(action, subject);
    });
    return build();
}
exports.default = (action, subject) => {
    {
        return async (req, res, next) => {
            const ability = await buildUserAbilities(req.user.permissions);
            if (!ability.can(action, subject)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        };
    }
};
//# sourceMappingURL=check-permissions.mw.js.map