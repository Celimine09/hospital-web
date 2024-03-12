import { baseHost } from '@/app/constants/URLs';
import { ArrowDropDown } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
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
    GridTreeNodeWithRender,
} from '@mui/x-data-grid';
import axios from 'axios';
import moment from 'moment';

export var patientNames : string[] = []
export var staffNames : string[] = []

export const setStaffsName = (stns: string[]) =>
{
    staffNames = stns
}
export const setPatientsName = (pns: string[]) =>
{
    patientNames = pns
}

export const patientHistoryColumns: GridColDef[] = [
    {
        field: 'patient_name',
        headerName: 'Patient',
        type: 'singleSelect',
        align: 'left',
        width: 200,
        headerAlign: 'left',
        editable: true,
        valueOptions: ({ row }) => {
            if (patientNames !== null)
                return patientNames
            // return ["A", "B"]
            return row
        },
        // renderEditCell: (params) => <CustomEditComponent {...params} />,
        renderCell: (params) => <CustomRenderCellComponent {...params} />
    },
    {
        field: 'doctor_name',
        headerName: 'Doctor',
        type: 'singleSelect',
        editable: true,
        align: 'left',
        width: 200,
        headerAlign: 'left',
        valueOptions: ({ row }) => {
            if (staffNames !== null)
                return staffNames
            return row
        },
        // renderEditCell: (params) => <CustomEditComponent {...params} />,
        renderCell: (params) => <CustomRenderCellComponent {...params} />
    },
    {
        field: 'simple_diagnosis',
        headerName: 'Diagnosis',
        type: 'string',
        align: 'left',
        width: 150,
        headerAlign: 'left',
        editable: true
    },
    {
        field: 'diagnosis_desc',
        headerName: 'Description',
        type: 'string',
        align: 'left',
        width: 200,
        headerAlign: 'left',
        editable: true
    },
    {
        field: 'admission_date',
        headerName: 'Admission Date',
        type: 'date',
        editable: true,
        align: 'left',
        width: 150,
        headerAlign: 'left',
        // editable: true,
        valueFormatter: params => {
            // console.log(params)
            if (params.value != "Invalid Date")
                return moment(params?.value).format("DD/MM/YYYY")
            // else
            //     return "-"
            return params?.value
        }
    },
    {
        field: 'discharge_date',
        headerName: 'Discharge Date',
        editable: true,
        type: 'date',
        align: 'left',
        width: 150,
        headerAlign: 'left',
        // editable: true,
        valueFormatter: params => {
            // console.log(params)
            if (params.value != "Invalid Date")
                return moment(params?.value).format("DD/MM/YYYY")
            // else
            //     return "-"
            return params?.value
        }
    },
    {
        field: "xxx",
        headerName: "Empty the room",
        // renderEditCell: (params: GridRenderEditCellParams) => (
        //     <CustomEditComponent {...params} />
        // ),
        // editable: true,
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




// const CustomRenderCellComponent = ({ value } : {value:any} ) => {
const CustomRenderCellComponent = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // const CustomRenderCellComponent = (props:any) => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <div>{params.value}</div>
            <ArrowDropDown />
        </Box>
    )
}