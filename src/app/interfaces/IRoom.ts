
export interface IRoom {
    id: number;
    room_code: string
    patient_name : string | null
    // dateCreated: Date;
    staff_name : string | null
    admission_date: Date | null
    building_name: string
    floor: string
    room_id: number // 
    room_number : number
    // lastLogin: Date;
}

export interface ResponseRooms {
    status: string
    rooms? : IRoom[]
}