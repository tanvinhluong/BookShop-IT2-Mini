import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import logo from './assets/moji-logo.png'

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src={logo}
          alt="Logo"
          style={{ width: 60, height: 40, marginRight: 16 }}
        />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search…"
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Header
