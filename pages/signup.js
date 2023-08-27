import React, { useState } from 'react';
import Header from './header';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addAccount } from './api/addAccount';

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    //登録後にログイン画面に移動
    const router = useRouter();
    const id = router.query.id;

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

        if(username === "" && password === ""){
            setText("ユーザー名またはパスワードが入力されていません");
            setOpen(true)
        }
        else if(password !== confirmPassword){
            setText("パスワードが一致していません");
            setOpen(true);
        }
        else {
            addAccount({id, username, password});
            router.push("/login");
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
            case "confirmPassword":
                setConfirmPassword(value);
                break;
        }
      }

    return (
        <div>
            <Header title="Sign up" />
            <h1 className="bg-primary text-white display-4 text-center">WildMap</h1>
            <div className="container">
                <h4 className="my-3">ユーザー登録</h4>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="username">ユーザー名:</label>
                        <input className="form-control" onChange={changeHandler} value={username} type="text" name="username" id="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">パスワード:</label>
                        <input className="form-control" onChange={changeHandler} value={password} type="password" name="password" id="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">パスワード（再入力）:</label>
                        <input className="form-control" onChange={changeHandler} value={confirmPassword} type="password" name="confirmPassword" id="confirmPassword" />
                    </div>
                    <input type="submit" className="btn btn-primary" value="登録" />
                    <div className='text-center'>
                        <Link href="/login">
                            <p>ログインはこちら&gt;&gt;</p>
                        </Link>
                    </div>
                </form>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={text}
                    action={action}
                />
            </div>
        </div>
  );
}