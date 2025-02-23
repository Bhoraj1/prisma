import prisma from "../DB/db.config.js";
export const createComment = async (req, res) => {
  // increase the comment counter
  const { user_id, post_id, comment } = req.body;
  await prisma.post.update({
    where: {
      id: post_id,
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

  if (!user_id && post_id) {
    return res
      .status(400)
      .json({ message: "User and post Id id required for creating post!" });
  }

  const newComment = await prisma.comment.create({
    data: {
      user_id,
      post_id,
      comment,
    },
  });
  return res.json({
    status: 200,
    data: newComment,
    message: "Comment created Successfully!",
  });
};

export const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { comment } = req.body;

  const updatedComment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      comment,
    },
  });
  return res.json({
    status: 200,
    data: updatedComment,
    message: "Comment updated successfully",
  });
};

export const getComments = async (req, res) => {
  const commentId = req.params.id;
  if (commentId) {
    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });
    return res.json({ status: 200, data: comment });
  } else {
    const comments = await prisma.comment.findMany({
      include: {
        user: true, //user who comment this post
        post: {
          include: {
            user: true, //user who create the post
          },
        },
      },
    });
    return res.json({ status: 200, data: comments });
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  await prisma.post.update({
    where: {
      id: post_id,
    },
    data: {
      comment_count: {
        decrement: 1,
      },
    },
  });
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  return res.json({ status: 200, message: "Comment Delete Successfully!" });
};
