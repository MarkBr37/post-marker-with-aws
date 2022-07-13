const express = require('express');
const router = express.Router();
const { Post } = require('../models/post');
const fs = require('fs');
const { uploadfile, getImageStream, deleteImage } = require('../s3')

const multer = require('multer');
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        
        cb(null, new Date().toISOString().replace(/[-:.]/g,'') + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 10
    }
});

const fileSizeLimitError = (err, req, res, next) => {
    if (err) {
        return res.status(400).send('File too lagge');
    } else {
      next()
    }
}

// ROUTERS -------------------------
router.get('/', async (req, res) =>{
    const posts = await Post.find().sort({_id:-1})
    
    res.send(posts);

});

router.get('/images/:name', (req, res)=>{

    const imageName = req.params.name;
    const stream = getImageStream(imageName);

    stream.pipe(res);
})

router.post('/', upload.single('file'), fileSizeLimitError , async (req, res) =>{

    try{
        let imageName = ''

        if(req.file && req.file.filename){
            const result = await uploadfile(req.file)
            imageName = result.Key;
            fs.unlinkSync(req.file.path)
        } 


        let post = new Post({
            title: req.body.title,
            text: req.body.text,
            image: imageName,
        })
    
        let savePost = await post.save();
    
        res.send(savePost);

    }catch(err){
        
        if(err.name === 'ValidationError'){
            return res.status(400).send(Object.values(err.errors).map(val => val.message))
        }
    }
    
});

router.delete('/:id', async (req, res) =>{
    
    const post = await Post.findOneAndDelete({_id: req.params.id})
    if(!post) return res.status(404).send('The post with the given id was no found.');
    if(post.image) await deleteImage(post.image)
    res.send(post);

})

module.exports = router;