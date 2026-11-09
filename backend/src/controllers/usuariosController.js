const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Usuario=require('../models/Usuario');
async function cadastrar(req,res,next){
 try{
  const {nome,email,senha}=req.body;
  if(!nome?.trim()||!email?.trim()||!senha) return res.status(400).json({erro:'Nome, email e senha são obrigatórios.'});
  if(senha.length<6) return res.status(400).json({erro:'A senha deve ter pelo menos 6 caracteres.'});
  const normalizado=email.trim().toLowerCase();
  if(await Usuario.findOne({where:{email:normalizado}})) return res.status(409).json({erro:'Este email já está cadastrado.'});
  const usuario=await Usuario.create({nome:nome.trim(),email:normalizado,senha:await bcrypt.hash(senha,10)});
  return res.status(201).json({mensagem:'Usuário cadastrado com sucesso.',usuario:{id:usuario.id,nome:usuario.nome,email:usuario.email}});
 }catch(e){return next(e);}
}
async function login(req,res,next){
 try{
  const {email,senha}=req.body;
  if(!email||!senha) return res.status(400).json({erro:'Email e senha são obrigatórios.'});
  const usuario=await Usuario.findOne({where:{email:String(email).trim().toLowerCase()}});
  if(!usuario||!(await bcrypt.compare(senha,usuario.senha))) return res.status(401).json({erro:'Email ou senha incorretos.'});
  const token=jwt.sign({id:usuario.id,nome:usuario.nome,email:usuario.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||'2h'});
  return res.json({mensagem:'Login realizado com sucesso.',token,usuario:{id:usuario.id,nome:usuario.nome,email:usuario.email}});
 }catch(e){return next(e);}
}
module.exports={cadastrar,login};
