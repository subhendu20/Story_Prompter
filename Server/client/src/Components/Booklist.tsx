import React from 'react'
import axios from 'axios'
import Book from './Book'
import './css/Booklist.css'
import { useSelector } from 'react-redux';
import { selectCount } from '../Action';

interface BookList{
          loading:boolean,
          books:[{
                    _id:string,
                    name:string,
                    author:string,
                    pages:number,
                    image:string,
                    description:string,
                    published:string,
                    publication:string,
                    price:number,


          }]|[]

}

const Booklist:React.FC=()=> {
          const count = useSelector(selectCount)

          const [bookarray,setbookarray]=React.useState<BookList>({loading:false,books:[]})


          React.useEffect(()=>{
                    axios.get('http://localhost:7001/books/getbooks',{
                              withCredentials:true
                    }).then((res)=>{
                              setbookarray({
                                        loading:false,
                                        books:res.data.books
                              })
                    }).catch((e)=>{
                              console.log(e)
                    })
          },[count])
          
  return (
    <React.Fragment>
          <h1>Books</h1>
          {
                    bookarray.books.length>1 && bookarray.books.map((e)=>{
                              return <Book key={e._id} data={e}/>
                              
                    })
          }

    </React.Fragment>
      
    
  )
}

export default Booklist
