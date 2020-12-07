const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { Subscriber } = require('../models/Subscriber');

const { auth } = require("../middleware/auth");
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('mp4 파일 확장자만 가능합니다.'), false);
        }
        cb(null, true)
    }
})

let upload = multer({ storage: storage }).single("file")

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    //비디오를 서버에 저장
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/uploadVideo', (req, res) => {
    //비디오 정보들을 저장한다.
    // console.log('this is req.body => ', req.body);
    const video = new Video(req.body);
    video.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true });
    });
})

router.get('/getVideos', (req, res) => {
    //비디오를 DB에서 가져와서 클라이언트로 보낸다.
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos });

        })
})

router.post('/getVideoDetail', (req, res) => {
    //비디오를 DB에서 가져와서 클라이언트로 보낸다.
    // console.log(req.body.videoId);
    Video.findOne({ "_id": req.body.videoId })
        .populate('writer')
        .exec((err, videoDetail) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, videoDetail })
        })
})

router.post("/thumbnail", (req, res) => {
    //썸네일 생성
    let filePath = ""
    let fileDuration = ""

    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata); // all metadata
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    });

    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            console.log(filenames)

            filePath = "uploads/thumbnails/" + filenames[0]
        })
        .on('end', function (filenames) {
            console.log('Screenshots taken');
            console.log(filenames)
            return res.json({ success: true, url: filePath, fileName: filenames, fileDuration: fileDuration });
        })
        .on('error', function (err) {
            console.error(err);
            return res.json({ success: false, err });
        })
        .screenshots({
            // Will take screenshots at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        })
});

router.post('/getSubscriptionVideos', (req, res) => {
    //구독한 비디오를 DB에서 가져와서 클라이언트로 보낸다.
    Subscriber.find({ 'userFrom': req.body.userFrom })
        .exec((err, subscriberInfo) => {
            if (err) return res.status(400).send(err);

            let subscriberUser = [];

            subscriberInfo.map((subscriber, index) => {
                subscriberUser.push(subscriber.userTo)
            })

            //찾은 사람들의 비디오를 가지고 온다.
            Video.find({ writer: { $in: subscriberUser } })
                .populate('writer')
                .exec((err, videos) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, videos })
                })
        })

})

module.exports = router;
