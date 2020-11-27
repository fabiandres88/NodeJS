const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('We are connected correctly to the server');

    Dishes.create({
        name: "AeroSmith Burger",
        description: "Delicious meat with light bread"
    })
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id,{
                $set: {description:'AeroSmith'}
            },
            {new: true}
            ).exec();
        })
        .then((dishes) => {
            console.log(dishes);
            dishes.comments.push({
                rating: 5,
                comment: 'I\'m getting a sinking feeling!',
                author: 'Carolina Jaimes'
            });

            return dishes.save();

        })
        .then((dishes)=> {
            console.log(dishes);          
            return Dishes.deleteOne({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((error) => {
            console.log(error);
        })
});
