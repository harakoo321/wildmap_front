import Header from './header'
import HomeMap from '@/components/homeMap';
import { getContribution } from './api/getContribution';
import { useRouter } from 'next/router';
import React, { useState, useInsertionEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Fab, AppBar, Toolbar, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';

export default function Home() {
  const router = useRouter();
  const [posData, setPosData] = useState(null);

  const size = {
    width: "100%",
    height: "70vh",
  };

  const center = {
      lat: 33.644218,
      lng: 130.694269,
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
    getContribution(center).then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
        data.push([{ lat: doc.data().position[0], lng: doc.data().position[1] }, doc.data().name]);
      });
      console.log(data);
      setPosData(data);
      console.log(posData);
    });
  }, []);

  return (
    <div>
      <Header title="WildMap" />
      <h1 className="bg-primary text-white display-4 text-center">WildMap</h1>
      <div className='container'>
        <HomeMap size={size} center={center} zoom={13} setPosition={() => {}} posData={posData} />
        <br/>
        <React.Fragment>
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
              <IconButton color="inherit">
                <MoreIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      </div>
    </div>
  )
}
