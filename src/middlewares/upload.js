import createMulter from "../config/UploadMuter.js";


const upload = createMulter({
    pasta: 'imagens',
    tiposPermitidos: ['image/png', 'image/jpeg', 'image/jpg'],
    tamanhoArquivo: 10 * 1024 * 1024 
});
export default upload;