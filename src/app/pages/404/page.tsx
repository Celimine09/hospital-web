'use client'
// export default function Custom404() {
// }
import { useEffect } from "react"
import { useRouter } from "next/router"
import { redirect } from "react-router-dom"
import { baseHost } from "@/app/constants/URLs"

export default function Custom404() {
    // const router = useRouter()

    useEffect(() => {
        // router.replace("/")
        redirect(`${baseHost}`)
    }, [])

    // return null
    return <h1>hi 404 - Page Not Found</h1>
}
// export const getStaticProps = () => {
//     return {
//         redirect: {
//             destination: '/',
//         },
//     };
// };