export interface IStaff {
    isNew: any
    s_id: number
    name: string
    gender: string
    role_id: number
    role_name: string
}

export interface ResponseStaff {
    status: string
    staff?: IStaff[]
}