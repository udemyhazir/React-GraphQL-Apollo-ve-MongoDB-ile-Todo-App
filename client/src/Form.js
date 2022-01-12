import moment from 'moment'
import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useRef, useState,useContext } from "react"
import { ADD_TODO,UPDATE_TODO } from "./graphql/Mutation"
import { GET_TODO, GET_TODOS } from "./graphql/Query"
import { TodoContext } from './TodoContext'


export default function Form() {

    const inputAreaRef=useRef()
    const {secilenId,setSecilenId}=useContext(TodoContext);

    //console.log(secilenId);

    

    const [todoGuncelle]=useMutation(UPDATE_TODO);

    const [todo,setTodo]=useState({
        baslik:'',
        aciklama:'',
        tarih:''
    })

    const {loading,error,data}=useQuery(GET_TODO,{
        variables:{id:secilenId},onCompleted:(data)=>setTodo(data.todoGetir)
    })

    console.log('todo getir',data?.todoGetir);

    const [todoEkle]=useMutation(ADD_TODO)
    
    useEffect(()=>{
        const formDisiTiklandi=e=>{
            if(!inputAreaRef.current.contains(e.target)){
                console.log('form dışı tıklandı');
                setSecilenId(0);
            }else{
                console.log('form içi tıklandı');
            }

            
        }

        document.addEventListener("mousedown",formDisiTiklandi)
            return ()=>{
                document.removeEventListener("mousedown",formDisiTiklandi)
            }
    },[])

    const submitHandler=e=>{
        e.preventDefault();

        if(secilenId===0){
            todoEkle({
                variables:{
                    baslik:todo.baslik,
                    aciklama:todo.aciklama,
                    tarih:todo.tarih
                },
                refetchQueries:[
                    {query:GET_TODOS}
                ]
            })
        }else{
            
            todoGuncelle({
                variables:{
                    id:secilenId,
                    baslik:todo.baslik,
                    aciklama:todo.aciklama,
                    tarih:todo.tarih
                },
                refetchQueries:[
                    {query:GET_TODOS}
                ]
            })
        }
    }
    return (
        <form className="container form" onSubmit={submitHandler} ref={inputAreaRef}>
            <div className="text-center fs-2 text-primary fw-bold ">{(secilenId===0)?"YAPILACAK EKLE":"YAPILACAK GÜNCELLE"}</div>
            <div className="mt-3">
                <label className="form-label text-secondary">Başlık</label>
                <input type="text" className="form-control" value={todo.baslik}  onChange={e=>setTodo({...todo,baslik:e.target.value})}/>
            </div>
            <div className="mt-3">
                <label className="form-label text-secondary">Açıklama</label>
                <input type="text" className="form-control" value={todo.aciklama}  onChange={e=>setTodo({...todo,aciklama:e.target.value})}/>
            </div>
            <div className="mt-3">
                <label className="form-label text-secondary">Tarih</label>
                <input type="date" className="form-control" value={moment(todo.tarih).format("yyyy-MM-DD")}  onChange={e=>setTodo({...todo,tarih:e.target.value})} />
            </div>
            <div className="text-center"><button type="submit" className="btn btn-primary mt-3">{(secilenId===0)?"EKLE":"GÜNCELLE" }</button></div>
        </form>
    )
}
