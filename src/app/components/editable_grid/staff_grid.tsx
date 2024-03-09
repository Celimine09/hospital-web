import * as React from 'react';
import {
    DataGrid,
    GridRowModel,
    GridColDef,
    GridRowId,
    GridRowsProp,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface User {
    name: string;
    age: number;
    id: GridRowId;
    dateCreated: Date;
    lastLogin: Date;
}

const useFakeMutation = () => {
    return React.useCallback(
        (user: Partial<User>) =>
            new Promise<Partial<User>>((resolve, reject) => {
                setTimeout(() => {
                    if (user.name?.trim() === '') {
                        reject(new Error("Error while saving user: name can't be empty."));
                    } else {
                        resolve({ ...user, name: user.name?.toUpperCase() });
                    }
                }, 200);
            }),
        [],
    );
};

const ServerSidePersistence = () => {
    const mutateRow = useFakeMutation();
    const [nameQuery, setNameQuery] = React.useState("");
    const [sexQuery, setSexQuery] = React.useState("");
    const [departmentQuery, setDepartmentQuery] = React.useState("");
    const [specialtyQuery, setSpecialtyQuery] = React.useState("");
    const [scheduleQuery, setScheduleQuery] = React.useState("");
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'
    > | null>(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel) => {
            // Make the HTTP request to save in the backend
            const response = await mutateRow(newRow);
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            return response;
        },
        [mutateRow],
    );

    const handleProcessRowUpdateError = React.useCallback((error: Error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 180,
            editable: true
        },
        {
            field: 'sex',
            headerName: 'Sex',
            editable: true,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'department',
            headerName: 'Department',
            width: 180,
            editable: true,
        },
        {
            field: 'specialty',
            headerName: 'Specialty',
            width: 320,
            editable: true,
        },
        {
            field: 'schedule',
            headerName: 'Schedule',
            width: 120,
            editable: true,
        },
    ];

    const rows: GridRowsProp = [
        {
            id: 1,
            name: randomTraderName(),
            sex: Math.random() > 0.5 ? 'M' : 'F',
            department: ['Pediatric Center', 'Cardiology', 'Neurology'][Math.floor(Math.random() * 3)],
            specialty: ['Developmental and Behavioral Pediatrics', 'Cardiac Electrophysiology', 'Pediatric Neurosurgery'][Math.floor(Math.random() * 3)],
            schedule: daysOfWeek[Math.floor(Math.random() * 7)],
        },
        {
            id: 2,
            name: randomTraderName(),
            sex: Math.random() > 0.5 ? 'M' : 'F',
            department: ['Pediatric Center', 'Cardiology', 'Neurology'][Math.floor(Math.random() * 3)],
            specialty: ['Developmental and Behavioral Pediatrics', 'Cardiac Electrophysiology', 'Pediatric Neurosurgery'][Math.floor(Math.random() * 3)],
            schedule: daysOfWeek[Math.floor(Math.random() * 7)],
        },
        {
            id: 3,
            name: randomTraderName(),
            sex: Math.random() > 0.5 ? 'M' : 'F',
            department: ['Pediatric Center', 'Cardiology', 'Neurology'][Math.floor(Math.random() * 3)],
            specialty: ['Developmental and Behavioral Pediatrics', 'Cardiac Electrophysiology', 'Pediatric Neurosurgery'][Math.floor(Math.random() * 3)],
            schedule: daysOfWeek[Math.floor(Math.random() * 7)],
        },
        {
            id: 4,
            name: randomTraderName(),
            sex: Math.random() > 0.5 ? 'M' : 'F',
            department: ['Pediatric Center', 'Cardiology', 'Neurology'][Math.floor(Math.random() * 3)],
            specialty: ['Developmental and Behavioral Pediatrics', 'Cardiac Electrophysiology', 'Pediatric Neurosurgery'][Math.floor(Math.random() * 3)],
            schedule: daysOfWeek[Math.floor(Math.random() * 7)],
        },
        {
            id: 5,
            name: randomTraderName(),
            sex: Math.random() > 0.5 ? 'M' : 'F',
            department: ['Pediatric Center', 'Cardiology', 'Neurology'][Math.floor(Math.random() * 3)],
            specialty: ['Developmental and Behavioral Pediatrics', 'Cardiac Electrophysiology', 'Pediatric Neurosurgery'][Math.floor(Math.random() * 3)],
            schedule: daysOfWeek[Math.floor(Math.random() * 7)],
        },
    ];

    const filteredRows = React.useMemo(() => {
        let filtered = rows;
        if (nameQuery) {
            filtered = filtered.filter(row => row.name.toLowerCase().includes(nameQuery.toLowerCase()));
        }
        if (sexQuery) {
            filtered = filtered.filter(row => row.sex.toString().toLowerCase().includes(sexQuery.toLowerCase()));
        }
        if (departmentQuery) {
            filtered = filtered.filter(row => row.department.toString().toLowerCase().includes(departmentQuery.toLowerCase()));
        }
        if (specialtyQuery) {
            filtered = filtered.filter(row => row.specialty.toString().toLowerCase().includes(specialtyQuery.toLowerCase()));
        }
        if (scheduleQuery) {
            filtered = filtered.filter(row => row.schedule.toString().toLowerCase().includes(scheduleQuery.toLowerCase()));
        }
        return filtered;
    }, [nameQuery, sexQuery, departmentQuery, specialtyQuery, scheduleQuery]);

    return (
        <div>
            <div style={{ display: 'flex', marginBottom: 10 }}>
                <TextField
                    value={nameQuery}
                    onChange={(e) => setNameQuery(e.target.value)}
                    label="Search by Name"
                    variant="outlined"
                    size="small"
                    style={{ marginRight: 10 }}
                />
                <TextField
                    value={sexQuery}
                    onChange={(e) => setSexQuery(e.target.value)}
                    label="Search by Sex"
                    variant="outlined"
                    size="small"
                    style={{ marginRight: 10 }}
                />
                <TextField
                    value={departmentQuery}
                    onChange={(e) => setDepartmentQuery(e.target.value)}
                    label="Search by Department"
                    variant="outlined"
                    size="small"
                    style={{ marginRight: 10 }}
                />
                <TextField
                    value={specialtyQuery}
                    onChange={(e) => setSpecialtyQuery(e.target.value)}
                    label="Search by Specialty"
                    variant="outlined"
                    size="small"
                    style={{ marginRight: 10 }}
                />
                <TextField
                    value={scheduleQuery}
                    onChange={(e) => setScheduleQuery(e.target.value)}
                    label="Search by Schedule"
                    variant="outlined"
                    size="small"
                    style={{ marginRight: 10 }}
                />
                <IconButton aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                />
            </div>
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

export default ServerSidePersistence;
