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

import Iconify from '../../components/iconify/Iconify';

import { useRouter } from '../../routes/hooks';

import { emailValidator, passwordValidator } from '../../utils/validations';
import { http_Request } from '../../utils/HTTP_Request';
import { API_URL } from '../../shared/API_URLS';

import './login.css';

// ----------------------------------------------------------------------

const Login = () => {
  // initial values
  const initialFormValues = {
    name:"",
    email:"",
    password:""
  }
  const initialFormErrors = {
    name:false, 
    email:false, 
    password:false
  }

  // use router 
  const router = useRouter();

  // Local states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData,setFormData] = useState(initialFormValues);
  const [formErrors,setFormErrors] = useState(initialFormErrors);
  const [isMistypedInput, setIsMistypedInput] = useState("");

  // function for handle user inputs
  const inputOnchangeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
    setFormErrors({...formErrors, [e.target.name]:false});
    setIsMistypedInput("");
  }

  // function for handle login/signin view mode  
  const formViewHandler = () => {
    setFormErrors(initialFormErrors);
    setFormData(initialFormValues);
    setIsLoginView(!isLoginView);
  }

  // function for handle from submit btn click
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
    if (!emailValidator(formData?.email)) {
      tempFormErrors = {...tempFormErrors, ['email']: true}
    }
    if (!passwordValidator(formData?.password)) {
      tempFormErrors = {...tempFormErrors, ['password']: true}
    }
    setFormErrors(tempFormErrors);     

    if(!tempFormErrors?.email && !tempFormErrors?.password && isLoginView){
      loginSubmit()
    }else if(!tempFormErrors?.email && !tempFormErrors?.password && !tempFormErrors?.name && !isLoginView){
      signupSubmit()
    }
  }

  // API integration for user login
  const loginSubmit = () => {
    let loginSubmitData = {
      email: formData.email,
      password: formData.password
    }
    http_Request(
      {
        url: API_URL.User.POST_USER_LOGIN,
        method: 'POST',
        bodyData: loginSubmitData,
      },
      function successCallback (response) {    
        if ( response.data.login) {
          localStorage.setItem('jwtToken', response.data.token);
          localStorage.setItem('user', JSON.stringify( response.data.user));
          router.push('/dashboard');
        }      
      },
      function errorCallback (error) {
        setIsMistypedInput(error?.response?.data?.message || "")
      }
    )
  }

  // API integration for user Signin
  const signupSubmit = () => {
    let signupSubmitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }
    http_Request(
      {
        url: API_URL.User.POST_USER_SIGNUP,
        method: 'POST',
        bodyData: signupSubmitData,
      },
      function successCallback (response) {
        if ( response.data.signup) {
          localStorage.setItem('jwtToken',response.data.token);
          localStorage.setItem('user', JSON.stringify({userId: response.data.id, name: signupSubmitData.name}));
          router.push('/dashboard');
        }        
      },
      function errorCallback (error) {
        console.log('error', error)
      }
    )
  }

  const emailInvalidMsg = (
    <Box>
      <Typography className='validation-msg-typo'>
        Please enter a valid e-mail
      </Typography>
    </Box>
  )

  const passwordInvalidMsg = (
    <Box>
      <Typography className='validation-msg-typo'>
        Your password must contain, <br/>
      </Typography>
      <Typography className='validation-msg-details-typo'>         
        At least 8 characters long, <br/> 
        At least one number, <br/> 
        At least one special character, <br/> 
        At least one uppercase, <br/> 
        At least one lowercase letters.
      </Typography> 
    </Box>
  )

  const renderForm = (
    <>
      <Stack spacing={3}>
        {
          !isLoginView && 
          <TextField
            id='user_name_text_field'
            name="name" 
            label="User name"
            value={formData.name} 
            onChange={(e)=>inputOnchangeHandler(e)}
            error={formErrors.name}
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
        { (formErrors?.email ) && emailInvalidMsg}

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
        { (formErrors?.password ) && passwordInvalidMsg}
      </Stack>      

      <LoadingButton
        name="submit-btn"
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
    <Box className='main-container' sx={{height: 1}}>
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
          { isMistypedInput && 
            <Typography className='mistyped-input-error-msg'>
              {isMistypedInput}
            </Typography> }
        </Card>
      </Stack>
    </Box>
  );
}

export default Login;
