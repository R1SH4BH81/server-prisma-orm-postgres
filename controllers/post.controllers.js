const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

const getAll = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ include: { author: true } });

    res.json(posts);
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.userId;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.status(200).json({ message: "post created" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const authorId = req.user.userId;

    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (post.authorId !== authorId)
      return res.status(403).json({ error: "Forbidden" });

    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
    });

    res, json(updated);
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const authorId = req.user.userId;

    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    if (post.authorId !== authorId)
      return res.status(403).json({ error: "Forbidden" });

    await prisma.post.delete({ where: { id: Number(id) } });
    res.json({ message: "deleted Post" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAll, updatePost, createPost, deletePost };
