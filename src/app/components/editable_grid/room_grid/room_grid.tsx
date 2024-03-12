'use client'
import * as React from 'react';
import {
    GridRowModel,
    GridRowsProp,
    GridToolbar,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomId,
    randomStatusOptions,
    randomTaxCode,
    randomTraderName,
} from '@mui/x-data-grid-generator';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import { IRoom, ResponseRooms } from '@/app/interfaces/IRoom';
import axios, { AxiosResponse } from 'axios';
import moment from "moment"
import { randomNumberBetween } from '@mui/x-data-grid/utils/utils';
import { baseHost } from '@/app/constants/URLs';
import { getPatientsNames} from '@/app/service/patients.service';
import { StripedDataGrid } from '../striped_datagrid';
import { patientNames, roomColumns, setPatientsName, setStaffsName, staffNames } from './room.grid.columns';
import { getStaffsName } from '@/app/service/stafff.service';
import { setPatientsAndStaffDropdownData } from '@/app/utils/patient.staff.helper';


// await axios.get<any, IResponseFromGettingPatientNames>(
// await axios.get<any, any>(
//         `${baseHost}/api/patient/patients`)
// console.log(patientNames)



const createOneRandomRow = () => {
    const obj: IRoom = {
        id: randomNumberBetween(999, 1, 1000000)(),
        room_id: randomNumberBetween(999, 1, 1000000)(),
        room_number: randomNumberBetween(999, 1, 1000000)(),
        patient_name: randomTraderName(),
        staff_name: randomTraderName(),
        admission_date: randomCreatedDate(),
        room_code: randomId(),
        building_name: randomTaxCode(),
        floor: randomStatusOptions(),
    }
    return obj
}

// const rows: GridRowsProp = [
// var data : IRoom[] = []
// for (let index = 0; index < 80; index++) {
//     const k = createOneRandomRow()
//     data.push(k)
// }
// const rows: GridRowsProp<IRoom> = data


const useFakeMutation = () => {
    return React.useCallback(
        // (oldRoomToMutate: Partial<IRoom>) =>
        //     new Promise<Partial<IRoom>>((resolve, reject) => {
        (oldRoomToMutate: Partial<any>) =>
            new Promise<Partial<any>>((resolve, reject) => {
                console.log("updated row ...".bgMagenta)
                console.log(oldRoomToMutate)
                setTimeout(() => {
                    // if (user.name?.trim() === '') {
                    //     reject(new Error("Error while saving user: name can't be empty."));
                    // } else {
                    //     resolve({ ...user, name: user.name?.toUpperCase() });
                    // }

                    // console.log("unlock...")
                    // axios({
                    //     method: 'PUT',
                    //     url: `${baseHost}/api/room`,
                    //     data: {
                    //         firstName: 'Fred',
                    //         lastName: 'Flintstone'
                    //     }
                    // })

                    console.log("request to changing patient from room")
                    axios.put(`${baseHost}/api/room`, {
                        operation: "changePatient",
                        room_id : oldRoomToMutate.room_id,
                        patient_fullname_to_change: oldRoomToMutate.patient
                        // patient_to: props.row.patient,
                        // patient_to: props.row.patient
                    })

                    console.log("request to changing staff from room")
                    axios.put(`${baseHost}/api/room`, {
                        operation: "changeStaff",
                        room_id : oldRoomToMutate.room_id,
                        staff_fname_to_change: oldRoomToMutate?.staff?.trim().split(" ")[0]
                        // patient_to: props.row.patient,
                        // patient_to: props.row.patient
                    })




                    resolve({ ...oldRoomToMutate })


                    // }, 200);
                }, 2000);
            }),
        [],
    );
};

// export default function ServerSidePersistence() {
export default function EditableTable() {
    const mutateRow = useFakeMutation();
    const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'
    > | null>(null);

    // let rows: GridRowsProp<IRoom> = []
    const [rows, setRows] = React.useState<GridRowsProp<IRoom>>([])

    React.useEffect(() => {
        // todo : retrive data from backend
        // axios.get("http://localhost:3000/api/room").then((res:AxiosResponse<ResponseRooms>) => {
        axios.get(`${baseHost}/api/room`).then((res: AxiosResponse<ResponseRooms>) => {
            // console.log(res)
            // console.log(res.data.rooms)
            if (res.data.rooms) {
                const modifiedRows = res.data.rooms.map((rm: IRoom) => {
                    // console.log(`room bd[${rm.building_name}], floor[${rm.floor}]`)
                    return {
                        ...rm,
                        id: rm.room_id,
                        room_code: rm.building_name + "/" + rm.floor + "/" + rm.room_number,
                        admission_date: moment(rm.admission_date).toDate()
                    }
                })
                // console.log(modifiedRows)
                setRows(modifiedRows)
                setSnackbar({
                    children: "Retrieved rooms data from server.",
                    // children: JSON.stringify(modifiedRows),
                    severity: "success"
                })
            }
        }).catch((err: any) => {
            console.log("Error getting room data from backend.")
            // console.error(err)
            setSnackbar({
                children: "Can not retrive rooms data from server...",
                severity: "error"
            })
        })

        // const setPatientsAndStaffDropdownData = (
        //     setPatientsName: (pns: string[]) => void,
        //     setStaffsName: (stns: string[])=> void,
        //     patientNames: string[],
        //     staffNames: string[],
        //     ) => {
        //     getPatientsNames().then((ps) => {
        //         if (ps !== null) {
        //             setPatientsName(ps)
        //             patientNames.push("") // empty people
        //             console.log("set up patients name to room-page data".america)
        //         }
        //     }).catch((e) => {
        //         console.error(e)
        //     })

        //     getStaffsName().then((s) => {
        //         if (s !== null) {
        //             setStaffsName(s)
        //             staffNames.push("") // empty people
        //             console.log("set up staff name to room-page data".america)
        //         }
        //     }).catch((e) => {
        //         console.error(e)
        //     })
        // }
        setPatientsAndStaffDropdownData(
            setPatientsName,
            setStaffsName,
            patientNames,
            staffNames
        )

    }, [])

    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = React.useCallback(
        // async (newRow: GridRowModel<IRoom>) => {
        async (newRow: GridRowModel) => {
            // Make the HTTP request to save in the backend
            // console.log("updated")
            const response = await mutateRow(newRow);
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            return response;
        },
        [mutateRow],
    );

    const handleProcessRowUpdateError = React.useCallback((error: Error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    return (
        // <div style={{ height: 400, width: '100%' }}>
        <div style={{ height: '80vh', width: '100%' }}>
            {/* <StriptedData */}
            <StripedDataGrid
                rows={rows}
                columns={roomColumns}
                // processRowUpdate={() => {console.log("updated")}}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                slots={{ toolbar: GridToolbar }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
            />
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </div>
    );
}
