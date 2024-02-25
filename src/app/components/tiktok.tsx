import { CheckCircleRounded, CircleOutlined , Garage } from "@mui/icons-material"

interface ITikTok
{
    isTick : boolean
    size ?: number
}

const TikTok = (props: ITikTok) => {

    // const sizeStr : string = `${props.size}px`
    const sizeStr : string = `${props.size === undefined ? 32 : props.size}px`

    return <div style={{
        width: sizeStr,
        height: sizeStr,
        backgroundColor: "white",
        borderColor: "black",
        borderStyle: "solid"
    }}>
        {/* block */}
        <center style={{
            paddingTop: 2
        }}>
            {
                props.isTick ? <CheckCircleRounded color="success" /> : <CircleOutlined></CircleOutlined>
            }
        </center>
    </div>
}

export default TikTok