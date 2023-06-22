import { FormControl, MenuItem, Select } from '@mui/material';
import { colors } from '../utils';

interface ColorPickerProps {
  selectedColor: string;
  handleColorChange: (color: string) => void;
}

const styleDivColor = (color: string) => ({
  background: color,
  width: '25px',
  color: 'transparent',
  borderRadius: '50%',
  fontSize: '16px',
  margin: '0 auto',
})

export default function ColorPicker(props: ColorPickerProps) {
  return (
    <FormControl>
      <label>Cor</label>
      <Select
        variant='outlined'
        size='small'
        id="colorPicker"
        className='glass'
        sx={{ width: 70}}
        value={props.selectedColor}
        onChange={(event) => {
          props.handleColorChange(event.target.value as string);
        }}
      >
        {colors.map((color) => (
          <MenuItem key={color} value={color}>
            <div 
            style={styleDivColor(color)}
            >.</div>
          </MenuItem>
        ))}
      </Select>
    </FormControl >

  )
}
