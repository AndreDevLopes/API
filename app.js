const express = require('express')
const app = express();
const mongoose = require('mongoose')
require("./models/Artigo")
const Artigo = mongoose.model('artigo')



app.use(express.json());

mongoose.connect('mongodb://localhost/API',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("conexão com o mongoDB realizada com sucesso")
}).catch((err)=>{
    console.log(err+"falha na conexão com o mongoDB")

})
app.put("/artigo/:id",(req,res)=>{
    const artigo = Artigo.updateOne({_id: req.params.id},req.body,(err)=>{
        if(err) return res.status(400).json({
            erro: true,
            messege: "erro ao editar artigo"
        })
        return res.json({
            erro:false,
            messege:"artigo editado com sucesso"
        })
    })
})
app.delete("/artigo/:id",(req,res)=>{
    const artigo = Artigo.deleteOne({_id:req.params.id}, (err)=>{
        if(err)return res.status(400).json({
            erro:true,
            messege: "erro ao deletar Artigo"
        });
        return res.json({
            erro:false,
            messege: "artigo deletado como sucesso"
        })
    })
})
app.get("/artigo/:id",(req,res)=>{
    Artigo.findOne({_id:req.params.id}).then((artigo)=>{
        return res.json(artigo)
    }).catch((err)=>{
        return res.status(400).json({
            erro:true,
            messege:"erro ao buscar artigo"
        })
    })
})
app.get("/",(req,res)=>{
    Artigo.find().then((artigo)=>{
        return res.json(artigo);
    }).catch((err)=>{
        return res.status(400).json({
            erro:true,
            messege:"erro ao listas Artigos"
        });
    })
});

app.post("/artigo",(req,res)=>{

    const artigo = Artigo.create(req.body,(err)=>{
        if(err) return res.status(400).json({
            erro: true,
            messege: "erro ao criar Artigo"
        });

        return res.status(200).json({
            erro:false,
            messege:"Artigo criado com sucesso!"
        });
    })
   
})

app.listen(8081,()=>{
    console.log("Servidor iniciando na porta 8081: http://localhost:8081")
})