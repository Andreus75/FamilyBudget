const S3 = require('aws-sdk/clients/s3');

const { AWS_S3_REGION, AWS_S3_NAME, AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY } = require('../configs/config');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

module.exports = {
    uploadImage: (file) => {
        console.log(file);
        return bucket
            .upload({
                Bucket: AWS_S3_NAME,
                Body: data,
                Key: uploadPath,
                ContentType: mimetype,
                ACL: 'public-read'
            })
            .promise();
    }
};


