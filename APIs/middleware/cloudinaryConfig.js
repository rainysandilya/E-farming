const cloudinary=require("cloudinary").v2;
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")

cloudinary.config({
    cloud_name:"dvee6nshm",
    api_key:"191335147425916",
    api_secret:"UVP8cKdKYYG1n_ynGgFfirorFWk"
})

let clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"userfoodimages",
        public_id:(request,file)=>file.fieldname+"-"+Date.now()

    }
})

let multerObj=multer({storage:clStorage})

module.exports=multerObj;