function errorHandler(asyncController) {
    return async (req, res, next) => {
        try {
            await asyncController(req, res, next)
        }
        catch (err) {
            console.log(err)
            res.status(err.statusCode ? err.statusCode : 500).json({ message: err.message });
        }
    }
}

module.exports = errorHandler;
