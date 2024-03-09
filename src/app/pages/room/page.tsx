'use client'
import BasicColumnsGrid from "@/app/components/datagrid"
import ServerSidePersistence from "@/app/components/editable_grid/editable_grid"
import FullFeaturedCrudGrid from "@/app/components/gridx"
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
        {/* <TikTok isTick={true} size={64}/>
        <TikTok isTick={false}/> */}
        
        {/* <FullFeaturedCrudGrid /> */}
        {/* <BasicColumnsGrid /> */}
        <div style={{
            width: "80vw",
            height: "80vh",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // backgroundColor: "red",
            marginLeft: "auto",
            marginRight: "auto",
            //marginTop: "auto"

        }}>
            <ServerSidePersistence />
        </div>
    </div>
}

export default RoomPage