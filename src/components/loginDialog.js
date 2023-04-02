import React, {useState} from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Logo from "../images/metaphorLab.png"
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

export default function LoginDialog(){
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const muiButtonSX = {
        "&:hover": { 
            backgroundColor: "transparent",
            textDecoration: "underline"
        }
    }
    const textButtonStyleClicked = {
        maxWidth:"450px",
        marginLeft:"3VW",
        color: "#a300de",
        fontSize: "0.9VW",
        marginTop:"0.5VH"
    }
    const textfieldSXStyle = {
        "& .MuiInputBase-root": {
            color: "#cccccc"
        },
        " .MuiInputLabel-root": {
            color: "#cccccc"
        },
        "& label.Mui-focused": {
            color: "#f30987"
        },
        '& .MuiInput-underline:before': { 
            borderBottomColor: 'black' 
        },
        '& .MuiInput-underline:after': { 
            borderBottomColor: 'black' 
        },
    }
    const dialogText = {
        alignSelf: "center",
        color: "#333333",
        fontSize: "1VW",
        paddingBottom: 0,
    }
    const textButtonStyleClicked2 = {
        maxWidth:"400px",
        color: "#f30987",
        fontSize: "0.8VW"
    }
    const textButtonStyleCancel = {
        maxWidth:"400px",
        color: "#cccccc",
        fontSize: "0.8VW"
    }
    const imageStyle ={
        width: "3VW", 
        height: "3VW",
    }
    const titleDivStyle = {
        display: "flex",
        justifyContent: "center"
    }

    // dialog control
    const [open, setOpen] = useState(false)
    const handleClicked = () => {
        setOpen(!open)
    }

    // data
    const [registerInput, setRegisterInput] = useState({
        email: '',
        password: ''
    })
    const handleRegister = (event) => {
        event.preventDefault()
        console.log("Register Data: ") // register data to backend
        console.log(registerInput) // register data to backend
    }
    const handleChangeReg = (event) => {
        const {name, value} = event.target
        setRegisterInput(prevInput => {
            return{
                ...prevInput,
                [name]: value
            }
        })
    }

    const [loginInput, setLoginInput] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async (event) => {
        // Prevent default actions
        event.preventDefault();
    
        // Get email and password from the form
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        // Get response from the server
        try {
          const response = await axios.post("http://localhost:8800/auth/login", {
            email,
            password,
          });
          // Get data from the response
          const data = response.data;
          // Define authState
          const authState = {
            isLoggedIn: true,
            token: data.token,
            username: data.username,
            userId: data.userId,
          };
          // Call the login function to update authState
          login(authState);
          // Redirect to the home page
          navigate("/");
        } catch (error) {
          console.log(error);
        }
    }

    const handleChangeLog = (event) => {
        const {name, value} = event.target
        setLoginInput(prevInput => {
            return{
                ...prevInput,
                [name]: value
            }
        })
    }
    
    return(
        <div>
            <Button 
                sx={muiButtonSX} 
                disableRipple 
                style={textButtonStyleClicked}
                onClick={handleClicked}>
                <p>Login</p>
            </Button>
            <Dialog open={open} onClose={handleClicked}>
                <DialogContent>
                    <div style={titleDivStyle}>
                        <img src={Logo} alt="" style={imageStyle}></img>
                    </div>
                    <p style={dialogText}>
                        Have an account? Login here!
                    </p>
                    <TextField
                        sx={textfieldSXStyle}
                        id="outlined-basic" 
                        label="email address"
                        variant="standard"
                        fullWidth
                        name="email"
                        value={loginInput.email}
                        onChange={handleChangeLog}
                    />
                    <TextField
                        sx={textfieldSXStyle}
                        id="outlined-basic" 
                        label="Password"
                        variant="standard"
                        fullWidth
                        name="password"
                        value={loginInput.password}
                        onChange={handleChangeLog}
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        sx={muiButtonSX} 
                        disableRipple 
                        style={textButtonStyleClicked2} 
                        onClick={handleLogin}> 
                        Login
                    </Button>
                </DialogActions>
                <DialogContent>
                    <p style={dialogText}>
                        Or join us here!
                    </p>
                    <TextField
                        sx={textfieldSXStyle}
                        id="outlined-basic" 
                        label="email address"
                        variant="standard"
                        fullWidth
                        name="email"
                        value={registerInput.email}
                        onChange={handleChangeReg}
                    />
                    <TextField
                        sx={textfieldSXStyle}
                        id="outlined-basic" 
                        label="Password"
                        variant="standard"
                        fullWidth
                        name="password"
                        value={registerInput.password}
                        onChange={handleChangeReg}
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        sx={muiButtonSX} 
                        disableRipple 
                        style={textButtonStyleCancel} 
                        onClick={handleClicked}> 
                        Cancel
                    </Button>
                    <Button 
                        sx={muiButtonSX} 
                        disableRipple 
                        style={textButtonStyleClicked2} 
                        onClick={handleRegister}> 
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}