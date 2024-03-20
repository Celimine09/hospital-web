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
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import axios, { AxiosResponse } from 'axios';
import moment from "moment"
import { randomNumberBetween } from '@mui/x-data-grid/utils/utils';
import { baseHost } from '@/app/constants/URLs';
import { getPatientsNames } from '@/app/service/patients.service';
import { StripedDataGrid } from '../striped_datagrid';
// import { patientNames, roomColumns, setPatientsName, setStaffsName, staffNames } from './room.grid.columns';
import { getStaffsName } from '@/app/service/stafff.service';
import { setPatientsAndStaffDropdownData } from '@/app/utils/patient.staff.helper';
import { IPatient, ResponsePatient } from '@/app/interfaces/IPatient';

export var patientSex: string[] = ["F", "M"]
export const setPatientsSex = (pns: string[]) => {
  patientSex = pns
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
    setRows((oldRows) => [...oldRows, { id: id, name: '', age: '', isNew: true }]);
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

const useFakeMutation = () => {
  return React.useCallback(
    // (oldRoomToMutate: Partial<IRoom>) =>
    //     new Promise<Partial<IRoom>>((resolve, reject) => {
    (editedRow: Partial<any>) =>
      new Promise<Partial<any>>((resolve, reject) => {
        console.log("updated row ...".bgMagenta)
        setTimeout(() => {
          console.log(editedRow)

          if (!editedRow.isnew) { // Check if editedRow is not undefined
            axios.put(`${baseHost}/api/patient`, {
              p_id: editedRow.p_id,
              name: editedRow.name,
              gender: editedRow.gender,
              birthday: editedRow.birthday,
              phone_no: editedRow.phone_no
            })
              .then((res) => {
                console.log("Patient member updated successfully:", res.data);
                // You might want to handle success feedback here
              })
              .catch((err) => {
                console.error("Error updating patient member:", err);
                // Handle error feedback here
              });
          } else {
            axios.put(`${baseHost}/api/patient/patients`,
              {
                ...editedRow,
              }
            ).then((res) => {
              console.log(res)
              if (res.data.status === "success") {
                console.log("updated row")
                editedRow.isNew = false
                resolve({ ...editedRow })
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

          console.log("request to changing patient from room")
          resolve({ ...editedRow })
        }, 2000);
      }),
    [],
  );
};

const FullFeaturedCrudGrid: React.FC = () => {
  const [rows, setRows] = React.useState<GridRowsProp<IPatient>>([])
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  axios.get(`${baseHost}/api/patient`).then((res: AxiosResponse<ResponsePatient>) => {
    if (res.data.patient) {
      const modifiedRows = res.data.patient.map((pt: IPatient) => {
        return {
          ...pt,
          p_id: pt.p_id,
          name: pt.name,
          gender: pt.gender,
          birthday: moment(pt.birthday).toDate(),
          phone_no: pt.phone_no
        }
      })
      setRows(modifiedRows)
      setSnackbar({
        children: "Retrieved rooms data from server.",
        severity: "success"
      })
    }
  }).catch((err: any) => {
    console.log("Error getting room data from backend.")
    setSnackbar({
      children: "Can not retrive rooms data from server...",
      severity: "error"
    })
  })
  const mutateRow = useFakeMutation();
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    const editedRow = rows.find((row) => row.p_id === id);

    console.log(editedRow)

    if (editedRow) { // Check if editedRow is not undefined
      axios.put(`${baseHost}/api/patient`, {
        p_id: editedRow.p_id,
        name: editedRow.name,
        gender: editedRow.gender,
        birthday: editedRow.birthday,
        phone_no: editedRow.phone_no
      })
        .then((res) => {
          console.log("Patient member updated successfully:", res.data);
        })
        .catch((err) => {
          console.error("Error updating patient member:", err);
        });
    } else {
      console.error("Edited row not found or is undefined.");
    }
    console.log(rowModesModel)
  };

  const handleSaveClick = (id: GridRowId) => () => {
    const editedRow = rows.find((row) => row.p_id === id);
    console.log(editedRow)
    if (editedRow) {
      const requestData = {
        p_id: editedRow.p_id,
        name: editedRow.name,
        gender: editedRow.gender,
        birthday: editedRow.birthday,
        phone_no: editedRow.phone_no
      };
      axios.put(`${baseHost}/api/patient/${editedRow.p_id}`, requestData)
        .then((res) => {
          console.log("Patient member updated successfully:", res.data);
        })
        .catch((err) => {
          console.error("Error updating patient member:", err);
        });
    } else {
      console.error("Edited row not found or is undefined.");
      // Handle error feedback here
    }
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.p_id !== id));

    console.log(`row to delete is ${id}`)
    axios.delete(`${baseHost}/api/patient`, {
      data: {
        "p_id": id
      }
    }).then((res) => {
      console.log("Delete patient ?")
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

    const editedRow = rows.find((row) => row.p_id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.p_id !== id));
    }
  };

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

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'p_id',
      headerName: 'ID',
      type: 'string',
      width: 70,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      editable: true,
      type: 'string'
    },
    {
      field: 'gender',
      headerName: 'Sex',
      type: 'singleSelect',
      width: 130,
      editable: true,
      valueOptions: ({ row }) => {
        if (patientSex !== null)
          return patientSex
        return ["F", "M"]
      },
    },
    {
      field: 'birthday',
      headerName: 'Birthday',
      type: 'date',
      width: 230,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'phone_no',
      headerName: 'Tel.',
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
        getRowId={(row) => row.p_id}
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
            setRows, setRowModesModel, toolbar: {
            }
          },
        }}
      />
    </Box>
  );
};

export default FullFeaturedCrudGrid;