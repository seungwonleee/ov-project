import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Subscribe = (props) => {
    const userTo = props.userTo
    const userFrom = props.userFrom

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    const onSubscribe = () => {

        let subscribeVariables = {
            userTo: userTo,
            userFrom: userFrom
        }

        if (Subscribed) {
            // 구독 취소하기
            axios.post('/api/subscribe/unSubscribe', subscribeVariables)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독 취소를 실패하였습니다.')
                    }
                })

        } else {
            // 구독하기
            axios.post('/api/subscribe/subscribe', subscribeVariables)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독을 실패하였습니다.')
                    }
                })
        }

    }

    useEffect(() => {

        const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom }

        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('구독자수를 가져오는데 실패했습니다.')
                }
            })

        axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subcribed)
                } else {
                    alert('구독자 정보를 가져오는데 실패했습니다.')
                }
            })

    }, [])

    return (
        <div>
            <button
                onClick={onSubscribe}
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                    borderRadius: '4px', color: 'white',
                    padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}>
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe