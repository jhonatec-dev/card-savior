import { Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, FilledInput, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatButton from "../components/FloatButton";


export default function EditProfile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSave = () => {
    console.log('save');
  }

  return (
    <div className="Wrapper">
      <div className="UserProfile">
        <Avatar sx={{ width: 100, height: 100 }} />
        <FilledInput placeholder="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
        <FilledInput
          placeholder="Password"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          // maxLength={20}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <IconButton onClick={() => setShowPassword(!showPassword)} color="primary">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }/>
      </div>
      <div className="Cards">
      </div>
      <FloatButton handleClick={handleSave} icon={<Save />} text="Save"/>
    </div>
  )
}
