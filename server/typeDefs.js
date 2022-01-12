import {gql} from 'apollo-server-express'

const typeDefs=gql`
   
    scalar Date
    type Todo{
        id:ID,
        baslik:String,
        aciklama:String,
        tarih:Date
    }

    type Query{
        merhaba:String,
        todolarGetir:[Todo],
        todoGetir(id:ID):Todo
    }


    type Mutation{
        todoEkle(baslik:String,aciklama:String,tarih:Date):Todo
        todoSil(id:ID):String
        todoGuncelle(id:ID,baslik:String,aciklama:String,tarih:Date):Todo
    }


`

export default typeDefs