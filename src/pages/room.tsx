import Navbar from "@/app/components/navbar"
import TikTok from "@/app/components/tiktok"
import { Button } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

interface IHero
{
    heroName: string
    attackType: string
}

const RoomPage = () => {
    // let n : number = 10
    const [n, setN] = useState<number>(0)
    const dummyHeros : IHero[] = [{heroName : "A", attackType: "A"}]


    const onButtonClicked = () => {
        console.log("clicked.")
        // n += 1
        setN(n + 1)
        // getX()
    }

    useEffect(() => {
    }, [])



    return <div>
        <h1>
            Room
        </h1>
        <TikTok isTick={true} size={64}/>
        <TikTok isTick={false}/>
        <center>
            <Button variant="outlined" onClick={(event) => {
                onButtonClicked()
            }}>
                click bear
            </Button>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "gray",
                width: "500px",
                height: "80vh"
            }}>
                <h1>
                    {n}
                </h1>
                {/* <div>
                    {
                        heros.map((hero, id) => {
                            return <div key={id}>
                                <h3>
                                    {hero.heroName}
                                </h3>
                            </div>
                        })
                    }
                </div> */}
            </div>
        </center>
    </div>
}

export default RoomPage