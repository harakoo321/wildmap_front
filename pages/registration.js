import { Children, useState } from "react";
import Header from "./header";
import Map from "../components/map";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import FileRegister from "@/components/fileRegister";

export default function Registration() {
    const [name, setName] = useState();
    const [position, setPosition] = useState();
    const [dangerLevel, setDangerLevel] = useState();
    const [periphery, setPeriphery] = useState();
    const [picture, setPicture] = useState();
    const [comment, setComment] = useState();
    
    const size = {
        width: "100%",
        height: "50vh",
    };

    const center = {
        lat: 33.644218,
        lng: 130.694269,
    };

    const router = useRouter();

    const changeHandler = (e) => {
        const { name, value } = e.target;
    /*
        switch (name) {
          case "email":
            setEmail(value);
            break;
          case "password":
            setPassword(value);
            break;
        }*/
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        router.push("/login");
/*
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
        }*/
    };

    return (
        <div>
            <Header title="Registration" />
            <div className="container">
                <h3 className="my-3">投稿</h3>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">生き物の名前:</label>
                        <input className="form-control" onChange={changeHandler} value={name} type="text" name="name" id="name" />
                    </div>
                    <div className="form-group">
                        <label>場所:</label>
                        {//<Map size={size} center={center} zoom={13} />
                        }
                    </div>
                    <div className="form-group">
                        <label>写真:</label>
                        <FileRegister />
                    </div>
                    <Button type="submit" variant="contained" endIcon={<EditIcon />}>
                        投稿
                    </Button>
                    
                </form>
            </div>
        </div>
    );
}