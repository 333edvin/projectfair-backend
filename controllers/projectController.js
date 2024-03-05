const projects = require('../Models/projectSchema')

//add project======================================
exports.addUserProject = async(req,res)=>{
    //user id
    const userId = req.payload

    
    //add project details
    const {title,language,github,link,overview} = req.body
console.log(req.body)
    //get image
    projectImage = req.file.filename
    //adding new user
    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exists")
        }else{
            const newProject = new projects({title,language,github,link,overview,projectImage,userId})
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

//get user projects================================================
exports.getUserProject = async(req,res)=>{
    //get user id
    const userId = req.payload
    //api result
    try {
        //get project informaion of particular user
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
    } catch (err) {
        res.status(401).json(err.message)
    }
}

//2 get all projects===============================================
exports.getAllProjects = async(req,res)=>{
    const searchKey = req.query.search
    const query = {
        language:{
            $regex:searchKey,
            $options:"i"
        }
    }
    try {
        const AllProjects = await projects.find(query)
        res.status(200).json(AllProjects)
    } catch (error) {
        res.status(401).json(error.message)
    }
}

//3 get home projects===============================================
exports.getHomeProjects = async(req,res)=>{
    try {
        const HomeProject = await projects.find().limit(3)
        res.status(200).json(HomeProject)
    } catch (error) {
        res.status(401).json(error.message)
        
    }
}

//4 Edit Project Details
exports.editProject = async(req,res)=>{
    const {title,language,github,link,overview,projectImage} = req.body;

    //if we updated the image it checks the file name 
    //if the file name is changed it takes true condition (req.file.filename)
    //if the file name is not changed it takes the old image which is false condition (projectImage)
    const uploadImage = req.file?req.file.filename:projectImage

    //req.payolad contains userId
    const userId = req.payload

    //req.params contains projectId
    const {id} = req.params

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,link,overview,projectImage:uploadImage,userId},{new:true})

        await updateProject.save()

        res.status(200).json(updateProject)

    } catch (error) {
        res.status(401).json(error)
        
    }
}

//delete user project
exports.deleteProject = async(req,res)=>{
    const {pid} = req.params
    try {
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)
        
    } catch (error) {
        res.status(401).json(error)
    }
}