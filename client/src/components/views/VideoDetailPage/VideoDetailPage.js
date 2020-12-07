import React, { useState, useEffect } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import axios from 'axios';

import SideVideo from './Sections/SideVideo';

const VideoDetailPage = (props) => {

    const videoId = props.match.params.videoId;
    const variable = { videoId: videoId }

    const [videoDetail, setVideoDetail] = useState('')

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', variable)
            .then(res => {
                if (res.data.success) {
                    // console.log(res.data)
                    setVideoDetail(res.data.videoDetail);
                } else {
                    alert('비디오 정보를 가져오길 실패했습니다.')
                }
            })
    }, []);

    if (videoDetail) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls />

                        <List.Item
                            actions
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={videoDetail.writer && videoDetail.writer.image} />}
                                title={<a href="https://ant.design">{videoDetail.title}</a>}
                                description={videoDetail.description}
                            />

                            {/* Comments */}

                        </List.Item>
                    </div>
                </Col>

                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                loading...
            </div>
        )
    }


}

export default VideoDetailPage
