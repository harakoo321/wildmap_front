import React, { useState } from 'react';
import Header from './header';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, TextField } from '@mui/material';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //登録後にログイン画面に移動
    const router = useRouter();

    //フォームデータをapi側にリクエストを送る
    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await fetch("", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        //api側のレスポンスを受け取る
        const data = await res.json();
        if (data.created) {
            router.push("/home");
        } else {
            setError(data.message);
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
    
        switch (name) {
          case "email":
            setEmail(value);
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
                        <label htmlFor="email">メールアドレス:</label>
                        <input className="form-control" onChange={changeHandler} value={email} type="email" name="email" id="email" />
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
            </div>
        </div>
  );
}