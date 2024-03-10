import { useState } from 'react';
import axios, { AxiosRequestConfig } from "axios"
import { baseHost } from "../constants/URLs"

export const getStaffsName = async () => {
    // const patientNames : string[] | null = await axios.get<any, AxiosRequestConfig<IResponseFromGettingPatientNames>>(
    const names : string[] | null = await axios.get<any, AxiosRequestConfig<any>>(
            `${baseHost}/api/staff/staffs`)
        .then((res) => {
            // console.log(res.data?.status)
            if (res.data?.status === "success")
            {
                if (res.data?.staffs_name)
                {
                    return res.data.staffs_name
                }
            }
            return null
        }).catch(err => {
            console.log("Error getting staffs name in frontend")
            console.log(err)
            return null
        })
    return names
}

// export const patientsNames = await getPatientsNames()
// console.log(await getPatientsNames())