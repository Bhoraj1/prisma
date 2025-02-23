import prisma from "../DB/db.config.js";
export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  if (!user_id) {
    return res
      .status(400)
      .json({ message: "User Id id required for creating post!" });
  }

  const newPost = await prisma.post.create({
    data: {
      user_id,
      title,
      description,
    },
  });
  return res.json({
    status: 200,
    data: newPost,
    message: "Post created Successfully!",
  });
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description } = req.body;

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      description,
    },
  });
  return res.json({
    status: 200,
    data: updatedPost,
    message: "Post updated successfully",
  });
};

export const getPosts = async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  if (page < 1) page = 1;
  if (limit < 0 || limit > 100) limit = 10;

  const skip = (page - 1) * limit;
  const postId = req.params.id;
  if (postId) {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    return res.json({ status: 200, data: post });
  } else {
    const posts = await prisma.post.findMany({
      skip: skip,
      take: limit,
      include: {
        comment: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      //filtering
      // where: {
      //   comment_count: {
      //     gte: 0,
      //   },
      // },
      // where: {
      //   title: {
      //     startsWith: "h",
      //     // endsWith: "h",
      //     //  equals: "next.js tutorial",
      //   },
      // },
      // where: {
      //   OR: [
      //     {
      //       title: {
      //         startsWith: "h",
      //       },
      //     },
      //     {
      //       title: {
      //         endsWith: "parts",
      //       },
      //     },
      //   ],
      // },
      // where: {
      //   AND: [
      //     {
      //       title: {
      //         startsWith: "h",
      //       },
      //     },
      //     {
      //       title: {
      //         endsWith: "parts",
      //       },
      //     },
      //   ],
      // },
      // where: {
      //   NOT: {
      //     title: {
      //       startsWith: "parts",
      //     },
      //   },
      // },
    });
    const totalPosts = await prisma.post.count();
    const totalPages = Math.ceil(totalPosts / limit);
    return res.json({
      status: 200,
      data: posts,
      meta: { totalPages, currentPage: page, limit: limit },
    });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  //to get the total post count

  return res.json({
    status: 200,
    message: "Post Delete Successfully!",
  });
};

export const searchPost = async (req, res) => {
  const query = req.query.q;
  const posts = await prisma.post.findMany({
    where: {
      description: {
        search: query,
      },
    },
  });
  return res.json({ status: 200, data: posts, message: "Your search result" });
};
