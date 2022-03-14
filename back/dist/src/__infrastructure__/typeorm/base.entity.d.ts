export declare class BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    version: number;
    constructor(partial?: Partial<BaseEntity>);
}
