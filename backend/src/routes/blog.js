const express = require('express');

const router = express.Router();

// Mock blogs data
const mockBlogs = [
  {
    id: '1',
    title: 'Understanding Vastu Shastra: The Ancient Science of Architecture',
    slug: 'understanding-vastu-shastra',
    content: 'Vastu Shastra is an ancient Indian science of architecture that helps create harmonious living spaces...',
    excerpt: 'Learn about the ancient science of Vastu Shastra and how it can transform your living space.',
    author: 'Vastu Shakti Team',
    category: 'Vastu Basics',
    tags: ['vastu', 'architecture', 'harmony'],
    language: 'en',
    published: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'वास्तु शास्त्र की मूल बातें',
    slug: 'vastu-shastra-basics-hindi',
    content: 'वास्तु शास्त्र वास्तुकला का एक प्राचीन भारतीय विज्ञान है...',
    excerpt: 'वास्तु शास्त्र की मूल बातें जानें और अपने जीवन को सुधारें।',
    author: 'Vastu Shakti Team',
    category: 'Vastu Basics',
    tags: ['vastu', 'hindi', 'basics'],
    language: 'hi',
    published: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  }
];

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { language = 'en', category, page = 1, limit = 10 } = req.query;
    
    let filteredBlogs = mockBlogs.filter(blog => 
      blog.published && blog.language === language
    );

    if (category) {
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Simple pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

    res.json({
      blogs: paginatedBlogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        author: blog.author,
        category: blog.category,
        tags: blog.tags,
        language: blog.language,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt
      })),
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredBlogs.length / limit),
        totalBlogs: filteredBlogs.length,
        hasNext: endIndex < filteredBlogs.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get blog by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { language = 'en' } = req.query;

    const blog = mockBlogs.find(b => 
      b.slug === slug && b.language === language && b.published
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({
      blog: {
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        excerpt: blog.excerpt,
        author: blog.author,
        category: blog.category,
        tags: blog.tags,
        language: blog.language,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt
      }
    });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;