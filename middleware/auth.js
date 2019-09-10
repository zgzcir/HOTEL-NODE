/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 08:18:48
 * @LastEditTime: 2019-09-06 13:30:01
 * @LastEditors: Please set LastEditors
 */
// const admin = require("./../dao/admin");
// const jwt = require("jsonwebtoken");
// const SECRET = "App-puzi";
// const authMiddleware = async (req, res, next) => {
//   const userToken = req.headers.authorization.split(" ").pop();
//   try {
//     const { id } = jwt.verify(userToken, SECRET);
//     await admin
//     .byName(id)
//     .then(data => {
//       req.user = data;
//     })
//   } catch (error) {
//     return res.status(422).send({
//       message: "用户不存在"
//     });
//   }
//   next();
// };

// module.exports = authMiddleware;
