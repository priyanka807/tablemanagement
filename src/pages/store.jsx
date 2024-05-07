
import React,{useState} from "react";
import Store from "./context";
const AppProvider = ({children})=>{
    const [toggle1, setToggle1] = useState(false);

  const handleToggle1 = () => {
    setToggle1((prevToggle) => !prevToggle);
  };
return(

   <Store.Provider value={{toggle1,handleToggle1,setToggle1}}>{children}</Store.Provider> 
)

}

export default AppProvider;