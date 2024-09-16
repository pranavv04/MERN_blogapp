const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Add a new blog post
router.post('/addblog', async (req, res) => {
    try {
        const data = req.body;
        const newBlog = new Blog(data);
        const response = await newBlog.save();
        console.log('New blog post added');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch all blog posts
router.get('/', async (req, res) => {
    try {
        const data = await Blog.find();
        console.log('Blog data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch a blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        if (blogId) {
            const response = await Blog.findById(blogId); // Use findById instead of find
            if (!response) {
                return res.status(404).json({ error: "Blog post not found" });
            }
            console.log('Blog data fetched');
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: "Invalid ID" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a blog post by ID
router.put('/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const updateBlog = req.body;
        const response = await Blog.findByIdAndUpdate(blogId, updateBlog, {
            new: true,
            runValidators: true
        });
        if (!response) {
            return res.status(404).json({ error: "Failed to update blog post" });
        }
        console.log("Post updated");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a blog post by ID
router.delete('/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const response = await Blog.findByIdAndDelete(blogId);
        if (!response) {
            return res.status(404).json({ error: "Failed to delete post" });
        }
        console.log("Blog post deleted");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
