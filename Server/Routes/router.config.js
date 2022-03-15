// Importing Routes
const AnimalRoutes = require('./animal.routes')


/**
 * retruns the subRoutes
 * @param {app} app the expressApp
 * @returns return the SubRoutes 
 */
exports.routerConfig = async (app) => {
  await  AnimalRoutes.animalRoutes(app)

}