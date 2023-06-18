import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { colors } from '../utils/helpers';

interface ColorPickerProps {
  selectedColor: string;
  handleColorChange: (color: string) => void;
}

export default function ColorPicker(props: ColorPickerProps) {
  return (
    <FormControl>
      <InputLabel id="colorPicker">Cor de fundo</InputLabel>
      <Select
        variant='filled'
        id="colorPicker"
        sx={{ width: 100 }}
        value={props.selectedColor}
        onChange={(event) => {
          props.handleColorChange(event.target.value as string);
        }}
      >
        {colors.map((color) => (
          <MenuItem key={color} value={color}>
            <div style={{ background: color, width: '100%', color: 'transparent' }}>{color}</div>
          </MenuItem>
        ))}
      </Select>
    </FormControl >

  )
}
