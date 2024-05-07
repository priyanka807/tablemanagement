import { useState,useEffect ,useContext} from 'react'
import ReactPaginate from 'react-paginate'
import './tablecontent.css'
import { Link, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Store from './context';

function TableContent() {
  const [data,setData] = useState([])
  const [filterValue, setFilterValue] = useState([]);
  const {toggle1,handleToggle1} = useContext(Store)

  
  const navigate = useNavigate();
useEffect(()=>{

  const token = localStorage.getItem("Email");
  if (!token) {
    navigate("/");
  }
},[])
 
  const pageLimit = 10

  useEffect(() => {
    async function fetchData() {
     try{
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=1&_limit=${pageLimit}`) 
      if(response.ok){
        const data = await response.json()      
         setData(data)
      }else{
        alert("failed to fetch api")
      }
    }catch(error){
    }
    }
    fetchData()
  }, []);

    const updatedFetchData = async(currentpage)=>{
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${currentpage}&_limit=${pageLimit}`) 
      const updatedData =await  response.json()
      setData(updatedData)
    }
  
    const handleClickPageChange = async (data)=>{
      const getCurrentPage = await updatedFetchData(data.selected+1)
    }

  
 
  useEffect(()=>{
    setFilterValue(data)
  },[data])

  const handleFilter = (filterText) => {
    const targetId = Number(filterText);

    const filtered = data.filter(item => {

      if (filterText === ''||item.id===targetId) {
        return item;
      }
      else {
        return item.title.includes(filterText)
      }
    });
   
    setFilterValue(filtered);
  };

  return (
    <>
       <Header  />

    {/* <Link to="/"  style={{textDecoration:'none'}}>back to homepage</Link> */}
 
    <form >
      <input type='text' placeholder='Search here'  onChange={(e)=>handleFilter(e.target.value)} className={`searchHere ${toggle1?'searchHere1':''}`}/>
    </form>
    <div className={`container ${toggle1?'container1':''}`}> 
      <div className="col-md-12">  
          <table className={`col-md-12 ${toggle1?'table-content':''}`}>
            <thead>
              <tr>
                <th><input type="checkbox" className='checkbox_id'/>Id</th>
                <th>Title</th>
                <th>Image</th>
                <th>Edit</th>
              </tr>
            </thead>
          <tbody>
            {filterValue.length > 0 ? filterValue.map((items,index)=>(
              <tr key={index}>
                <td><input type="checkbox" className='checkbox_id'/>{items.id}</td>
                <td>{items.title}</td>
                <td><img src={items.url} className='image'/></td>
                <td><img src="spinner.png" width='65px' height='60px' style={{margin:'-9px'}}/></td>
              </tr>
              )): <tr><td>No Data Found</td></tr>}
          </tbody>
          </table>
      </div>
    </div>
    <ReactPaginate 
      previousLabel={'previous'}  
      nextLabel={'next'}   
      pageCount={10} 
      marginPagesDisplayed={1}
      containerClassName={'pagination  justify-content-center'}
      pageClassName={'page-item'}  
      pageLinkClassName={'page-link'} 
      previousClassName={'page-item'}  
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'} 
      nextLinkClassName={'page-link'} 
      breakClassName={'page-item'} 
      breakLinkClassName='page-link'
      activeClassName={'active'}  
      onPageChange={handleClickPageChange}
    />
    </>
  )
}

export default TableContent;
