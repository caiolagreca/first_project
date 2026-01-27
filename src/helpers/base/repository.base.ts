import { RootFilterOperators, UpdateOptions } from "mongodb";
import { DeleteResult } from "mongoose";
import { QueryOptions } from "mongoose";
import { Model, MongooseUpdateQueryOptions, PipelineStage, ProjectionType, Schema, UpdateQuery, Document, UpdateWriteOpResult } from "mongoose";

export class RepositoryBase<T> {
    
    private _model: Model<T>;
    
    public get model(): Model<T> {
        return this._model;
    }

    constructor(model: Model<T>) {
        this._model = model;
    }

    public checkAdmin(config?: any): void {
        
        if (!config?.isAdmin)
            throw new Error('REPO_AUTH_DENIED');
    }

    async findById<T>(id: string, project?: ProjectionType<T>): Promise<T | undefined> {
        project = project || { __v: 0 };

        const result = await this.model.findById(id, project).exec() as any;
        return result;
    }

    public count(filter: any): Promise<number> {
        return this.model.countDocuments(filter).exec();
    }
      
    public async find<D>(filter: any, project?: ProjectionType<T>, options?: { sort?: any, skip?: any, limit?: any }): Promise<D[]> {
        
        project = project || { __v: 0 };

        let find = this._model.find(filter, project);
        if (options?.sort) {
            find = find.sort(options?.sort);
        }

        if (options?.skip) {
            find = find.skip(options?.skip);
        }

        if (options?.limit) {
            find = find.limit(options?.limit);
        }

        const result = await find.exec();
        const json = result.map(item => item.toJSON());
        return json as D[];
    }

    public async findOne<D>(filter: any, project?: ProjectionType<T>): Promise<D | undefined> {
        
        project = project || { __v: 0 };

        const result = await this._model.findOne(filter, project).exec();
        const json = result?.toJSON();
        return json as D | undefined;
    }
    
    public async create<D>(data: any): Promise<D> {
        const result = await this._model.create(data);
        const json = result?.toJSON();
        return json as D;
    }

    public async updateOne<D>(filter: any, data: UpdateQuery<T>, options?: MongooseUpdateQueryOptions<T>): Promise<UpdateWriteOpResult> {
        return this._model.updateOne(filter, data, options).exec();
    }

    public async findOneAndUpdate<D>(filter: any, data: UpdateQuery<T>, options?: QueryOptions<T>): Promise<D | undefined> {
        const result = await this._model.findOneAndUpdate(filter, data, options).exec();
        const json = result?.toJSON();
        return result as D | undefined;
    }

    public async updateMany<D>(filter: any, data: UpdateQuery<T>, options?: MongooseUpdateQueryOptions<T>): Promise<UpdateWriteOpResult> {
        const result = await this._model.updateMany(filter, data, options).exec();
        return result as any;
    }

    public async deleteOne<D>(filter: any): Promise<DeleteResult> {
        const result = await this._model.deleteOne(filter).exec();
        return result;
    }

    public async findOneAndDelete<D>(filter: any): Promise<D | undefined> {
        const result = await this._model.findOneAndDelete(filter).exec();
        return result as D | undefined;
    }
    

    public async deleteMany(filter: any): Promise<any> {
        const result = await this._model.deleteMany(filter).exec();
        return result;
    }

    
    public async aggregate<D>(pipeline: PipelineStage[]): Promise<D[]> {
        const result = await this._model.aggregate(pipeline).exec();
        // const json = result.map(item => item.toJSON());
        return result as D[];
    }
}
