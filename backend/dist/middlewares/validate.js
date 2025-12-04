import { ZodError } from 'zod';
const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            throw next(new ZodError(result.error.issues));
        }
        // FAZER LÓGICA DE VALIDACAO DE DADOS
        console.log('Dados validados com sucesso.', result.data);
        req.body = result.data;
        next();
    };
};
export default validate;
