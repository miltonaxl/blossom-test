export const typeCharacterDef = `#graphql

type Location {
    name: String
    url: String
  }

  type Origin {
    name: String
    url: String
  }
  
  type Character {
    id: ID
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin: Origin
    location: Location
  }

  input QueryCharacters {
    name: String
    status: String
    species: String
    gender: String
    origin_name: String
  }

  type Query {
    getCharacters: [Character]
    getCharacter(id: ID!): Character
    queryCharacters(query: QueryCharacters): [Character]
  }
`;