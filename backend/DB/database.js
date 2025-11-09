import mongoose from 'mongoose'

const URI = 'mongodb://localhost:27017/AdiD'


const connector =()=>{
    try {
        mongoose.connect(URI)
        .then(()=> console.log('Connected To Database'))
    } catch (error) {
        console.log('Failed to Connect to the Database')
    }

}

export default connector