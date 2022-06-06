import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const SeatBox = styled(Paper)(({ theme}) => ({
    backgroundColor: 'green',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin:theme.spacing(.4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  export default SeatBox