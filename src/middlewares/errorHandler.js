const httpStatus = require("http-status-codes")
const responseUtils = require("@utils/responseUtils")

module.exports = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      const errors = err.errors.map((element) => element.message)
      res.status(httpStatus.BAD_REQUEST).send(responseUtils.failed(errors))
      break
    case "SequelizeUniqueConstraintError":
      const temp = err.errors[0].message.toLowerCase()
      switch (temp) {
        case "categories.name must be unique":
          res
            .status(httpStatus.BAD_REQUEST)
            .send(
              responseUtils.failed(
                "Category already exist, please insert different category"
              )
            )
          break
        case "admins.unique_email must be unique":
          res
            .status(httpStatus.BAD_REQUEST)
            .send(
              responseUtils.failed(
                "Email already exist, please insert different email"
              )
            )
          break
        case "employees.employeeId must be unique":
          res
            .status(httpStatus.BAD_REQUEST)
            .send(
              responseUtils.failed(
                "Employee id already exist, please insert different employee id"
              )
            )
          break
        case "artists.unique_artist must be unique":
          res
            .status(httpStatus.BAD_REQUEST)
            .send(
              responseUtils.failed(
                "Artist name already exist, please insert different artist name"
              )
            )
          break
        default:
          res
            .status(httpStatus.BAD_REQUEST)
            .send(responseUtils.failed(err.errors[0].message))
      }
      break
    case "Bad Request":
      res.status(httpStatus.BAD_REQUEST).send(responseUtils.failed(err.message))
      break
    case "JsonWebTokenError":
      res
        .status(httpStatus.UNAUTHORIZED)
        .send(responseUtils.failed(err.message))
      break
    case "Unauhtorized":
      res
        .status(httpStatus.UNAUTHORIZED)
        .send(responseUtils.failed(err.message))
      break
    case "SequelizeForeignKeyConstraintError":
      res
        .status(httpStatus.BAD_REQUEST)
        .send(
          responseUtils.failed(
            ` Foreign key error, there is no '${err.value}' value in table '${err.table}' `
          )
        )
      break
    case "SequelizeDatabaseError":
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(responseUtils.failed(err.message))
      break
    case "Not Found":
      res.status(httpStatus.NOT_FOUND).send(responseUtils.failed(err.message))
      break
    case "SequelizeForeignKeyConstraintError":
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(responseUtils.failed(err.message))
      break
    case "SequelizeForeignKeyConstraintError":
      res
        .status(httpStatus.BAD_REQUEST)
        .send({ status: "failed", message: err.message })
    default:
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(responseUtils.failed(err.message))
  }
}
