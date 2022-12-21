import { Model } from 'objection';
import UserDbModel from './UserDb.model';

export default class MagicLinkDbModel extends Model {
    public id!: number;
    public user_id!: number;
    public ref_id!: string;
    public token!: string;
    public logged_at!: Date;
    public confirmed_at!: Date | null;
    public expire_at!: Date;
    public created_at!: Date;
    public updated_at!: Date;

    static tableName = 'magic_links';

    /**
     * default values
     */
    $beforeInsert (): void {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate (): void {
        this.updated_at = new Date();
    }

    public user!: UserDbModel;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    static relationMappings = () => ({
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserDbModel,
            join: {
                from: 'magic_links.user_id',
                to: 'users.id'
            }
        }
    });
}
