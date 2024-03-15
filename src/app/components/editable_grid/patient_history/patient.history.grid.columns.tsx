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
    GridActionsCellItem,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
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


// const CustomRenderCellComponent = ({ value } : {value:any} ) => {
export const CustomRenderCellComponent = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
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