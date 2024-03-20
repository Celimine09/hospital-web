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
import { TruncateDateToSqlFormat } from '@/app/utils/date.api';

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
    setRows((oldRows) => [...oldRows, {
      id: id,
      p_id: "",
      name: "",
      gender: "",
      birthday: moment().toDate(),
      phone_no: "",
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
  const [rows, setRows] = React.useState<GridRowsProp<IPatient>>([])
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  React.useEffect(() => {
    axios.get(`${baseHost}/api/patient`)
      .then((response) => {
        const patientData = response.data.patient.map((row: { p_id: any; name: any; gender: any; birthday: any; phone_no: any; }) => ({
          id: row.p_id, // Map p_id to id
          name: row.name,
          gender: row.gender,
          birthday: row.birthday,
          phone_no: row.phone_no
        }));
        setRows(patientData);
      })
      .catch((error) => {
        console.error('Error fetching staff data:', error);
      });
  }, []);

  const refreshData = () => {
    axios.get(`${baseHost}/api/patient`)
      .then((response) => {
        const patientData = response.data.patient.map((row: { p_id: any; name: any; gender: any; birthday: any; phone_no: any; }) => ({
          id: row.p_id, // Map p_id to id
          name: row.name,
          gender: row.gender,
          birthday: row.birthday,
          phone_no: row.phone_no
        }));
        setRows(patientData);
      })
      .catch((error) => {
        console.error('Error fetching staff data:', error);
      });
  };

  const useFakeMutation = () => {
    return React.useCallback(
      (newRowToUpdate: Partial<IPatient>) =>
        new Promise<Partial<IPatient>>((resolve, reject) => {
          console.log("Updating row ...")
          console.log(newRowToUpdate)
          setTimeout(() => {
            //  ! this caused double row -> fix by add bool : isCreatingNewRow
            if (newRowToUpdate.isNew) {
              axios.post(`${baseHost}/api/patient`,
                {
                  ...newRowToUpdate,
                  birthday: TruncateDateToSqlFormat(newRowToUpdate.birthday),
                  //isNew: false,                            
                }
              ).then((res) => {
                console.log(res.data)
                // setIsCreatingNewRow(false)
                refreshData();
              }).catch((err) => {
                console.error(err)
                // setIsCreatingNewRow(false)
              })
              newRowToUpdate.isNew = false
            }
            else {
              axios.put(`${baseHost}/api/patient`,
                {
                  ...newRowToUpdate,
                  birthday: TruncateDateToSqlFormat(newRowToUpdate.birthday),
                  p_id: id,
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
          }, 500);
        }),
      [],
    );
  };

  const mutateRow = useFakeMutation();

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
    refreshData();
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
        refreshData();
      }
    }).catch((err) => {
      console.error(err)
    })
  };

  const handleCancelClick = (id: GridRowId) => () => {
    const editedRow = rows.find((row) => row.p_id == id);
    if (editedRow && editedRow.isNew) {
      setRows(rows.filter((row) => row.p_id !== id));
    }
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
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

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      editable: true,
      type: 'string'
    },
    {
      field: 'gender',
      headerName: 'Gender',
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
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
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