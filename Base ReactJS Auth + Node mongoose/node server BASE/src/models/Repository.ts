import {model, connection, Model, Schema, AnyObject} from 'mongoose'

type AccountsType = {
    name: string,
    url: string,
    userId: string
    
}
new Schema({}, {
    versionKey: false
});

const schema = new Schema<AccountsType>({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    }
    
}, {
    versionKey: false
    //timestamp: true
})

const modelName: string = 'repository'

export default(connection && connection.models[modelName]) ? 
    (connection.models[modelName] as Model<AccountsType>) 
:
    model<AccountsType>(modelName, schema)