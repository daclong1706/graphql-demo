export const typeDefs = `#graphql
    type Book {
        id: ID!
        name: String!
        genre: String
        author: Author
        publisher: Publisher
        coverImage: String
        description: String
    }

    type Author {
        id: ID!
        name: String!
        yearOfBirth: Int
        books: [Book]
    }

    type Publisher {
        id: ID!
        name: String!
        location: String
        books: [Book]
    }

    type Query {
        books: [Book]
        book(id: ID!): Book
        authors: [Author]
        author(id: ID!): Author
        publishers: [Publisher]
        publisher(id: ID!): Publisher
    }

    type Mutation {
        addBook(
            name: String!,
            genre: String,
            authorId: ID!,
            publisherId: ID!,
            coverImage: String
            description: String
        ): Book

        addAuthor(
            name: String!,
            yearOfBirth: Int
        ): Author

        addPublisher(
            name: String!,
            location: String
        ): Publisher

        updateBook(
            id: ID!,
            name: String,
            genre: String,
            authorId: ID,
            publisherId: ID,
            coverImage: String
            description: String
        ): Book

        updateAuthor(
            id: ID!,
            name: String,
            yearOfBirth: Int
        ): Author

        updatePublisher(
            id: ID!,
            name: String,
            location: String
        ): Publisher

        deleteBook(id: ID!): Book
        deleteAuthor(id: ID!): Author
        deletePublisher(id: ID!): Publisher

    }
`;
