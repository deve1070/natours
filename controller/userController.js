const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user posts password or passwordConfirm
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      AppError(
        'This route is not for password update. Please use /updatePassword',
        400,
      ),
    );
  }

  // Update user document
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
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
