import { useState } from 'react';
import axios, { AxiosRequestConfig } from "axios"
import { baseHost } from "../constants/URLs"

export const getPatientsNames = async () => {
    // const patientNames : string[] | null = await axios.get<any, AxiosRequestConfig<IResponseFromGettingPatientNames>>(
    const patientNames : string[] | null = await axios.get<any, AxiosRequestConfig<any>>(
            `${baseHost}/api/patient/patients`)
        .then((res) => {
            // console.log(res.data?.status)
            if (res.data?.status === "success")
            {
                if (res.data?.patients_name)
                {
                    return res.data.patients_name
                }
            }
            return null
        }).catch(err => {
            console.log("Error getting patients name in frontend 'editable grid - room'")
            console.log(err)
            return null
        })
    return patientNames
}

// export const patientsNames = await getPatientsNames()
// console.log(await getPatientsNames())