const AWS = require('aws-sdk')
const uuid = require('uuid/v1')

const S3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID_AWS,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
})

exports.uploadFile = async (index = '1000') =>
    new Promise((resolve, reject) => {
        const key = `${index}/${uuid()}.jpeg`
        S3.getSignedUrl(
            'putObject',
            {
                Bucket: 'mottrieuangi',
                ContentType: 'image/jpeg',
                Key: key,
            },
            (err, url) => {
                resolve(url)
            }
        )
    })
