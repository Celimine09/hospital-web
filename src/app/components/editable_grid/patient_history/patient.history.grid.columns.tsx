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
    GridRowModesModel,
    GridToolbarContainer,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import axios from 'axios';
import moment from 'moment';
import AddIcon from '@mui/icons-material/Add';

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
        headerName: "Delete History",
        // renderEditCell: (params: GridRenderEditCellParams) => (
        //     <CustomEditComponent {...params} />
        // ),
        // editable: true,
        renderCell: (params: GridRenderCellParams) => {
            // const _onClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const _onClick = () => {
                axios.delete(`${baseHost}/api/patient/patients/history`, {
                    params: {
                        "history_id": params.row.history_id
                    }
                }).then((res) => {
                    console.log("Delete history ?")
                    if (res.data.status == "success")
                    {
                        // todo : rerender this page
                    }
                    console.log(res)
                }).catch((err) => {
                    console.error(err)
                })
            };
            return <Button variant='outlined' color='success'
                onClick={(e) => _onClick()}
                size='small'
            >
                Delete
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