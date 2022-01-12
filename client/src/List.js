import { useMutation, useQuery } from '@apollo/client';
import {GET_TODO, GET_TODOS} from './graphql/Query';

import {MdDelete,MdAssignment} from 'react-icons/md'

import moment from 'moment'
import 'moment/locale/tr' 
import { DELETE_TODO } from './graphql/Mutation';
import { useContext, useState } from 'react';
import { TodoContext } from './TodoContext';

export default function List() {

    const {secilenId,setSecilenId}=useContext(TodoContext);
    const [deleteTodo]=useMutation(DELETE_TODO);

    const {loading,error,data}=useQuery(GET_TODOS);
    //onsole.log(data);
    if(loading) return <p>Yükleniyor...</p>
    if(error) return <p>{error.message}</p>

    const handleDelete=(id)=>{
        //console.log("todo id: "+id);
        deleteTodo({
            variables:{
                id:id
            },
            refetchQueries:[
                {query:GET_TODOS}
            ]
        })
    }

    

    return (
        <div className="container list">
            <div className="text-center fs-2 text-secondary fw-bold mb-4">Yapılacaklar</div>
            {data?.todolarGetir.length==0 ? (<p className='fs-3'>Henüz yapılacak eklemediniz</p>):(
                <div className="list-group">
                    {data?.todolarGetir.map(todo=>(
                        <a href="#" className="list-group-item list-group-item-action " aria-current="true" key={todo.id} onClick={()=>setSecilenId(todo.id)}>
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{todo.baslik}</h5>
                        
                        <h4 onClick={()=>handleDelete(todo.id)}><MdDelete /></h4>
                        
                        </div>
                       
                        <p className="mb-1">{todo.aciklama}</p>
                        <small>{moment(todo.tarih).fromNow()}</small>
                        <h4 onClick={()=>setSecilenId(todo.id)}><MdAssignment /></h4>
                    </a>
                    
                    ))}
                </div>
            )}
        </div>
    )
}
