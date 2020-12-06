import React, { useEffect, useState } from 'react';
import { Card, Avatar, Col, Row, Typography } from 'antd';
import { Icon } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;


const VideoSharePage = () => {

    const [video, setVideo] = useState([]);

    useEffect(() => {

        axios.get('/api/video/getVideos')
            .then(res => {
                if (res.data.success) {
                    setVideo(res.data.videos);
                } else {
                    alert('비디오를 불러오는 도중에 문제가 발생했습니다.')
                }
            })

    }, []);

    const renderCards = video.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                    <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                    <div className=" duration"
                        style={{
                            bottom: 0, right: 0, position: 'absolute', margin: '4px',
                            color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8,
                            padding: '2px 4px', borderRadius: '2px', letterSpacing: '0.5px', fontSize: '12px',
                            fontWeight: '500', lineHeight: '12px'
                        }}>
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
            </div>
            <br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
        - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}>개인작품</Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default VideoSharePage
