module.exports = function(err,req,res,next) {
 console.error(err);
 if(err.name==='SequelizeValidationError'||err.name==='SequelizeUniqueConstraintError')
  return res.status(400).json({erro:err.errors?.map(e=>e.message).join('; ')||'Dados inválidos.'});
 return res.status(500).json({erro:'Erro interno do servidor.'});
};
