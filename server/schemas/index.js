export const typeDefs = `#graphql
    type Book {
        id: ID!
        name: String!
        genre: String
        description: String
        publicationDate: String
        author: Author
        publisher: Publisher
        isbn: String
        price: Float
        stockQuantity: Int
        coverImage: String
    }

    type Author {
        id: ID!
        name: String!
        age: Int
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
            description: String,
            publicationDate: String,
            authorId: ID!,
            publisherId: ID!,
            isbn: String,
            price: Float,
            stockQuantity: Int,
            coverImage: String
        ): Book

        addAuthor(
            name: String!,
            age: Int
        ): Author

        addPublisher(
            name: String!,
            location: String
        ): Publisher
    }
`;
