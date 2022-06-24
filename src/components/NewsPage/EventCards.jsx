import React, { useEffect, useState } from "react";
import common from "../../config/common";
import "./NewsPage.scss";
import { Card } from 'antd';
import cookie from 'react-cookies';
import isLoginOK from '../../config/variable';
import { useHistory } from 'react-router-dom'

const { Meta } = Card;

function CardList() {
    const [data, setData] = useState()
    let history = useHistory()
    let userInfo = cookie.load('isLoginOK');
    const init = () => {
        common?.postMethod("/api/user/getAbout").then(r => {
             r.retlist.pop()
            setData(r.retlist)

        });
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        init()
    }, [])
    const jump = (item) => {
        console.log( item);
        history.push('/resource1?id=' + item.id)
    }
    return <>
        {userInfo || true ? <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                height: 400,
                paddingTop: 50
            }}>

                {data?.map((item) => <Card

                    style={{ width: 300, margin: 10, height: 250 }}
                    cover={
                        <img
                            alt="example"
                            onClick={() => jump(item)}
                            src={item.img || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                        />
                    }
                    actions={
                        [
                            isLoginOK.role === 'admin' ? <span
                                onClick={() => jump(item)} >edit</span> :
                                <span
                                    onClick={() => jump(item)}>more</span>,
                            // <span>del</span>
                        ]
                    }
                >
                    <Meta
                        title={item.title}
                    //   description="This is the description"
                    />
                </Card>)}
            </div>
        </> : <div id="error">请登录账号！</div>}</>
}
export default CardList;

