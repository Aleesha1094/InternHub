import mongoose from 'mongoose';

const connectDb = async() => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB' + con.connection.host)
  } catch (err) {
    console.log(err)
  }
}

export default connectDb;