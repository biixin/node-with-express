import {model, connection, Model, Schema, AnyObject, ObjectId} from 'mongoose'

type AccountsType = {
    username: string,
    password: string
    
}
new Schema({}, {
    versionKey: false
});

const schema = new Schema<AccountsType>({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    }
    
}, {
    versionKey: false
    //timestamp: true
})

const modelName: string = 'accounts'

export default(connection && connection.models[modelName]) ? 
    (connection.models[modelName] as Model<AccountsType>) 
:
    model<AccountsType>(modelName, schema)