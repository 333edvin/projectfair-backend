//import express
const express = require('express')

const userController = require('../controllers/userController.js')
const projectController = require('../controllers/projectController.js')

//middlewares
const jwtMiddleware = require('../Middlewares/jwtMiddleware.js')
//multer middle ware
const multerConfig = require('../Middlewares/multerMiddleware.js')

//create a router object of express  to define routes(path)
const router = new express.Router()

//using router onject to define pathsJ

//register route
router.post('/register',userController.register)

//login route
router.post('/login',userController.login)

//user project route
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

//get user project
router.get('/project/all-user-projects',jwtMiddleware,projectController.getUserProject)

//get all projects
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

//get home projects
router.get('/project/home-projects',projectController.getHomeProjects)

//update project
router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

//delete user project
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)

module.exports = router