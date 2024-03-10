'use client'
import * as React from 'react';
import {
    DataGrid,
    GridRowModel,
    GridColDef,
    GridRowId,
    GridRowsProp,
    GridRenderEditCellParams,
    GridRenderCellParams,
    GridEditSingleSelectCellProps,
    useGridApiContext,
    GridEditSingleSelectCell,
    GridApi,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomId,
    randomStatusOptions,
    randomTaxCode,
    randomTraderName,
    randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import { IRoom, ResponseRooms } from '@/app/interfaces/IRoom';
import axios, { AxiosResponse } from 'axios';
import moment from "moment"
import { randomNumberBetween } from '@mui/x-data-grid/utils/utils';
import { baseHost } from '@/app/constants/URLs';
import { Box, Button } from '@mui/material';
import { getPatientsNames} from '@/app/service/patients.service';
import { ArrowDropDown } from '@mui/icons-material';


const CustomEditComponent = (props: GridEditSingleSelectCellProps) => {
    const apiRef = useGridApiContext();


    const handleValueChange = async () => {
        // console.log("AAAAAAAAA")
        // axios.put(`${baseHost}/api/room`, {
        //     operation: "changePatient",
        //     room_id : props.row.room_id,
        //     patient_fullname_to_change: props.row.patient
        //     // patient_to: props.row.patient,
        //     // patient_to: props.row.patient
        // })
        // console.log()
        // apiRef.current.
        await apiRef.current.setEditCellValue({
            id: props.id,
            field: 'patient',
            value: '99999999999',
        })

    };

    return <GridEditSingleSelectCell onValueChange={handleValueChange} {...props} />;
};

// await axios.get<any, IResponseFromGettingPatientNames>(
// await axios.get<any, any>(
//         `${baseHost}/api/patient/patients`)
// console.log(patientNames)

var patientNames : string[] = ["A", "B"]

const columns: GridColDef[] = [
    {
        field: 'room_code',
        type: "string",
        headerName: 'Room Code',
        width: 150,
    },
    {
        field: 'room_type',
        headerName: 'Room Type',
        type: 'string',
        align: 'left',
        width: 100,
        headerAlign: 'left',
    },
    {
        field: 'floor',
        headerName: 'Floor',
        type: 'string',
        align: 'left',
        width: 50,
        headerAlign: 'left',
    },
    {
        field: 'building_name',
        headerName: 'Building',
        type: 'string',
        align: 'left',
        width: 100,
        headerAlign: 'left',
    },
    {
        field: 'patient',
        headerName: 'Patient',
        type: 'singleSelect',
        align: 'left',
        width: 200,
        headerAlign: 'left',
        editable: true,
        valueOptions: ({ row }) => {

            // if (patientsNames !== null)
            // {
            //     return patientsNames
            // }
            // (async() => {
            //     await axios.get<any, any>(`${baseHost}/api/patient/patients`)
            // })()
            // (async () => {
            //     return await getPatientsNames()
            // }
            // )()
            if (patientNames !== null)
                return patientNames
            // // else
            // //     return []
            // return row
            return ["A", "B"]
            // if (!row) {
            //     // The row is not available when filtering this column
            //     return ['Sales', 'Investments', 'Ads', 'Taxes', 'Payroll', 'Utilities'];
            // }

            // return row.type === 'Income' // Gets the value of the "type" field
            //     ? ['Sales', 'Investments', 'Ads']
            //     : ['Taxes', 'Payroll', 'Utilities'];
        },
        renderEditCell: (params) => <CustomEditComponent {...params} />,
        renderCell: ({ value }) => {
            // axios.
            // console.log(value)
            return (
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <div>{value}</div>
                <ArrowDropDown />
            </Box>
        )}
    },
    {
        field: 'staff',
        headerName: 'Staff',
        type: 'string',
        editable: true,

        align: 'left',
        width: 200,
        headerAlign: 'left',
    },
    {
        field: 'admission_date',
        headerName: 'Admission Date',
        type: 'date',
        align: 'left',
        width: 150,
        headerAlign: 'left',
        valueFormatter: params => {
            // console.log(params)
            if (params.value != "Invalid Date")
                return moment(params?.value).format("DD/MM/YYYY")
            else
                return "-"
        }
    },
    {
        field: "xxx",
        headerName: "Empty the room",
        // renderEditCell: (params: GridRenderEditCellParams) => (
        //     <CustomEditComponent {...params} />
        // ),
        editable: true,
        renderCell: (params: GridRenderCellParams) => {
            // const _onClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const _onClick = () => {
                params.row.patient = ""
                params.row.staff = ""
                params.row.admission_date = "Invalid Date"

                axios.put(`${baseHost}/api/room`, {
                    operation: "clear",
                    room_id: params.row.room_id
                }).then((res) => {
                    console.log(`clear staff, patient from room id = ${params.row.room_id} and respnsed from server is`)
                    console.log(res)
                }).catch((err) => {
                    console.error(err)
                })
            };
            return <Button variant='outlined' color='success'
                onClick={(e) => _onClick()}
                size='small'
            >
                Clear
            </Button>
        },
    },
];

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

                    axios.put(`${baseHost}/api/room`, {
                        operation: "changePatient",
                        room_id : oldRoomToMutate.room_id,
                        patient_fullname_to_change: oldRoomToMutate.patient
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

        getPatientsNames().then(ps => {
            if (ps !== null) {
                patientNames = ps
                patientNames.push("") // empty people
                console.log("set up patients name to room-page data".america)
                // console.log("OK")
                // console.log(ps)
            }
        }).catch((e) => {
            console.error(e)
        })

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
            <DataGrid
                rows={rows}
                columns={columns}
                // processRowUpdate={() => {console.log("updated")}}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
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
