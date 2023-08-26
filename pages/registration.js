import { useState } from "react";
import Header from "./header";
import Map from "../components/map";
import { Button, Grid, Rating, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import FileRegister from "@/components/fileRegister";
import { postImage } from "./api/upload";
import { addContribution } from "./api/addContribution";

export default function Registration() {
    const [name, setName] = useState("");
    const [position, setPosition] = useState();
    const [dangerLevel, setDangerLevel] = useState(0);
    const [file, setFile] = useState(null);
    const [comment, setComment] = useState("");
    
    const size = {
        width: "100%",
        height: "50vh",
    };

    const center = {
        lat: 33.644218,
        lng: 130.694269,
    };

    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        const result = await postImage(file);
        console.log(result);

        const json = {
            name: name,
            position: position,
            dangerLevel: dangerLevel,
            imagePath: result,
            comment: comment,
        };
        await addContribution(json);
        router.push("/");
    };

    return (
        <div>
            <Header title="Registration" />
            <div className="container">
                <h3 className="my-3">投稿</h3>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">生き物の名前：</label>
                        <input
                            className="form-control"
                            onChange={e => {setName(e.target.value)}} 
                            value={name} 
                            type="text" 
                            name="name" 
                            id="name" />
                    </div>
                    <div className="form-group">
                        <label>場所：</label>
                        <Map size={size} center={center} zoom={13} setPosition={setPosition} />
                    </div>
                    <div className="form-group">
                        <label>危険度：{dangerLevel}</label>
                        <br/>
                        <Rating
                            name="simple-controlled"
                            size="large"
                            value={dangerLevel}
                            onChange={(e, newValue) => {
                                setDangerLevel(newValue);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>写真：</label>
                        <FileRegister file={file} setFile={setFile}/>
                        <p>{file?.name}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="outlined-multiline-flexible">コメント：</label>
                        <br/>
                        <TextField
                            id="outlined-multiline-flexible"
                            minRows={4}
                            fullWidth
                            multiline
                            onChange={(e) => { setComment(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <Button type="submit" variant="contained" sx={{ mr: 1 }} endIcon={<EditIcon />}>投稿</Button>
                        <Button 
                            color="error" 
                            variant="outlined" 
                            startIcon={<CloseIcon />}
                            onClick={(e) => {
                                router.push("/");
                            }}
                         >キャンセル</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}