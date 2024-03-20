'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridToolbar,
    GridValidRowModel,
} from '@mui/x-data-grid';
import {
    randomId,
} from '@mui/x-data-grid-generator';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import axios, { AxiosResponse } from 'axios';
import moment from "moment"
import { randomNumberBetween } from '@mui/x-data-grid/utils/utils';
import { baseHost } from '@/app/constants/URLs';
import { getPatientsNames } from '@/app/service/patients.service';
import { StripedDataGrid } from '../striped_datagrid';
import { getStaffsName } from '@/app/service/stafff.service';
import { setPatientsAndStaffDropdownData } from '@/app/utils/patient.staff.helper';
import { IStaff, ResponseStaff } from '@/app/interfaces/IStaff';
import { useState } from 'react';

export var staffSex: string[] = ["F", "M"]
export const setPatientsSex = (pns: string[]) => {
    staffSex = pns
}
interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

const EditToolbar: React.FC<EditToolbarProps> = ({ setRows, setRowModesModel }) => {
    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, {
            id: id,
            s_id:"",
            name: "",
            gender: "",
            role_id: "",
            role_name: "",
            isNew: true
        }]
        );
        
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <><GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer><GridToolbar /></>
    );
};



const FullFeaturedCrudGrid: React.FC = () => {
    const [isCreatingNewRow, setIsCreatingNewRow] = React.useState<boolean>(false);
    const [rows, setRows] = React.useState<GridRowsProp<IStaff>>([]);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    React.useEffect(() => {
        axios.get(`${baseHost}/api/staff`)
            .then((response) => {
                const staffData = response.data.staff.map((row: { s_id: any; name: any; gender: any; role_id: any; role_name: any; }) => ({
                    id: row.s_id, // Map s_id to id
                    name: row.name,
                    gender: row.gender,
                    role_id: row.role_id,
                    role_name: row.role_name
                }));
                setRows(staffData);
            })
            .catch((error) => {
                console.error('Error fetching staff data:', error);
            });
    }, []);
const useFakeMutation = () => {
    return React.useCallback(
        (newRowToUpdate: Partial<IStaff>) =>
            new Promise<Partial<IStaff>>((resolve, reject) => {
                console.log("Updating row ...")
                console.log(newRowToUpdate)
                setTimeout(() => {
                    //  ! this caused double row -> fix by add bool : isCreatingNewRow
                    if (newRowToUpdate.isNew) {
                        console.log("POST HIS")
                        axios.post(`${baseHost}/api/staff`,
                            {
                                ...newRowToUpdate,
                                
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
                        axios.put(`${baseHost}/api/staff`,
                            {
                                ...newRowToUpdate,
                               
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
                },800);
            }),
        [],
    );
};

const mutateRow = useFakeMutation();
    // Handle edit, save, delete, and cancel click events...

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
        setRows(rows.filter((row) => row.s_id !== id));

        console.log(`row to delete is ${id}`)
        axios.delete(`${baseHost}/api/staff`, {
            data: {
                "s_id": id
            }
        }).then((res) => {
            console.log("Delete staff ?")
            console.log(res)
            if (res.data.status == "success") {
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

        const editedRow = rows.find((row) => row.s_id == id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.s_id !== id));
        }
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        const response = await mutateRow(newRow);
        console.log("res from fake mutate")
        console.log(response)
        return response;
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 250, editable: true },
        {
            field: 'gender',
            headerName: 'Gender',
            type: 'singleSelect',
            width: 130,
            editable: true,
            valueOptions: ({ row }) => {
                if (staffSex !== null)
                    return staffSex
                return ["F", "M"]
            },
        },
        {
            field: 'role_id',
            headerName: 'Role_ID',
            type: 'int',
            width: 70,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'role_name',
            headerName: 'Role_Name',
            width: 230,
            editable: true,
            type: 'string',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

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
            },
        }
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar
                }}
                slotProps={{
                    toolbar: {
                        setRows, setRowModesModel, isCreatingNewRow, setIsCreatingNewRow
                    },
                }}
            />
        </Box>
    );
};

export default FullFeaturedCrudGrid;
