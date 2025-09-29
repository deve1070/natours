const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});
// exports.getUser = (req, res) => {
//   const id = req.params.id * 1;
//   const user = users.find((el) => el.id == id);
//   res.status(200).json({
//     status: 'success',
//     data: {
//       user,
//     },
//   });
// };
// exports.deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'failur',
//     message: 'This route is not yet implemented',
//   });
// };
// exports.updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'failur',
//     message: 'This route is not yet implemented',
//   });
// };
// exports.createUser = (req, res) => {
//   const newId = users[users.length - 1].id + 1;
//   const newUser = Object.assign({ id: newId }, req.body);

//   users.push(newUser);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/users.json`,
//     JSON.stringify(users),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           newUser,
//         },
//       });
//     },
//   );
// };
