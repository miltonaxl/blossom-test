// file for initializing the database with default values 
import { ICharacterAttributes } from '../config/database/models/Characters.model';
import { characterService } from '../services/character.service';
import { getCharactersFromApi } from './get_character_from_api';

export const initializeApp = async () => {
    // Check if there are any characters in the database
    const existingCharacters = await characterService.getCharacters();

    // If there are no characters, create one (assuming default character data)
    if (existingCharacters.length === 0) {
        try {
            const defaultCharacter = await getCharactersFromApi();

            await characterService.bulkCreateCharacters(defaultCharacter);
            console.log('Default character created successfully.');
        } catch (error) {
            console.error('Error creating default character:', error);
        }
    }
};

