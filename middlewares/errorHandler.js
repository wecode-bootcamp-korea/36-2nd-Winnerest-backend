function errorHandler(asyncController) {
    return async (req, res) => {
        try {
            await asyncController(req, res)
        }
        catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json({ message: err.message });
        }}
    }

module.exports = errorHandler;