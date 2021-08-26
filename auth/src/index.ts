import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    console.log("auth starting....");
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined')
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (error) {
        console.error(error)
    }
}
start();

app.listen(3000, () => console.log('Listing on port 3000'))