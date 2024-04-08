
import { characterResolver } from "./characters/resolvers/character.resolver";

import { typeCharacterDef } from './characters/typeDefs/characters.graphql'


const resolvers = {
    Query: {
        ...characterResolver.Query
    }
}
const typeDefs = [typeCharacterDef]

export { typeDefs, resolvers };