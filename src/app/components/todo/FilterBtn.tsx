import { Button } from "@mui/material";

export default function FilterBtn(props:any) {
    return (
        <Button 
            type='button' 
            onClick={() => props.setFilter(props.name)}
            variant="outlined"
            color='warning'
            sx={{marginLeft: '15px', color: '#eb5e28', borderColor: '#eb5e28'}}
        >
            {props.name}
        </Button>
    )
    
}