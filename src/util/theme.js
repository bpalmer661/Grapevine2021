


const theme = {
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },




  shared:{

    mainGrid:{
      display: 'flex'
      },
      form: {
      textAlign: 'center'
      },
      image:{
          border: '1px solid black',
          width: '50px',
          borderRadius: '4px',
          //top right bottom left
          margin: '20px auto 20px auto'
      },
      pageTitle:{
          margin: '10px auto 10px auto'
      },
      textField:{
          margin: '20px auto 20px auto'
      },
      button:{
          margin: '30px auto 10px auto',
          width: "130px",
          height: "25px",
      },
      customError:{
          color: 'red',
          fontSize: '0.8rem',
      }




  }



}

export default theme;