let MongoMemoryServer = require('mongodb-memory-server').default;
const mongoose = require('mongoose');

const mongod = new MongoMemoryServer();

module.exports =  {
    connect: async () => {
        const uri = await mongod.getUri();
        const mongooseOpts = {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
        };

        await mongoose.connect(uri, mongooseOpts);
    },
    close: async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop();
    },
    clear: async () => {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
};

