const {Op}=require('sequelize');
const Jogo=require('../models/Jogo');
function validar(d,parcial=false){
 const req=['nome','genero','plataforma','ano'];
 if(!parcial&&req.some(k=>d[k]===undefined||d[k]==='')) return 'Nome, gênero, plataforma e ano são obrigatórios.';
 for(const k of ['nome','genero','plataforma']) if(d[k]!==undefined&&(typeof d[k]!=='string'||!d[k].trim())) return `O campo ${k} deve ser um texto válido.`;
 if(d.ano!==undefined&&(!Number.isInteger(Number(d.ano))||Number(d.ano)<1950||Number(d.ano)>2100)) return 'O ano deve ser um inteiro entre 1950 e 2100.';
 return null;
}
async function listar(req,res,next){try{const where={};if(req.query.busca)where.nome={[Op.like]:`%${req.query.busca}%`};return res.json(await Jogo.findAll({where,order:[['nome','ASC']]}));}catch(e){next(e);}}
async function buscar(req,res,next){try{const j=await Jogo.findByPk(req.params.id);if(!j)return res.status(404).json({erro:'Jogo não encontrado.'});return res.json(j);}catch(e){next(e);}}
async function criar(req,res,next){try{const erro=validar(req.body);if(erro)return res.status(400).json({erro});const j=await Jogo.create({...req.body,nome:req.body.nome.trim(),genero:req.body.genero.trim(),plataforma:req.body.plataforma.trim(),ano:Number(req.body.ano)});return res.status(201).json(j);}catch(e){next(e);}}
async function atualizar(req,res,next){try{const erro=validar(req.body);if(erro)return res.status(400).json({erro});const j=await Jogo.findByPk(req.params.id);if(!j)return res.status(404).json({erro:'Jogo não encontrado.'});await j.update({...req.body,ano:Number(req.body.ano)});return res.json(j);}catch(e){next(e);}}
async function excluir(req,res,next){try{const j=await Jogo.findByPk(req.params.id);if(!j)return res.status(404).json({erro:'Jogo não encontrado.'});await j.destroy();return res.json({mensagem:'Jogo excluído com sucesso.'});}catch(e){next(e);}}
module.exports={listar,buscar,criar,atualizar,excluir};
