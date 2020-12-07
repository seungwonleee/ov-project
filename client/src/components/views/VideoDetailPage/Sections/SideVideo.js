import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SideVideo = () => {

    const [sideVideos, setSideVideos] = useState([]);

    useEffect(() => {

        axios.get('/api/video/getVideos')
            .then(res => {
                if (res.data.success) {
                    // console.log(res.data)
                    setSideVideos(res.data.videos);
                } else {
                    alert('비디오를 불러오는 도중에 문제가 발생했습니다.')
                }
            })

    }, []);


    const renderSideVideo = sideVideos.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));

        return <div key={index} style={{ display: 'flex', marginBottom: '1rem', padding: '0.2rem' }}>
            <div style={{ width: '40%', marginBottom: '1rem', marginRight: '1rem' }}>
                <a href={`/video/${video._id}`}>
                    <img style={{ width: '100%', height: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumnail" />
                </a>
            </div>
            <div style={{ width: '50%' }}>
                <a href={`/video/${video._id}`} style={{ color: 'gray' }}>
                    <span style={{ fontSize: '1rem', color: 'black' }}>제목 : {video.title}</span><br />
                    <span>작성자 : {video.writer.name}</span><br />
                    <span>조회수 : {video.views}</span><br />
                    <span>영상 길이 : {minutes} : {seconds}</span><br />
                </a>
            </div>
        </div >

    })

    return (
        <>
            <div style={{ marginTop: '3rem' }}></div>
            {renderSideVideo}
        </>
    )
}

export default SideVideo
