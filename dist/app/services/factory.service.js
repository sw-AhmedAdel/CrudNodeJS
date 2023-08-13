"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceFactory {
    Model;
    constructor(Model) {
        this.Model = Model;
        this.Model = Model;
    }
    create = (data) => {
        return new this.Model(data).save();
    };
    getAll = (projection = "", criteria = {}) => {
        return this.Model.find(criteria).select(projection);
    };
    getById = (id) => {
        return this.Model.findById(id);
    };
    updateById = (id, data) => {
        return this.Model.findByIdAndUpdate(id, data, { new: true });
    };
    deleteById = (id) => {
        return this.Model.findByIdAndDelete(id).select("_id");
    };
    findAllBagAndSort = async (input) => {
        /**
         * p => page index
         * s => limit
         * total => total documents in db
         *
         */
        const { query, criteria, projection } = {
            criteria: {},
            projection: "",
            ...input,
        };
        const { p = 1, s = 2, sort = "" } = query;
        const total = await this.Model.countDocuments(criteria);
        const pagesCount = Math.ceil(total / s);
        const data = await this.Model.find(criteria)
            .sort(sort)
            .skip(s * (p - 1))
            .limit(s)
            .select(projection);
        return { pagesCount, data, p, s, total };
    };
}
exports.default = ServiceFactory;
//# sourceMappingURL=factory.service.js.map