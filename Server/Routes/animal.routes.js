const preURL = '/api/animal/'
const animalController = require('../Controllers/animal.controller')



exports.animalRoutes = (app) => {
    app.get(preURL + 'getAnimals',  [
        animalController.getAnimals
    ])

    app.post(preURL + 'getAnimalDetailsbyName',  [
        animalController.getAnimalDetailsbyName
    ])

}