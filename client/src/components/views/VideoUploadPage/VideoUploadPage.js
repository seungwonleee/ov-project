import React, { useState, useEffect, useCallback } from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
    { value: 0, label: '비공개' },
    { value: 1, label: '공개' }
]

const CatogoryOptions = [
    { value: 0, label: "영화 & 애니메이션" },
    { value: 1, label: "자동차 & 차량" },
    { value: 2, label: "음악" },
    { value: 3, label: "애완동물 & 동물" },
    { value: 4, label: "운동" },
]

const VideoUploadPage = (props) => {
    const user = useSelector(state => state.user);
    // console.log("this is user", user.userData._id);

    const [videoTitle, setVideoTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contentPrivate, setContentPrivate] = useState(0);
    const [category, setCategory] = useState('');
    const [filePath, setFilePath] = useState('');
    const [duration, setDuration] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const onTitleChange = useCallback((e) => {
        setVideoTitle(e.target.value);
    }, [])

    const onDescriptionChange = useCallback((e) => {
        setDescription(e.target.value);
    }, [])

    const onPrivateChange = useCallback((e) => {
        setContentPrivate(e.target.value);
    }, [])

    const onCategoryChange = useCallback((e) => {
        setCategory(e.target.value);
    }, [])

    const onDrop = (files) => {

        // if (user.userData && !user.userData.isAuth) {
        //     return alert('먼저 로그인 해주세요.');
        // }

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0]);

        axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                // console.log('video', response);
                if (response.data.success) {
                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url)

                    axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                // console.log('thumbnail', response);
                                setDuration(response.data.fileDuration)
                                setThumbnail(response.data.url)
                            } else {
                                alert('썸네일을 생성하는데 실패했습니다.');
                            }
                        })
                } else {
                    alert('비디오 업로드를 실패했습니다.');
                }
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: videoTitle,
            description: description,
            privacy: contentPrivate,
            filePath: filePath,
            category: category,
            duration: duration,
            thumbnail: thumbnail,
        }

        axios.post('/api/video/uploadVideo', variables)
            .then(res => {
                if (res.data.success) {
                    message.success('성공적으로 업로드 하였습니다.');
                    setTimeout(() => {
                        props.history.push('/');
                    }, 3000)
                } else {
                    alert('비디오 업로드에 실패했습니다.');
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} >영상 업로드</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center' }}>
                        {/* Dropzone */}
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={100000000}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <UploadOutlined style={{ fontSize: '3rem' }} />
                                </div>
                            )}
                        </Dropzone>
                        <p>파일을 드래그 앤 드롭하세요.</p>
                    </div>


                    {/* Thumbnail 이미지*/}
                    <div style={{ textAlign: 'center' }}>
                        {thumbnail &&
                            <div style={{ border: '1px solid gray' }}>
                                <img src={`http://localhost:5000/${thumbnail}`} alt="thumbnail" />
                            </div>}
                        {thumbnail && <p>영상 썸네일</p>}
                    </div>

                </div>

                <br />
                <br />
                <label htmlFor="title" style={{ fontWeight: 'bold', fontSize: '1rem' }}>제목 <span style={{ fontSize: '0.5rem' }}>(title)</span></label>
                <Input
                    name='title'
                    onChange={onTitleChange}
                    value={videoTitle}
                />

                <br />
                <br />
                <label htmlFor="description" style={{ fontWeight: 'bold', fontSize: '1rem' }}>설명 <span style={{ fontSize: '0.5rem' }}>(description)</span></label>
                <TextArea
                    name='description'
                    onChange={onDescriptionChange}
                    value={description}
                    style={{ height: '8rem' }}
                />

                <br />
                <br />
                <div>
                    <div style={{ display: 'inlineBlock' }}>
                        <select onChange={onPrivateChange}>
                            <option value="" selected disabled>공개 범위</option>
                            {PrivateOptions.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                        </select>

                        <br />
                        <br />
                        <select onChange={onCategoryChange}>
                            <option value="" selected disabled>카테고리</option>

                            {CatogoryOptions.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>

                            ))}
                        </select>
                    </div>
                    <div style={{ float: 'right' }}>
                        {/* <br />
                        <br /> */}
                        <Button type="default" size="large" onClick={onSubmit}>업로드</Button>
                        <Button type="default" size="large" onClick>취소</Button>
                    </div>
                </div>
            </Form>

        </div>
    )
}

export default VideoUploadPage
