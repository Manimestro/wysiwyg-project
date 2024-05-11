import { MongoClient } from 'mongodb';

let client;

export const initializeDbConnection = async () => {
    try{
        client = await MongoClient.connect(`${process.env.API_MONGO_LOCATION}://${process.env.API_MONGO_USER}:${process.env.API_MONGO_PASS}`
        +`@${process.env.API_MONGO_URI}/${process.env.API_DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("You successfully connected to MongoDB!");

}catch(err){
        console.log("Failed to connect MongoDB!",err);

    }

}


export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}