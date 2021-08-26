import mongoose from 'mongoose';
import { app } from './app';
import { natswrapper } from './nats-wrapper';

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined')
    }
    if(!process.env.NATS_CLUSTER_ID){
        throw new Error('NATS_CLUSTER_ID must be defined')
    }
    if(!process.env.NATS_URL){
        throw new Error('NATS_URL must be defined')
    }
    if(!process.env.NATS_CLIENT_ID){
        throw new Error('NATS_CLIENT_ID must be defined')
    }
    try {
        await natswrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID,
            process.env.NATS_URL);

        natswrapper.client.on('close', () => {
            console.log('Nats connection is closed');
            process.exit();
        })
        process.on('SIGINT', () => natswrapper.client.close());
        process.on('SIGTERM', () => natswrapper.client.close());
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