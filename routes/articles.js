const express = require('express');
const Article = require('../models/article');
const router = express.Router();

// Define routes for articles

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', { article: article });
});

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article == null) res.redirect('/');
    res.render('articles/show', { article: article });
});

router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });

    try {
        const savedArticle = await article.save();
        res.redirect(`/articles/${savedArticle.slug}`);
    } catch (err) {
        console.error(err);
        res.render('articles/new', { article: article });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        const updatedArticle = await article.save();
        res.redirect(`/articles/${updatedArticle.slug}`);
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// Export the router
module.exports = router;
