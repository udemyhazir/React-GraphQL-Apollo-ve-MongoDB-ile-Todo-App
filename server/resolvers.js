import Todo from './models/Todo.js'

const resolvers={
    Query:{
        merhaba:()=>{
            return "Merhaba Dünya"
        },
        todolarGetir:async ()=>{
            const todos=await Todo.find();
            return todos
        },
        todoGetir:async (root,args)=>{
            const todo=await Todo.findById(args.id)
            return todo
        }
    },
    Mutation:{
        todoEkle:async (root,args)=>{
            const yeniTodo=new Todo({baslik:args.baslik,aciklama:args.aciklama,tarih:args.tarih})
            await yeniTodo.save();
            return yeniTodo;
        },
        todoSil:async (root,args)=>{
            await Todo.findByIdAndDelete(args.id);
            return "Todo silindi"
        },
        todoGuncelle:async (root,args)=>{
            const {id,baslik,aciklama,tarih}=args;
            const guncellenecek={};

            if(baslik != undefined){
                guncellenecek.baslik=baslik;
            }

            if(aciklama != undefined){
                guncellenecek.aciklama=aciklama;
            }

            if(tarih != undefined){
                guncellenecek.tarih=tarih;
            }

            const todo=await Todo.findByIdAndUpdate(id,guncellenecek,{new:true})

            return todo;

        }
    }
}

export default resolvers