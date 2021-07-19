import React, { useEffect } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { setDistanceAway } from '../redux/actions/dataActions'
import { useDispatch } from "react-redux";





const options = [
  10,
  20,
  50,
  100,
  200,
  500,
];

export default function SimpleMenu() {



  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const dispatch = useDispatch();
  

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

useEffect(() => {
 console.log(options[selectedIndex])
 const distance = options[selectedIndex]
//add distance preference to  globale state.
localStorage.setItem("KmsAway",options[selectedIndex])
dispatch(setDistanceAway(distance));
}, [selectedIndex,dispatch])







  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div 
  
    >
      <List
       style={{
        height: "46px",
        width:"150px",
        border: "1px solid #dfe1e5",
        borderRadius: "0px",
        backgroundColor: "white",
        boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
        hoverBackgroundColor: "#eee",
        color: "#212121",
        fontSize: "16px",
        fontFamily: "Arial",
        iconColor: "grey",
        lineColor: "rgb(232, 234, 237)",
        placeholderColor: "grey",
        padding:"0px",
        marginLeft:"15px",
       }}
      component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
        >
          <ListItemText 
          //primary="Show Jobs WithIn" secondary={`${options[selectedIndex]} kms`} 
          primary={`< ${options[selectedIndex]} kms`} 
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{
          // backgroundColor: "black",
          marginTop:"99",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
style={{
          // backgroundColor: "black",
        }}
            key={option}
            // disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
             {`< ${option}`} Kms
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

 