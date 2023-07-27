import mongoose from 'mongoose';

const Connection = async () => {
    const password = '5jF3vJSsRrS4dAfJ'; // Replace with your actual password
    const URI = `mongodb+srv://rahmakhedimi285:${password}@cluster0.km5scbb.mongodb.net/?retryWrites=true&w=majority`;
    
    try {
        await mongoose.connect(URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database', error);
    }
};

export default Connection;
