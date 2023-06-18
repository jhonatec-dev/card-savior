import { FormControl, MenuItem, Select } from '@mui/material';
import { colors } from '../utils';

interface ColorPickerProps {
  selectedColor: string;
  handleColorChange: (color: string) => void;
}

const styleDivColor = (color: string) => ({
  background: color,
  width: '30px',
  color: 'transparent',
  borderRadius: '50%',
  fontSize: '20px',
  margin: '0 auto',
})

export default function ColorPicker(props: ColorPickerProps) {
  return (
    <FormControl>
      <label>Cor</label>
      <Select
        variant='outlined'
        id="colorPicker"
        className='glass'
        sx={{ width: 80}}
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
