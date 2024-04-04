import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import Logo from '../../components/logo/Logo';
import Iconify from '../../components/iconify/Iconify';

import { useRouter } from '../../routes/hooks';

import { bgGradient } from '../../theme/css';


// ----------------------------------------------------------------------

const Login = () => {
  const initialFormValues = {
    userName:"",
    email:"",
    password:""
  }

  const initialFormErrors = {
    userName:false, 
    email:false, 
    password:false
  }

  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData,setFormData] = useState(initialFormValues);
  const [formErrors,setFormErrors] = useState(initialFormErrors);

  const inputOnchangeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
    setFormErrors({...formErrors, [e.target.name]:false});
  }

  const formViewHandler = () => {
    setFormErrors(initialFormErrors);
    setFormData(initialFormValues);
    setIsLoginView(!isLoginView);
  }

  const formSubmitHandler = () => {
    const tempFormData = formData;
    let tempFormErrors = {name:false, email:false, password:false};

    Object.keys(tempFormData).forEach((item)=> {
      if(tempFormData[item] === ""){
        tempFormErrors = {...tempFormErrors, [item]: true}
      }else{
        tempFormErrors = {...tempFormErrors, [item]: false}
      }
    })
    setFormErrors(tempFormErrors);  

    if(!tempFormErrors?.email && !tempFormErrors?.password && isLoginView){
      loginSubmit()
    }else if(!tempFormErrors?.email && !tempFormErrors?.password && !tempFormErrors?.name && !isLoginView){
      signupSubmit()
    }
  }

  const loginSubmit = () => {
    router.push('/dashboard');
  }

  const signupSubmit = () => {
    router.push('/dashboard');
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        {
          !isLoginView && 
          <TextField
            id='user_name_text_field'
            name="userName" 
            label="User name"
            value={formData.userName} 
            onChange={(e)=>inputOnchangeHandler(e)}
            error={formErrors.userName}
          />
        }

        <TextField
          id='email_text_field'
          name="email" 
          label="Email address"
          value={formData.email} 
          onChange={inputOnchangeHandler}
          error={formErrors.email}
        />

        <TextField
          id='password_field'
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={inputOnchangeHandler}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={formErrors.password}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={()=>{formSubmitHandler()}}
        sx={{ marginTop: '2rem'}}
      >
        {isLoginView ? 'Login' : 'Sign In' }
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
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
          <Typography variant="h4" sx={{textAlign: 'center'}}>Task Manager</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 4 , textAlign: 'center'}}>
            {isLoginView ? 'Don’t have an account?' : 'Already have an account?'}
            <Button 
              variant="subtitle2" 
              sx={{ ml: 0.5}}
              onClick={()=>{formViewHandler()}}
            >
              {isLoginView ? 'Join here' : 'Login' }
            </Button>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}

export default Login;
