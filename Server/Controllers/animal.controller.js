//Impiorting Required Modules
const animalModel = require("../Models/animal.model");




/**
 * 
 * 
 * @param {{Status, message, token}} res Response provides for corresponding  request
 * @returns Returns List of Animals
 */
 exports.getAnimals= async (req, res) => {
  try {
  const animal = await animalModel.find()
        if (!animal) {
            return res.send({
                status: 3101,
                message: "Animals dosen't Exist"
            })
        } else {
            res.status(200).json({

                data: animal,
                message: "Animals List"
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
 * @param {{animalname}} req Request has the incomming Data of User's email and password  
 * @param {{Status, message, Data}} res Response provides for corresponding  request
 * @returns Returns with User's token, with status and message for the signin
 */
exports.getAnimalDetailsbyName = async (req, res) => {

    const { animalname} = req.body

    try {
  const animal = await animalModel.findOne({
            animalname: animalname,
       
        })
        if (!animal) {
            return res.send({
                status: 3101,
                message: "Animal dosen't Exist"
            })
        } else {
            res.status(200).json({
                status: 3001,
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

