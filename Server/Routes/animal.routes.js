const preURL = '/api/animal/'
const animalController = require('../Controllers/animal.controller')



exports.animalRoutes = (app) => {
    app.post(preURL + 'getAnimalDetailsbyName',  [
        animalController.getAnimalDetailsbyName
    ])

}