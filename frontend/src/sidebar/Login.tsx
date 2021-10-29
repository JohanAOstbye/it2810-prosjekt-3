import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Button, TextField, Typography } from '@mui/material'
import { makeStyles } from "@mui/styles";
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import User from '../helperClasses/user'

/* Styles */
const useStyles = makeStyles({
    typographyStyles: {
        color: 'white',
    },
});

/* Helperclass */
class InputUser {
    username: String = ''
    password: String = ''
    confirmPassword: String = ''
    email: String = ''
}

/* Helperfunctions */
function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value
}

/* graphql queries */

const REGISTER_USER = gql`
mutation registerUser(
            $username: String!,
            $password: String!,
            $email: String!
    ) {
    registerUser(
        data: {
            username: $username,
            password: $password,
            email: $email
        }
    ) {
        id,
        username,
        email
    }
}
`

const LOGIN_USER = gql`
query login(
            $username: String!,
            $password: String!
    ) {
    login(
        data: {
            username: $username,
            password: $password
        }
    ) {
        id,
        username,
        email
    }
}
`

const Login = () => {
    const newUser: InputUser = new InputUser()

    const classes = useStyles()
    const [showRegister, setRegister] = useState(false)
    const [user, setUser] = useState(newUser)
    const [passwordsMatch, setMatch]: [
        boolean | undefined,
        Dispatch<SetStateAction<boolean | undefined>>,
    ] = useState()
    const dispatch = useDispatch()

    const dispatchUser = (data: any) => {
        let user: User = new User()
        if (data.login) {
            user = data.login
        } else if (data.registerUser) {
            user = data.registerUser
        }
        console.log("dispatcing", user)
        dispatch({ type: "AUTH_USER", payload: user })
    }

    const [register] = useMutation(REGISTER_USER, { onCompleted: dispatchUser });
    const [login] = useLazyQuery(LOGIN_USER, { onCompleted: dispatchUser });

    function updateUser(
        key: 'username' | 'password' | 'confirmPassword' | 'email',
        value: String,
    ) {
        let tempUser: InputUser = user
        setProperty(tempUser, key, value)
        if (
            tempUser.password !== '' &&
            tempUser.confirmPassword !== '' &&
            tempUser.password === tempUser.confirmPassword
        ) {
            setMatch(true)
        } else if (tempUser.confirmPassword !== "") {
            setMatch(false)
        } else {
            setMatch(undefined)
        }
        setUser(tempUser)
    }

    const handleUser = () => {
        if (!showRegister && user.password !== "") {
            console.log("logging in user:", user)
            login({
                variables: {
                    username: user.username,
                    password: user.password
                }
            })
        } else if (passwordsMatch) {
            console.log("registering in user:", user)
            register({
                variables: {
                    username: user.username,
                    password: user.password,
                    email: user.email
                }
            })
        }
    }

    const getError = () => {
        if (passwordsMatch !== undefined) {
            return !passwordsMatch
        }
        return false
    }

    const getErrorMsg = () => {
        if (passwordsMatch !== undefined) {
            if (passwordsMatch) {
                return 'matches!:)'
            }
            return 'passwords must match'
        }
        return false
    }

    return (
        <div className="login">
            <Typography
                className={classes.typographyStyles}
                variant="h5"
                align="center"
            >
                {showRegister ? 'Register' : 'Login'}
            </Typography>
            <TextField
                id="username"
                label="Username"
                variant="filled"
                onChange={(e) => {
                    updateUser('username', e.target.value)
                }}
            />
            <TextField
                error={getError()}
                id="password"
                label="Password"
                variant="filled"
                helperText={getErrorMsg()}
                onChange={(e) => {
                    updateUser('password', e.target.value)
                }}
            />
            {showRegister ? (
                <div>
                    <TextField
                        error={getError()}
                        id="confirmPassword"
                        label="Confirm password"
                        variant="filled"
                        helperText={getErrorMsg()}
                        onChange={(e) => {
                            updateUser('confirmPassword', e.target.value)
                        }}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        variant="filled"
                        onChange={(e) => {
                            updateUser('email', e.target.value)
                        }}
                    />
                </div>
            ) : null}
            <Button
                id="btnSendUser"
                color="inherit"
                size="large"
                onClick={() => {
                    handleUser();
                }}
                fullWidth
            >
                {showRegister ? 'Register' : 'Login'}
            </Button>
            <Button
                id="btnSwitchForm"
                color="inherit"
                size="large"
                onClick={() => {
                    setRegister(!showRegister)
                    updateUser('confirmPassword', '')
                }}
                fullWidth
            >
                {showRegister ? 'Login' : 'Register'}
            </Button>
        </div>
    )
}
export default Login
