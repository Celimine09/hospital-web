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
    const [ageQuery, setAgeQuery] = React.useState("");
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
            field: 'age',
            headerName: 'Age',
            type: 'number',
            editable: true,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'dateCreated',
            headerName: 'Date Created',
            type: 'date',
            width: 180,
            editable: true,
        },
        {
            field: 'lastLogin',
            headerName: 'Last Login',
            type: 'dateTime',
            width: 220,
            editable: true,
        },
    ];

    const rows: GridRowsProp = [
        {
            id: 1,
            name: 'randomTraderName()',
            age: 25,
            dateCreated: randomCreatedDate(),
            lastLogin: randomUpdatedDate(),
        },
        {
            id: 2,
            name: 'T',
            age: 36,
            dateCreated: randomCreatedDate(),
            lastLogin: randomUpdatedDate(),
        },
        {
            id: 3,
            name: randomTraderName(),
            age: 19,
            dateCreated: randomCreatedDate(),
            lastLogin: randomUpdatedDate(),
        },
        {
            id: 4,
            name: randomTraderName(),
            age: 28,
            dateCreated: randomCreatedDate(),
            lastLogin: randomUpdatedDate(),
        },
        {
            id: 5,
            name: randomTraderName(),
            age: 23,
            dateCreated: randomCreatedDate(),
            lastLogin: randomUpdatedDate(),
        },
    ];

    const filteredRows = React.useMemo(() => {
        let filtered = rows;
        if (nameQuery) {
            filtered = filtered.filter(row => row.name.toLowerCase().includes(nameQuery.toLowerCase()));
        }
        if (ageQuery) {
            filtered = filtered.filter(row => row.age.toString().toLowerCase().includes(ageQuery.toLowerCase()));
        }
        return filtered;
    }, [nameQuery, ageQuery]);

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
                    value={ageQuery}
                    onChange={(e) => setAgeQuery(e.target.value)}
                    label="Search by Age"
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
