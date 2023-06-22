import { Fab } from '@mui/material';
import React, { useState } from 'react';

interface FloatButtonProps {
  icon: React.ReactNode,
  text?: string,
  handleClick: () => void
}

export default function FloatButton(props: FloatButtonProps) {
  const { text, handleClick, icon } = props
  const [showText, setShowText] = useState(false);

  const handleHover = () => {
    if(text)
    setShowText(true);
  }

  const handleLostFocus = () => {
    setShowText(false);
  }
  
  return (
    <Fab sx={{ position: 'fixed', bottom: 16, right: 16}}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLostFocus}
      variant={showText ? 'extended' : 'circular'}
      color="primary"
    >
      {icon}
      {showText && <span>{text}</span>}
    </Fab>
  )
}
