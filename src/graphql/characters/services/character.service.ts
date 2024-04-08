import { redisService } from './../config/database/redis';
import { CharacterModel, ICharacterAttributes } from '../config/database/models/Characters.model';
import { getCharacterByQuery } from './../utils/get_character_from_api';


export interface IQueryCharacters {
    status?: string;
    species?: string
    gender?: string;
    name?: string;
    origin_name?: string;
}

export interface ICharacterService {
    getCharacters(): Promise<ICharacterAttributes[]>;
    getCharacterById(id: string): Promise<ICharacterAttributes | null>;
    createCharacter(character: ICharacterAttributes): Promise<ICharacterAttributes>;
    queryCharacters(query: any): Promise<ICharacterAttributes[]>;
}



class CharacterService implements ICharacterService {

    async getCharacters(): Promise<ICharacterAttributes[]> {
        const cachedData = await redisService.get('characters');

        if (cachedData) {
            return cachedData;
        } else {
            const result = await CharacterModel.findAll();
            await redisService.set('characters', result);
            return result;
        }
    }

    async getCharacterById(id: string): Promise<ICharacterAttributes | null> {
        const cacheKey = `character:${id}`;
        const cachedData = await redisService.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const result = await CharacterModel.findByPk(id);
        if (result) {
            await redisService.set(cacheKey, result);
        }

        return result;

    }
    async bulkCreateCharacters(characters: ICharacterAttributes[]): Promise<ICharacterAttributes[]> {
        return CharacterModel.bulkCreate(characters);
    }

    async createCharacter(character: ICharacterAttributes): Promise<ICharacterAttributes> {
        return CharacterModel.create(character);
    }

    async queryCharacters(query: IQueryCharacters): Promise<ICharacterAttributes[]> {

        const cacheKey = JSON.stringify(query);
        const cachedData = await redisService.get(cacheKey);

        console.log(" TYPEOF ", typeof cachedData, " CACHED DATA ", cachedData)


        if (cachedData && cachedData !== null && cachedData.length > 0) {
            return cachedData;
        } else {
            const whereConditions: any = {};

            if (query?.status) {
                whereConditions.status = query.status;
            }
            if (query?.species) {
                whereConditions.species = query.species;
            }
            if (query?.gender) {
                whereConditions.gender = query.gender;
            }
            if (query?.name) {
                whereConditions.name = query.name;
            }
            if (query?.origin_name) {
                whereConditions['origin.name'] = query.origin_name;
            }

            const result = await CharacterModel.findAll({ where: whereConditions });
            if (result) {
                await redisService.set(cacheKey, result);
            }


            if (!result || result.length === 0) {
                const result = await getCharacterByQuery(query);
                await this.bulkCreateCharacters(result);
                await redisService.set(cacheKey, result);

                return result;

            }
            return result;
        }
    }

    async updateCharacter(name: string, character: ICharacterAttributes): Promise<ICharacterAttributes | null> {
        const result = await CharacterModel.update(character, { where: { name } });
        if (result) {
            return CharacterModel.findOne({ where: { name } });
        }
        return null;
    }
}

export const characterService = new CharacterService();