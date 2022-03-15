//Impiorting Required Modules
const animalModel = require("../Models/animal.model");




/**
 * 
 * @param {{email,animalId}} req Request has the incomming Data of User's email and password  
 * @param {{Status, message, token}} res Response provides for corresponding  request
 * @returns Returns with User's token, with status and message for the signin
 */
 exports.getAnimals= async (req, res) => {


    try {


        const animal = await animalModel.find()
        if (!animal) {
            return res.send({
                status: 3101,
                message: "Animal dosen't Exist"
            })
        } else {
            res.status(200).json({

                data: animal,
                message: "Animal Details"
            });
        }
    } catch (err) {
        console.log(err)
        return res.send({
            status: 3000,
            Message: 'Something Went wrong Please try Again'
        })
    }
}


/**
 * 
 * @param {{animalId}} req Request has the incomming Data of User's email and password  
 * @param {{Status, message, Data}} res Response provides for corresponding  request
 * @returns Returns with User's token, with status and message for the signin
 */
exports.getAnimalDetailsbyName = async (req, res) => {

    const { animal} = req.body

    try {


        const animal = await animalModel.findOne({
            animalname: animal,
       
        }).select('-password')
        if (!animal) {
            return res.send({
                status: 3101,
                message: "Animal dosen't Exist"
            })
        } else {
            res.status(200).json({

                data: animal,
                message: "Animal Details"
            });
        }
    } catch (err) {
        console.log(err)
        return res.send({
            status: 3000,
            Message: 'Something Went wrong Please try Again'
        })
    }
}

