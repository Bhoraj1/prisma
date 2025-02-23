import prisma from "../DB/db.config.js";
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (findUser) {
    return res.json({
      status: 400,
      message: "Email already exist, Please use another email",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  return res.json({
    status: 200,
    data: newUser,
    message: "User created Successfully!",
  });
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
      password,
    },
  });
  return res.json({ status: 200, message: "User updated successfully" });
};

export const getUsers = async (req, res) => {
  const userId = req.params.id;
  if (userId) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return res.json({ status: 200, data: user });
  } else {
    const users = await prisma.user.findMany({
      select: {
        _count: {
          select: {
            post: true,
            comment: true,
          },
        },
      },
    });
    return res.json({ status: 200, data: users });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return res.json({ status: 200, message: "User Delete Successfully!" });
};
