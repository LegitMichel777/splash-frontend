import React, {useState} from 'react'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
// import {isClamped} from 'react-lines-ellipsis'
import {Button} from "antd";


// const { Paragraph, Text } = Typography;
function RenderParagraph({longStr}) {
    const [ellipsis, setEllipsis] = useState(false);
    const [line,setLine]=useState('10')
    let newStr1 = longStr.replace('class=\"image_resized\"', '')

    let newStr2 = newStr1.replace("<img", '<img style="max-height:350px"');
    let newStr3 = newStr2.replace('style=', '');
    const handleReflow = (rleState) => {
        const {
            clamped,
            text,
        } = rleState
        // do sth...
        if (clamped){
            setEllipsis(true)
        }else {
            setEllipsis(false)
        }
    }
    return <>
            <HTMLEllipsis
                unsafeHTML={newStr3}
                maxLine={line}
                basedOn='letters'
                onReflow={handleReflow}
            />

        {ellipsis&&<Button type='link'
                 onClick={() => setLine('100000')}>更多</Button>}
    </>
}

export default RenderParagraph;