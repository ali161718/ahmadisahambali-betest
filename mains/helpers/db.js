const mongoConnection = require('./connection');
const resMessage = require('./resMessage');

class DB {

    constructor(config) {
        this.config = config;
    }

    setCollection(collectionName) {
        this.collectionName = collectionName
    }

    async getDatabase() {
        const config = this.config.split('/');
        return config[3];
    }

    async insertOne(doc) {

        const dbName = await this.getDatabase();
        const result = await mongoConnection.getConnection(this.config)

        if (result.err) {
            return result
        }

        try {

            const connection = result.data
            const db = connection.db(dbName)
            const collection = db.collection(this.collectionName)

            const recordSet = await collection.insertOne(doc)

            if (!recordSet.acknowledged) {
                return resMessage.error('Failed add data', '500')
            }

            return resMessage.dataRaw(recordSet)

        } catch (err) {

            return resMessage.error(err.message, '500')

        }
    }

    async findOne(query, options) {

        const dbName = await this.getDatabase();
        const result = await mongoConnection.getConnection(this.config)

        if (result.err) {
            return result
        }

        try {

            const connection = result.data
            const db = connection.db(dbName)
            const collection = db.collection(this.collectionName)

            const recordSet = await collection.findOne(query, options)

            if (!recordSet) {
                return resMessage.error('Data not found', '404')
            }

            return resMessage.dataRaw(recordSet)

        } catch (err) {

            return resMessage.error(err.message, '500')

        }
    }

    async updateOne(filter, updateDoc, options) {

        const dbName = await this.getDatabase()
        const result = await await mongoConnection.getConnection(this.config)


        if (result.err) {
            return result
        }

        try {

            const connection = result.data
            const db = connection.db(dbName)
            const collection = db.collection(this.collectionName)

            const recordSet = await collection.updateOne(filter, updateDoc, options)


            if (!recordSet) return resMessage.error('Failed edit data', '400')

            return resMessage.dataRaw(recordSet)

        } catch (error) {

            return resMessage.error(error.message, '500')

        }
    }

    async deleteOne(query) {

        const dbName = await this.getDatabase()
        const result = await mongoConnection.getConnection(this.config)

        if (result.err) return result

        try {

            const connection = result.data
            const db = connection.db(dbName);
            const collection = db.collection(this.collectionName)

            const recordSet = await collection.deleteOne(query)

            if (!recordSet.acknowledged) return resMessage.error('Failed delete data', '500')

            return resMessage.dataRaw(recordSet)

        } catch (error) {
            resMessage.error(error.message, '500')
        }
    }


}

module.exports = DB