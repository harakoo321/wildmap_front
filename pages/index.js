import Header from './header'
import HomeMap from '@/components/homeMap';
import { getContribution } from './api/getContribution';
import { useRouter } from 'next/router';
import React, { useState, useInsertionEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Fab, AppBar, Toolbar, IconButton, Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import Contribution from '@/components/showContribution';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();
  const [posData, setPosData] = useState(null);
  const [center, setCenter] = useState();

  const size = {
    width: "100%",
    height: "70vh",
  };

  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

  useInsertionEffect(() => {
    let data = [];
    if(center != null){
      getContribution(center).then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().name}`);
          data.push([{ lat: doc.data().position[0], lng: doc.data().position[1] }, doc.data().name]);
        });
        console.log(data);
        setPosData(data);
        console.log(posData);
        console.log(center);
      });
    }
  }, [center]);

  useInsertionEffect(() => {
    if ('geolocation' in navigator) {
      // ブラウザが Geolocation API をサポートしている場合
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setCenter({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
      console.log(center);
  }, []);

  const logout = () => {
    Cookies.remove("signedInID");
    console.log("logout: " + Cookies.get("signedInID"));
  }

  if(center === null){
    return <p>位置情報を取得中...</p>;
  }
  if(posData !== null){
  return (
      <div>
        <Header title="WildMap" />
        <h1 className="bg-primary text-white display-4 text-center">WildMap</h1>
        <div className='container'>
          <HomeMap size={size} center={center} zoom={13} setPosition={() => {}} posData={posData} />
          <br/>
          <React.Fragment>
            <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>投稿</Typography>
            <Contribution document_id={router.query.document_id} setCenter={setCenter} />
            <br/>
            <br/>
            <br/>
            <br/>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
              <Toolbar>
                <IconButton color="inherit" aria-label="open drawer">
                  <MenuIcon />
                </IconButton>
                <StyledFab color="secondary" aria-label="add" onClick={(e) => {
                  console.log(posData);
                  router.push("/registration")
                }}>
                  <AddIcon />
                </StyledFab>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
                <Button
                  color="error" 
                  variant="outlined" 
                  onClick={logout}>
                  ログアウト
                </Button>
              </Toolbar>
            </AppBar>
          </React.Fragment>
        </div>
      </div>
    )
  }
}
