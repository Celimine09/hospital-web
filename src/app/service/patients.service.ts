import { IResponseFromGetPatientHistory } from './../interfaces/IPatient';
import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { baseHost } from "../constants/URLs"
import { exit } from 'process';

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

export const getPatientsHistory = async () => {
    // const res = await axios.get<IResponseFromGetPatientHistory[]>(
    const res = await axios.get<any, AxiosResponse<IResponseFromGetPatientHistory, any>>(
        `${baseHost}/api/patient/patients/history`
    )
    // console.log("AAAAAAAAAAAAAAAA")
    // console.log(res.data.history) // ! this is what we need to use
    if (res.status === 200 && res.data.status === "success")
    {
        const patientHistory = res.data.history;
        if (patientHistory === null)
        {
            console.error("Exit server because can't get patient history from server.")
            exit(888)
        }
        // console.log(patientHistory)
        return patientHistory
    }
    else
    {
        console.error("Can't get patients history dueto ...")
        console.error(res)
        return null
    }
}