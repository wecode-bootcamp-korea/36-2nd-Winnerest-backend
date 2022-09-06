const ErrorCreater = require("../middlewares/errorCreater");

const validationId = (Id) => {
    const validation = new RegExp(/^\d+$/);
    
    if (!validation.test(Id)) {
      throw new ErrorCreater('INVAILD_INPUT', 500)
    }
  };

module.exports = {validationId };