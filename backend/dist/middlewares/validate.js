import { ZodError } from 'zod';
const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            throw next(new ZodError(result.error.issues));
        }
        console.log('Dados validados com sucesso.', result.data);
        req.body = result.data;
        // PRECISO RESOLVER ERRO: DADOS VALIDADOS ESTAO SOBRESCREVENDO REQ.BODY ORIGINAL, MAS QUERY PARAMS NAO ESTA FUNCIONANDO
        next();
    };
};
export default validate;
