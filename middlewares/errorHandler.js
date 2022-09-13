function errorHandler(asyncController) {
    return async (req, res, next) => {
        try {
            await asyncController(req, res, next)
        }
        catch(err){next(err)}
       
    }}
module.exports = errorHandler;