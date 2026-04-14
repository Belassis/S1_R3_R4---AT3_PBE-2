import multer from "multer"; //módulo pra manipular os arquivos que vai enviar, qualquer tipo
import path from 'path'; //biblioteca que trabalha com a resoluação de caminhos
import crypto from 'crypto'; //gerar uma numeração que parece com id
import fs from 'fs'; //biblioteca que cria exclui, verificar arquivos

const baseUploadDir = path.resolve(process.cwd(),'uploads'); //pega caminho absoluto do c: do computador até onde minha pasta está. Junta caminho absoluto com o caminho que tem na pasta, ou seja 'uploads'

const verificaDir = (dir)=>{ //verifica se o diretório já existe p não criar de novo
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: true});
    }
}

const createMulter = ({pasta, tiposPermitidos, tamanhoArquivo })=>{
    const pastaFinal = path.join(baseUploadDir, pasta); 
    verificaDir(pastaFinal); 
    const storage=multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null, pastaFinal); //caminho completo e no fim esse é o destino final
        }, 
        filename:(req,file,cb)=>{
            const hash= crypto.randomBytes(12).toString('hex'); //gerar um hash, mas substitui pelo núemro do id do banco de dados
            cb(null,`${hash}-${file.originalname}`); //retorna o nome da imagem
        }
    }); 

    //filtro

    const fileFilter=(req,file,cb)=>{
        if(!tiposPermitidos.includes(file.mimetype)){
            return cb(new Error("Tipo de arquivo não permitido")); 
        }
        cb(null, true);
    }
    return multer({
        storage,
        limits:{tamanhoArquivo},
        fileFilter
    })
}

export default createMulter; 