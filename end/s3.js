require('dotenv').config();

const aws = require('aws-sdk')
const fs = require('fs');

aws.config.update({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})

const aws_bucket_name = process.env.AWS_BUCKET_NAME;
const aws_bucket_region = process.env.AWS_BUCKET_REGION;
const aws_access_key = process.env.AWS_ACCESS_KEY;
const aws_secret_key = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
    aws_bucket_region,
    aws_access_key,
    aws_secret_key
})

function uploadfile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: aws_bucket_name,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

function getImageStream(imageName){

    const downloadParms = {
        Key: imageName,
        Bucket: aws_bucket_name
    }

    return s3.getObject(downloadParms).createReadStream();
}

function deleteImage(imageNmae){
    

    const deleteParms ={ 
        Key: imageNmae,
        Bucket: aws_bucket_name
    }

    return s3.deleteObject(deleteParms).promise();
}

exports.uploadfile = uploadfile;
exports.getImageStream = getImageStream;
exports.deleteImage = deleteImage;