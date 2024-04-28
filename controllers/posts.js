import PostModel from '../models/post.js';
import createHttpError from 'http-errors';

export const getPosts = async(req, res, next) => {
    try {
        const posts = await PostModel.find({});
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

export const getPost = async(req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      throw createHttpError(404, 'Post not found');
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
}

export const createPost = async(req, res, next) => {
  try {
    const post = new PostModel(req.body);
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
}

export const updatePost = async(req, res, next) => {
  try {
    const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true,
    });
    if (!post) {
      throw createHttpError(404, 'Post not found');
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
}

export const deletePost = async(req, res, next) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);
    if (!post) {
      throw createHttpError(404, 'Post not found');
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
}