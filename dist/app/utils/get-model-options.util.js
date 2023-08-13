"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model) => {
    const schemaPaths = model.schema.paths;
    const attributes = [];
    for (const path in schemaPaths) {
        if (schemaPaths.hasOwnProperty(path) && path != "_id" && path !== "__v") {
            attributes.push({
                name: path,
                type: schemaPaths[path].instance.toLocaleLowerCase(),
                options: model.schema.obj[path]?.options,
            });
        }
    }
    return attributes;
};
//# sourceMappingURL=get-model-options.util.js.map