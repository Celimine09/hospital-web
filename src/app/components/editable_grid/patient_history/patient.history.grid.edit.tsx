
// interface EditToolbarProps {
//     setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
//     setRowModesModel: (
//         newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
//     ) => void;
// }

// function EditToolbar(props: EditToolbarProps) {
//     const { setRows, setRowModesModel } = props;

//     const handleClick = () => {
//         const id = randomId();
//         setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
//         setRowModesModel((oldModel) => ({
//             ...oldModel,
//             [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//         }));
//     };

//     return (
//         <GridToolbarContainer>
//             <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//                 Add record
//             </Button>
//         </GridToolbarContainer>
//     );
// }
