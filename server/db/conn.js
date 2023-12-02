const mongoose=require('mongoose');

const Db='mongodb://127.0.0.1:27017/HealthCare'





mongoose.connect(Db ).then(() => {
    console.log('Connncetion Successfull')
}).catch((err) => console.log("no Connection"));
