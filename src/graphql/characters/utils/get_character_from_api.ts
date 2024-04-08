// file for fetching data from the api and updating the database with the fetched data

import axios from 'axios';
import { ICharacterAttributes } from '../config/database/models/Characters.model';
import { characterService } from '../services/character.service';

const scriptToModelDatabase = (data: any) => {
    const results = [];

    for (const character of data) {
        results.push({
            name: character.name,
            status: character.status,
            species: character.species,
            gender: character.gender,
            origin: {
                name: character.origin.name,
                url: character.origin.url,
            },
            location: {
                name: character.location.name,
                url: character.location.url,
            },
        });

        return results;
    }
}


export const getCharactersFromApi = async () => {
    const url = 'https://rickandmortyapi.com/api/character';
    try {
        const response = await axios.get(url);
        return scriptToModelDatabase(response.data.results) as ICharacterAttributes[];
    } catch (error) {
        return []
    }

}


export const getCharacterByQuery = async (query: any) => {
    try {


        query = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');

        const url = `https://rickandmortyapi.com/api/character/?${query}`;
        const response = await axios.get(url);

        return scriptToModelDatabase(response.data.results) as ICharacterAttributes[];
    } catch (error) {
        return []
    }
}

export const updateCharacter = async () => {
    try {
        const characters = await getCharactersFromApi();
        for (const character of characters) {
            characterService.updateCharacter(character.name, character);
        }

    } catch (error) {
        console.error('Error updating characters:', error);
    }
}