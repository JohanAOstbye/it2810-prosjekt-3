import { Button, Card } from "@material-ui/core";
import React, { useState } from "react";

const Login = () => {
    const [showLogin, setLogin] = useState(false)
    const [showRegister, setRegister] = useState(false);

    return (
        <div>
            <Button color="inherit" size="large" onClick={() => {
                setLogin(!showLogin);
            }}>Login</Button>
            {showLogin ? (
                <Card></Card>
            ) : (null)}
        </div>
    );
};
export default Login;