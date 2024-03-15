'use client'
import * as React from 'react';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModel,
    GridRowModesModel,
    GridRowsProp,
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import axios from 'axios';
import moment from "moment"
import { baseHost } from '@/app/constants/URLs';
import { getPatientsHistory } from '@/app/service/patients.service';
import { StripedDataGrid } from '../striped_datagrid';
import { patientNames, setPatientsName, setStaffsName, staffNames, CustomRenderCellComponent } from './patient.history.grid.columns';
import { IPatientHistory } from '@/app/interfaces/IPatient';
import { TruncateDateToSqlFormat } from '@/app/utils/date.api';
import { HistoryEditToolbar } from './patient.history.grid.edit';
import { GridRowModes } from '@mui/x-data-grid';
import { setPatientsAndStaffDropdownData } from '@/app/utils/patient.staff.helper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { exit } from 'process';



// export default function ServerSidePersistence() {
export default function PatientHistoryTable() {
    const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'
    > | null>(null);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [isCreatingNewRow, setIsCreatingNewRow] = React.useState<boolean>(false);
    const useFakeMutation = () => {
        return React.useCallback(
            (newRowToUpdate: Partial<IPatientHistory>) =>
                new Promise<Partial<IPatientHistory>>((resolve, reject) => {
                    console.log("Updating row ...")
                    console.log(newRowToUpdate)
                    setTimeout(() => {
                        //  ! this caused double row -> fix by add bool : isCreatingNewRow
                        if (newRowToUpdate.isNew) {
                            console.log("POST HIS")
                            axios.post(`${baseHost}/api/patient/patients/history`,
                                {
                                    ...newRowToUpdate,
                                    admission_date: TruncateDateToSqlFormat(newRowToUpdate.admission_date),
                                    discharge_date: TruncateDateToSqlFormat(newRowToUpdate.discharge_date)
                                }
                            ).then((res) => {
                                console.log(res.data)
                                // setIsCreatingNewRow(false)
                            }).catch((err) => {
                                console.error(err)
                                // setIsCreatingNewRow(false)
                            })
                            newRowToUpdate.isNew = false
                        }
                        else
                        {
                            console.log("PUT HIS")
                            axios.put(`${baseHost}/api/patient/patients/history`,
                                {
                                    ...newRowToUpdate,
                                    admission_date: TruncateDateToSqlFormat(newRowToUpdate.admission_date),
                                    discharge_date: TruncateDateToSqlFormat(newRowToUpdate.discharge_date)
                                }
                            ).then((res) => {
                                console.log(res)
                                if (res.data.status === "success") {
                                    console.log("updated row")
                                    newRowToUpdate.isNew = false
                                    resolve({ ...newRowToUpdate })
                                }
                                else {
                                    console.log("Error updating row")
                                    console.log(res.data)
                                    // newRowToUpdate.isNew = false
                                    // reject({...newRowToUpdate})
                                    reject(res.data.error)
                                }
                            }).catch((err) => {
                                console.log(err)
                                // reject({...newRowToUpdate})
                                reject(err)
                            })

                        }



                    }, 800);
                    // }, 2000);
                }),
            [],
        );
    };

    const mutateRow = useFakeMutation();


    // let rows: GridRowsProp<IRoom> = []
    const [rows, setRows] = React.useState<GridRowsProp<IPatientHistory>>([])
    // const [rows, setRows] = React.useState<IResponseFromGetPatientHistory[]>([])


    const getData = async () => {
        const patientsHistory: null | IPatientHistory[] = await getPatientsHistory()
        console.log("content loaded from api is ")
        console.log(patientsHistory)
        if (patientsHistory !== null) {
            // const flatHistory : IPatientHistoryFlatten = {
            //     id : patientsHistory
            // }
            setRows(patientsHistory.map((ph) => {
                return { ...ph, isNew: false }
            }))
            // setRows(patientsHistory)
            setSnackbar({ children: 'Data has been loaded', severity: 'success' });
        }
        else {
            setSnackbar({ children: 'Failed Load data from Server', severity: 'error' });
        }
    }
    const patientHistoryColumns: GridColDef[] = [
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
            field: 'bill_price',
            headerName: 'Bill price',
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
            field: "actions",
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }: any) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                // console.log("getting actions of history")

                // todo : is this click -> create or update

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            }



        }
    ];


    React.useEffect(() => {
        // todo : retrive data from backend
        getData()
        setPatientsAndStaffDropdownData(setPatientsName, setStaffsName, patientNames, staffNames)

    }, [])

    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = async (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        const response = await mutateRow(newRow);
        setSnackbar({ children: 'User successfully saved', severity: 'success' });
        console.log("res from fake mutate")
        console.log(response)
        return response;
        return updatedRow;
    };


    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    // const handleSaveClick = (id: GridRowId, isCreateNew: boolean) => async () => {
    const handleSaveClick = (id: GridRowId) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));

        console.log(`row to delete is ${id}`)
        axios.delete(`${baseHost}/api/patient/patients/history`, {
            data: {
                "history_id": id
            }
        }).then((res) => {
            console.log("Delete history ?")
            console.log(res)
            if (res.data.status == "success") {
                // todo : rerender this page
            }
        }).catch((err) => {
            console.error(err)
        })
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };
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
            {/* <StripedDataGrid */}
            <DataGrid
                rows={rows}
                columns={patientHistoryColumns}
                // processRowUpdate={() => {console.log("updated")}}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                // slots={{ toolbar: GridToolbar }}
                slots={{ toolbar: HistoryEditToolbar }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel, isCreatingNewRow, setIsCreatingNewRow },
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                editMode='row'
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
            />
            {/* {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )} */}
        </div>
    );
}
