import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

const authURL = 'https://devies-reads-be.onrender.com/auth/';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [userInput, setUserInput] = useState('');

  const [passwordInput, setPasswordInput] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = () => {
      fetch(`${authURL}login`, {
          method: 'POST',
          headers: {
              'Content-Type':'application/json'
          },
          mode: 'cors',
          body: JSON.stringify({username: userInput, password: passwordInput})
      }).catch((err) => {
          console.log(err.message);
      }).then((response) => {
          if (response.ok)
              router.push('/.')
      })
  };

  const handleRegister = () => {
          fetch(`${authURL}register`, {
              method: 'POST',
              headers: {
                  'Content-Type':'application/json'
              },
              mode: 'cors',
              body: JSON.stringify({username: userInput, password: passwordInput})
          }).catch((err) => {
              console.log(err.message);
          });
  };

  const renderForm = (
    <>
      <Stack spacing={3} justifyContent="flex-end" sx={{ my: 3 }}>
        <TextField name="email" label="Email address" onChange={(e)=>setUserInput(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          onChange={(e)=>setPasswordInput(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack spacing={2}>
          <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={handleAuth}
          >
              Login
          </LoadingButton>
          <LoadingButton
              fullWidth
              size="small"
              type="submit"
              variant="outlined"
              color="inherit"
              onClick={handleRegister}
          >
              Create user
          </LoadingButton>

      </Stack>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9)
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Devies reads</Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
