import styles from "./App.module.css";

import {useDispatch, useSelector} from "react-redux"
import { getDataFailure, getDataRequest, getDataSuccess } from './redux/action';
import { useEffect, useState } from 'react';
import axios from "axios"

function App() {

  const [page, setPage] = useState(1);
 
  const dispatch = useDispatch();
  const users = useSelector((store) => store.userData);

  const getData = (page) => {
      dispatch(getDataRequest());
      return axios
      .get(`https://jsonmock.hackerrank.com/api/articles?page=${page}`)
      .then((res) => {
        // console.log(res.data.data);
         dispatch(getDataSuccess(res.data.data))
      }).catch((err) =>{
          dispatch(getDataFailure(err))
      })
  }

  useEffect(() => {

     getData(page);
  },[page])

  console.log(users);

  const handlePrevPage = () => {
      setPage((prev) => prev-1);
  }

  const handleNextPage = () => {
     setPage((prev) => prev+1);
  }

  const handleSortComments = () => {
      let sortedData = [...users];
      sortedData.sort((a,b) => {
         return (b.num_comments-a.num_comments)
      })
      dispatch(getDataSuccess(sortedData));
  }

  const handleCreateAtSort = (e) => {

      let val = e.target.value;
      let createdAtSort = [...users];
      if(val===""){
          getData();
      }
      if(val==="latest_to_old"){
        createdAtSort.sort((a,b) => {
          return (b.created_at-a.created_at)
       })
      }
      if(val==="old_to_latest"){
        createdAtSort.sort((a,b) => {
          return (a.created_at-b.created_at)
       })
      }
      dispatch(getDataSuccess(createdAtSort));
  }

  return (
    <div>
       <div className={styles.buttonDiv}>
          <div className={styles.pagination}>
            <button disabled={page<=1} onClick={handlePrevPage}>Prev Page</button>
            <button disabled={page>=5} onClick={handleNextPage}>Next Page</button>
            <h1>{page}</h1>
          </div>
          <div className={styles.top_comments}>
            <button onClick={handleSortComments}>Top-10-Comments</button>
          </div>
          <select className={styles.createdAt} onChange={handleCreateAtSort} >
             <option value="" default>Sort by created_at</option>
             <option value="latest_to_old">Latest to Old</option>
             <option value="old_to_latest">Old to Latest</option>
          </select>
       </div>
       <div className={styles.app}>
           {
              users.map((elem, ind) =>(
                 <div className={styles.card} key={ind}>
                     <div className={styles.innerDiv1}>
                        <img style={{width:"100px", height:"100px", borderRadius:"50%"}} src="https://cdn4.vectorstock.com/i/thumb-large/77/83/cute-young-man-with-glasses-avatar-cartoon-style-vector-36327783.jpg" alt="logo" />
                        <h1>{elem.author}</h1>
                     </div>
                     <h2>{elem.title || elem.story_title}</h2>
                     <div className={styles.innerDiv2}>
                       <div className={styles.messageDiv}>
                         <img className={styles.message} src="https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Messages-512.png" />
                         <p style={{fontSize:"22px", marginLeft:"10px", color:"red", fontWeight:"bold"}}>{elem.num_comments}</p>
                       </div>
                        <a href={elem.url}><p style={{fontWeight:"bold", fontSize:"21px", color:"rgb(55, 55, 166)"}}>Go to Article</p></a>
                     </div>
                 </div>
              ))
           }
       </div>
    </div>
  );
}

export default App;
