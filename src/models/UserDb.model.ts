import { Model } from 'objection';

export default class UserDbModel extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    static tableName = 'users';
}
