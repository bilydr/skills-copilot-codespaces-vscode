// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/user');
var Post = require('../models/post');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

// Create comment
router.post('/create', function (req, res) {
    if (!req.body.postId || !req.body.userId || !req.body.content) {
        res.json({ success: false, message: 'Please fill all fields' });
    } else {
        var comment = new Comment({
            postId: req.body.postId,
            userId: req.body.userId,
            content: req.body.content
        });
        comment.save(function (err) {
            if (err) {
                res.json({ success: false, message: 'Comment already exists' });
            } else {
                res.json({ success: true, message: 'Comment created' });
            }
        });
    }
});

// Get comments by post id
router.get('/post/:id', function (req, res) {
    Comment.find({ postId: req.params.id }, function (err, comments) {
        if (err) {
            res.json({ success: false, message: 'Error' });
        } else {
            res.json({ success: true, comments: comments });
        }
    });
});

// Get comments by user id
router.get('/user/:id', function (req, res) {
    Comment.find({ userId: req.params.id }, function (err, comments) {
        if (err) {
            res.json({ success: false, message: 'Error' });
        } else {
            res.json({ success: true, comments: comments });
        }
    });
});

// Edit comment
router.put('/edit/:id', function (req, res) {
    if (!req.body.content) {
        res.json({ success: false, message: 'Please fill all fields' });
    } else {
        Comment.findOne({ _id: req.params.id }, function (err, comment) {
            if (err) {
                res.json({ success: false, message: 'Error' });
            } else {
                comment.content = req.body.content;
                comment.save(function (err) {
                    if (err) {
                        res.json({ success: false, message: 'Error' });
                    } else {
                        res.json({ success: true, message: 'Comment edited' });
                    }
                });
            }
        });
    }
});