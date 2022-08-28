import express, { Express, Request, Response } from 'express';
import {graphqlHTTP} from 'express-graphql'
import {buildSchema} from 'graphql'

const app: Express = express()

const schema = buildSchema(`
    type Query {
        name: String
        age: Int
        cards: [Card]
        card(category: String): Card
    }
    type Card {
        category: String
        isValid: Boolean
    }
`)

interface ICard {
    category: string,
    isValid: boolean,
}

const cards: ICard[] = [
    {category: 'Bank Card', isValid: true},
    {category: 'Shopping Card', isValid: false},
]

const rootValue = {
    name() {
        return 'Tom'
    },
    age() {
        return 6
    },
    cards() {
        return cards
    },
    card({category}: ICard) {
       return cards.find(item => item.category === category)
    }
}

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    rootValue,
}))

app.listen(3001, () => {
    console.log('server started on 3001')
})
