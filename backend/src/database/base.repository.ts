import {
  Attributes,
  FindAndCountOptions,
  FindOptions,
  WhereOptions,
} from 'sequelize';
import { Model, Repository } from 'sequelize-typescript';
import { FIRST_PAGE, LIMIT_PAGE } from 'src/constants';

import { IPaginationRes } from '../interfaces';

export class BaseRepository<T extends Model> {
  constructor(readonly model: Repository<T>) {}

  async find(options?: FindOptions<T>): Promise<T[]> {
    return this.model.findAll(options);
  }

  async findOne(options?: FindOptions<T>): Promise<T> {
    return this.model.findOne(options);
  }

  async findById(id: number, options?: FindOptions<T>): Promise<T> {
    return this.model.findByPk(id, options);
  }

  async paginate(
    options?: WhereOptions<T>,
    page = FIRST_PAGE,
    limit = LIMIT_PAGE,
    opts?: FindOptions<T>,
  ): Promise<IPaginationRes<T>> {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.rawPaginate({
      where: { ...options },
      offset,
      limit,
      ...opts,
    });

    return {
      items: rows,
      total: count,
      page,
      limit,
    } as IPaginationRes<T>;
  }

  async rawPaginate(options: FindAndCountOptions): Promise<{
    rows: T[];
    count: number;
  }> {
    return await this.model.findAndCountAll(options);
  }

  async create(entity: Attributes<T>): Promise<T> {
    return this.model.create(entity);
  }

  async update(entity: Attributes<T>, conditions: WhereOptions<T>) {
    const [affectedCount, affectedRows] = await this.model.update(entity, {
      where: { ...conditions },
      returning: true,
    });
    return affectedRows;
  }

  async delete(conditions: WhereOptions<T>): Promise<number> {
    return this.model.destroy({ where: conditions });
  }

  async raw(query: string) {
    return this.model.sequelize.query(query);
  }

  getModel(): Repository<T> {
    return this.model;
  }
}
