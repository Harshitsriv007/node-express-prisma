const prisma = require('../config/db');
const AppError = require('../utils/AppError');

exports.getAllUsers = async () => {
    try {
    // return await prisma.user.findMany(); //single fetch
    return await prisma.user.findMany({
            include: {
                posts: true
            }
        });
    } catch (error) {
        throw error;
    }
};


exports.createUser = async (userData) => {
    try {
    return await prisma.user.create({ data: userData });
    } catch (error) {
        throw error;
    }
};

exports.getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

exports.updateUser = async (id, userData) => {
    try {
    return await prisma.user.update({
        where: { id: id },
        data: userData
    });
    } catch (error) {
        throw error;
    }
};

exports.deleteUser = async (id) => {
    try {
    return await prisma.user.delete({
        where: { id: id }
    });
    } catch (error) {
        throw error;
    }
};