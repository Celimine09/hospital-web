'use client'
import * as React from 'react';
import {
    GridEventListener,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModel,
    GridRowModesModel,
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
import { getPatientsHistory, getPatientsNames} from '@/app/service/patients.service';
import { StripedDataGrid } from '../striped_datagrid';
import { patientNames, patientHistoryColumns, setPatientsName, setStaffsName, staffNames } from './patient.history.grid.columns';
import { getStaffsName } from '@/app/service/stafff.service';
import { IPatientHistory, IResponseFromGetPatientHistory } from '@/app/interfaces/IPatient';
import { getRowIdFromRowModel } from '@mui/x-data-grid/internals';
import { TruncateDateToSqlFormat } from '@/app/utils/date.api';
import { HistoryEditToolbar } from './patient.history.grid.edit';
import { GridRowModes } from '@mui/x-data-grid';



const useFakeMutation = () => {
    return React.useCallback(
        // (oldRoomToMutate: Partial<IRoom>) =>
        //     new Promise<Partial<IRoom>>((resolve, reject) => {
        // (oldRoomToMutate: Partial<any>) =>
        (newRowToUpdate: Partial<IPatientHistory>) =>
            new Promise<Partial<IPatientHistory>>((resolve, reject) => {
                console.log("Updating row ...")
                console.log(newRowToUpdate)
                setTimeout(() => {

                    axios.put(`${baseHost}/api/patient/patients/history`, 
                        {
                            ...newRowToUpdate,
                            admission_date: TruncateDateToSqlFormat(newRowToUpdate.admission_date),
                            discharge_date: TruncateDateToSqlFormat(newRowToUpdate.discharge_date)
                        }
                    ).then((res) => {
                        console.log(res)
                        if (res.data.status === "success")
                        {
                            console.log("updated row")
                            resolve({ ...newRowToUpdate })
                        }
                        else
                        {
                            console.log("Error updating row")
                            console.log(res.data)
                            // reject({...newRowToUpdate})
                            reject(res.data.error)
                        }
                    }).catch((err) => {
                        console.log(err)
                        // reject({...newRowToUpdate})
                        reject(err)
                    })



                    }, 800);
                // }, 2000);
            }),
        [],
    );
};

// export default function ServerSidePersistence() {
export default function PatientHistoryTable() {
    const mutateRow = useFakeMutation();
    const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'
    > | null>(null);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    // let rows: GridRowsProp<IRoom> = []
    const [rows, setRows] = React.useState<GridRowsProp<IPatientHistory>>([])
    // const [rows, setRows] = React.useState<IResponseFromGetPatientHistory[]>([])


    const getData = async () => {
        const patientsHistory : null | IPatientHistory [] = await getPatientsHistory()
        console.log("content loaded from api is ")
        console.log(patientsHistory)
        if (patientsHistory !== null)
        {
            
            // const flatHistory : IPatientHistoryFlatten = {
            //     id : patientsHistory
            // }
            setRows(patientsHistory)
            setSnackbar({ children: 'Data has been loaded', severity: 'success' });
        }
        else
        {
            setSnackbar({ children: 'Failed Load data from Server', severity: 'error' });
        }
    }

    React.useEffect(() => {
        // todo : retrive data from backend
        getData()

    }, [])

    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = React.useCallback(
        // async (newRow: GridRowModel<IRoom>) => {
        async (newRow: GridRowModel) => {
            // Make the HTTP request to save in the backend
            // console.log("updated")
            const response = await mutateRow(newRow);
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            console.log("res from fake mutate")
            console.log(response)
            return response;
            // return {id: getRowIdFromRowModel(newRow)};
            // return {id:};
        },
        [mutateRow],
    );

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        // const editedRow = rows.find((row) => row.id === id);
        // if (editedRow!.isNew) {
        //     setRows(rows.filter((row) => row.id !== id));
        // }
    };

    // const processRowUpdate = (newRow: GridRowModel) => {
    //     const updatedRow = { ...newRow, isNew: false };
    //     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    //     return updatedRow;
    // };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleProcessRowUpdateError = React.useCallback((error: Error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    return (
        // <div style={{ height: 400, width: '100%' }}>
        <div style={{ height: '80vh', width: '100%' }}>
            {/* <StriptedData */}
            <StripedDataGrid
                rows={rows}
                columns={patientHistoryColumns}
                // processRowUpdate={() => {console.log("updated")}}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                // slots={{ toolbar: GridToolbar }}
                slots={{ toolbar: HistoryEditToolbar }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                editMode='row'
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
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
