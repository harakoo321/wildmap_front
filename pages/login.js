import React, { useState } from 'react';
import Header from './header';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAccount } from './api/getAccount';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    //フォームデータをapi側にリクエストを送る
    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await getAccount({username, password});
        console.log(res);
        if(res){
            router.push({
                pathname: "/",
                query: {username: username}
            });
        }
        else {
            setOpen(true);
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
    
        switch (name) {
          case "username":
            setUsername(value);
            break;
          case "password":
            setPassword(value);
            break;
        }
      }

    return (
        <div>
            <Header title="Sign up" />
            <h1 className="bg-primary text-white display-4 text-center">WildMap</h1>
            <div className="container">
                <h4 className="my-3">ログイン</h4>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="username">ユーザー名:</label>
                        <input className="form-control" onChange={changeHandler} value={username} type="text" name="username" id="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">パスワード:</label>
                        <input className="form-control" onChange={changeHandler} value={password} type="password" name="password" id="password" />
                    </div>
                    {error && <div>{error}</div>}
                    <input type="submit" className="btn btn-primary" value="ログイン" />
                    <div className='text-center'>
                        <Link href="/signup">
                            <p>ユーザー登録はこちら&gt;&gt;</p>
                        </Link>
                    </div>
                </form>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="ユーザー名もしくはパスワードが正しくありません"
                    action={action}
                />
            </div>
        </div>
  );
}