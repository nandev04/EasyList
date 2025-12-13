const validate = (schema) => {
    return (req, res, next) => {
        try {
            const validated = {};
            if (schema.query) {
                const result = schema.query.safeParse(req.query);
                if (!result.success)
                    return next(result.error);
                validated.query = result.data;
            }
            if (schema.params) {
                const result = schema.params.safeParse(req.params);
                if (!result.success)
                    return next(result.error);
                validated.params = result.data;
            }
            if (schema.body) {
                const result = schema.body.safeParse(req.body);
                if (!result.success)
                    return next(result.error);
                validated.body = result.data;
            }
            req.validated = validated;
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
export default validate;
