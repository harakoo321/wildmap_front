import { useState, useRef } from "react";
import Image from "next/image";
import { Stack, Grid, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ShowImage(props) {
    return props.image != null ? <Image src={props.image} alt="Selected Image" layout="fill" objectFit="contain" /> : <></>;
}

export default function FileRegister() {
    const [image, setImage] = useState(null);
    const filePickerRef = useRef(null);
    const showFolder = () => {
        if (filePickerRef.current) {
            filePickerRef.current.click();
        }
    };
  
    const selectFile = (e) => {
        const file = e.target.files[0];
        setImage(window.URL.createObjectURL(file));
        e.target.value = '';
    };
  
    return (
        <Stack>
            <div className="card p-2 my-3" style={{ position: 'relative', width: '100%', height: 300 }}>
                <ShowImage image={image} />
            </div>
            <Grid>
                <input
                type="file"
                accept=".png, .jpeg, .jpg "
                ref={filePickerRef}
                onChange={(e) => selectFile(e)}
                hidden
                />
                <Button variant="outlined" onClick={showFolder}>ファイルを選択...</Button>
                <Button color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={() => setImage(null)}>ファイル削除</Button>
            </Grid>
        </Stack>
    );
  };