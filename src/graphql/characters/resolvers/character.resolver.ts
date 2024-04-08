import { characterService, IQueryCharacters } from '../services/character.service';

export const characterResolver = {
    Query: {
        async getCharacters() {
            const resolver_data = await characterService.getCharacters();
            return resolver_data;
        },
        async getCharacter(_: any, { id }: { id: string }) {
            const resolver_data = await characterService.getCharacterById(id);
            return resolver_data;
        },
        async queryCharacters(_: any, { query }: { query: IQueryCharacters }) {
            const resolver_data = await characterService.queryCharacters(query);
            return resolver_data;
        }
    }
}
