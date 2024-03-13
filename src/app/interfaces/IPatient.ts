import { IStaff } from "./IStaff"

export interface IResponseFromGettingPatientNames
{
    status : string
    patients_name? : string[]
    message? : string
}

export interface IPatient
{
    isNew: any
    p_id: number
    patient_name: string
    patient_sex: string
    patient_birth: Date
    patient_phone: string
    patient_address: string
}

export interface IResponseFromGetPatientHistory
{
    status : string
    history : IPatientHistory[]
}

// export interface IPatientHistory
// {
//     id : string
//     h_id : string
//     patient: IPatient 
//     staff: IStaff
//     simple_diagnosis: string
//     diagnosis_desc: string
//     admission_date: Date
//     discharge_date: Date
//     bill_price: number
// }

// export interface IPatientHistoryFlatten
export interface IPatientHistory
{
    id : string
    h_id : string
    doctor_id : string
    doctor_name : string
    patient_id : string
    patient_name : string
    simple_diagnosis: string
    diagnosis_desc: string
    admission_date: Date
    discharge_date: Date
    bill_price: number
}