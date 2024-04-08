// file for initializing the model and database connection

import { Model, DataTypes, Optional } from 'sequelize';
import { v4 as uuid } from 'uuid';
import { sequelizeConnection } from '../connection';

interface IOriginAttributes {
    name?: string;
    url?: string;
}

interface ILocationAttributes {
    name?: string;
    url?: string;
}

export interface ICharacterAttributes {
    id: string;
    name: string;
    status: 'Alive' | 'Dead' | 'Unknown';
    species: string;
    type?: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'Unknown';
    origin?: IOriginAttributes;
    location?: ILocationAttributes;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CharacterCreationAttributes extends Optional<ICharacterAttributes, 'id'> { }

class Character extends Model<ICharacterAttributes, CharacterCreationAttributes> {
    public id!: string;
    public name!: string;
    public status!: 'Alive' | 'Dead' | 'Unknown';
    public species!: string;
    public type!: string;
    public gender!: 'Unknown' | 'Female' | 'Male' | 'Genderless';
    public origin!: IOriginAttributes;
    public location!: ILocationAttributes;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static generateId(): string {
        return uuid();
    }
}

Character.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Character.generateId,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Alive', 'Dead', 'Unknown'),
        allowNull: false
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('Unknown', 'Female', 'Male', 'Genderless'),
        allowNull: false
    },
    origin: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    location: {
        type: DataTypes.JSONB,
        allowNull: true
    },
}, {
    sequelize: sequelizeConnection,
    modelName: 'Character',
    tableName: 'characters',
    timestamps: true
});

export const CharacterModel = Character;
