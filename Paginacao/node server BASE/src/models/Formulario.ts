import {model, connection, Model, Schema, AnyObject} from 'mongoose'

type AccountsType = {
    name: string,
    email: string
}
new Schema({}, {
    versionKey: false
});

const schema = new Schema<AccountsType>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    versionKey: false
    //timestamp: true
})

const modelName: string = 'formulario'

export default(connection && connection.models[modelName]) ? 
    (connection.models[modelName] as Model<AccountsType>) 
:
    model<AccountsType>(modelName, schema)