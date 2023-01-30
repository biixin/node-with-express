import {model, connection, Model, Schema} from 'mongoose'

type PhrasesType = {
    email: string,
    password: string
    
}
new Schema({}, {
    versionKey: false
});

const schema = new Schema<PhrasesType>({
    email: {type: String},
    password: {type: String}
    
}, {
    versionKey: false
})

const modelName: string = 'Teste'

export default(connection && connection.models[modelName]) ? 
    (connection.models[modelName] as Model<PhrasesType>) 
:
    model<PhrasesType>(modelName, schema)