const ApiError = require("../error/ApiError")

module.exports = function (err, req, res, next) {
    if(err instanceof ApiError){
        return res.status(err.status).json({message: err.message})
    }
    console.log(err)
    if (
      err.message.includes("Expected ',' or '}' after property value in JSON")
    ) {
      return res.status(err.status).json({ message: err.message });
    }

    if (err.message.includes("Expected property name")) {
      return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({message: "Nazarda tutilmagan xatolik"})
}
