"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (label, options) => {
    const fieldOptions = {
        label,
        control: "input",
        controlType: "text",
        required: true,
        ...options,
        validation: options.validation,
    };
    return fieldOptions;
};
//# sourceMappingURL=options-generator.util.js.map