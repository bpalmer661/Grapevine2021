

import React, { useEffect} from "react";
// import '../../App.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import { setSearchCategory } from '../redux/actions/dataActions'

import { useDispatch } from "react-redux";

import { items } from '../util/categories'
  
//import { useSelector } from 'react-redux'




// npm i react-search-autocomplete

function SearchBar() {


  
  
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.

    console.log(string, results)
    console.log("handleOnSearch Being Called")
  }

  const dispatch = useDispatch();


  const handleOnSelect = (item) => {
    console.log("handleOnSelect called" + item.name)
    dispatch(setSearchCategory(item.name));
    localStorage.setItem("persistedCategory",item.name)
  }





  useEffect(() => {
const persistedCategory = localStorage.getItem("persistedCategory")

console.log("inside SearchBar this is persistedCategory" + persistedCategory)

//  var x = (persistedCategory === null) ? "Plumbing" : x;
//if  persistedCategory = here put if persisted category is null set to plumbing and see what it does.

setSearchCategory(persistedCategory)
      }, [])



      const persistedCategory = localStorage.getItem("persistedCategory")



  // const handleOnFocus = () => {
  //   console.log('Focused')
  // }

  return (
    <div 
    className="App"
    >
      <header 
      //className="App-header"
      >
        <div 
        style={{ 
          width: 200 ,
          // backgroundColor: "black",
          height: "46px",
          border: "1px solid #dfe1e5",
          borderRadius: "0px",
          backgroundColor: "white",
          boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
          color: "#212121",
          fontSize: "16px",
          fontFamily: "Arial",
          iconColor: "grey",
          lineColor: "rgb(232, 234, 237)",
          placeholderColor: "red",
          
          padding:"0px",
          marginLeft:"15px",
         // hoverBackgroundColor: "#eee",
          hoverBackgroundColor: "red",
        
        }}

        >
          <ReactSearchAutocomplete


          styling={
              {
                //hoverBackgroundColor: "#eee",
                // hoverBackgroundColor: "black",
                // backgroundColor: "black",
                height: "46px",
                border: "1px solid #dfe1e5",
                borderRadius: "0px",
                backgroundColor: "white",
                boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
                color: "#212121",
                fontSize: "16px",
                fontFamily: "Arial",
                iconColor: "grey",
                lineColor: "rgb(232, 234, 237)",
                 placeholderColor: "red",
                padding:"0px",
                marginLeft:"15px",

               
              }
            }
            showIcon={false}
           placeholder={(persistedCategory === null) ? "Plumbing" : persistedCategory}
            items={items}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            // onFocus={handleOnFocus}
            autoFocus
          />
        </div>
      </header>
    </div>
  )
}

export default SearchBar