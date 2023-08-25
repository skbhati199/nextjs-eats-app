import prismadb from "./prismadb";

// Create a new User
export async function createUser(
  email: string,
  name: string,
  password?: string
) {
  const existingUser = await prismadb.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    throw new Error(`User with id ${email} already exist.`);
  }

  return await prismadb.user.create({
    data: {
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
export async function deleteUser(
    userId: string,
  ) {
    const existingUser = await prismadb.user.findUnique({
      where: { id: userId },
    });
  
    if (!existingUser) {
      throw new Error(`User with id ${userId} does not exist.`);
    }
  
    return await prismadb.user.delete({
      where: {
        id: userId,
      }
    });
  }
  
