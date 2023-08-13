import { Model, Document, QueryOptions, FilterQuery } from "mongoose";
class ServiceFactory<T extends Document | any> {
  constructor(private Model: Model<T>) {
    this.Model = Model;
  }
  create = (data: any) => {
    return new this.Model(data).save();
  };
  getAll = (projection = "", criteria = {}) => {
    return this.Model.find(criteria).select(projection);
  };
  getById = (id: string) => {
    return this.Model.findById(id);
  };
  updateById = (id: string, data: any) => {
    return this.Model.findByIdAndUpdate(id, data, { new: true });
  };
  deleteById = (id: string) => {
    return this.Model.findByIdAndDelete(id).select("_id");
  };
  findAllBagAndSort = async (input: {
    query: { [k: string]: any };
    criteria?: FilterQuery<any>;
    projection?: string;
  }) => {
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
export default ServiceFactory;
