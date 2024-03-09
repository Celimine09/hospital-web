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
    const [birthdayQuery, setBirthdayQuery] = React.useState("");
    const [telnumberQuery, setTelnumberQuery] = React.useState("");
    const [addressQuery, setAddressQuery] = React.useState("");
    const randomAddresses = [
        '1234 Random St, Random City',
        '5678 Mystery Ave, Mystery Town',
        '91011 Secret Blvd, Secret Village'
    ];
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
            field: 'birthday',
            headerName: 'Birthday',
            type: 'date',
            width: 130,
            editable: true,
        },
        {
            field: 'telnumber',
            headerName: 'Tel-number',
            width: 130,
            editable: true,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 320,
            editable: true,
        },
    ];

    const rows: GridRowsProp = [
        {
            id: 1,
            name: randomTraderName(),
            sex: Math.random() > 0.5 ? 'M' : 'F',
            birthday: randomCreatedDate(),
            telnumber: '0' + Math.random().toString().slice(2, 11),
            address: randomAddresses[Math.floor(Math.random() * 3)],
        },
        {
            id: 2,
            name: randomTraderName(),
            sex: Math.random() > 0.5 ? 'M' : 'F',
            birthday: randomCreatedDate(),
            telnumber: '0' + Math.random().toString().slice(2, 11),
            address: randomAddresses[Math.floor(Math.random() * 3)],
        },
        {
            id: 3,
            name: randomTraderName(),
            sex: Math.random() > 0.5 ? 'M' : 'F',
            birthday: randomCreatedDate(),
            telnumber: '0' + Math.random().toString().slice(2, 11),
            address: randomAddresses[Math.floor(Math.random() * 3)],
        },
        {
            id: 4,
            name: randomTraderName(),
            sex: Math.random() > 0.5 ? 'M' : 'F',
            birthday: randomCreatedDate(),
            telnumber: '0' + Math.random().toString().slice(2, 11),
            address: randomAddresses[Math.floor(Math.random() * 3)],
        },
        {
            id: 5,
            name: randomTraderName(),
            sex: Math.random() > 0.5 ? 'M' : 'F',
            birthday: randomCreatedDate(),
            telnumber: '0' + Math.random().toString().slice(2, 11),
            address: randomAddresses[Math.floor(Math.random() * 3)],
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
        if (birthdayQuery) {
            filtered = filtered.filter(row => row.birthday.toString().toLowerCase().includes(birthdayQuery.toLowerCase()));
        }
        if (telnumberQuery) {
            filtered = filtered.filter(row => row.telnumber.toString().toLowerCase().includes(telnumberQuery.toLowerCase()));
        }
        if (addressQuery) {
            filtered = filtered.filter(row => row.address.toString().toLowerCase().includes(addressQuery.toLowerCase()));
        }
        return filtered;
    }, [nameQuery, sexQuery, birthdayQuery, telnumberQuery, addressQuery]);

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
                    value={birthdayQuery}
                    onChange={(e) => setBirthdayQuery(e.target.value)}
                    label="Search by Birthday"
                    variant="outlined"
                    size="small"
                    style={{ marginRight: 10 }}
                />
                <TextField
                    value={telnumberQuery}
                    onChange={(e) => setTelnumberQuery(e.target.value)}
                    label="Search by Tel-number"
                    variant="outlined"
                    size="small"
                    style={{ marginRight: 10 }}
                />
                <TextField
                    value={addressQuery}
                    onChange={(e) => setAddressQuery(e.target.value)}
                    label="Search by Address"
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
