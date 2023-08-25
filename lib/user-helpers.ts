import prismadb from "./prismadb";

// Create a new User
export async function getUser(userId: string) {
  const existingUser = await prismadb.user.findUnique({
    where: { id: userId },
  });

  if (existingUser) {
    throw new Error(`User with id ${userId} already exist.`);
  }

  return await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });
}

// Create a new User
export async function createUser(
  userId: string,
  email: string,
  name: string,
  password?: string
) {
  const existingUser = await prismadb.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    return existingUser;
  }

  return await prismadb.user.create({
    data: {
      id: userId,
      email: email,
      name: name,
      password: password ?? "",
    },
  });
}

// Update a new User
export async function updateUser(
  userId: string,
  email: string,
  name: string,
  password?: string
) {
  const existingUser = await prismadb.user.findUnique({
    where: { email: email },
  });

  if (!existingUser) {
    throw new Error(`User with id ${email} does not exist.`);
  }

  return await prismadb.user.update({
    where: {
      id: userId,
    },
    data: {
      email: email,
      name: name,
      password: password ?? "",
    },
  });
}

// Update a new User
export async function deleteUser(userId: string) {
  const existingUser = await prismadb.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new Error(`User with id ${userId} does not exist.`);
  }

  return await prismadb.user.delete({
    where: {
      id: userId,
    },
  });
}
