package se.experis.timebank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.experis.timebank.models.Comment;
import se.experis.timebank.services.CommentService;
import se.experis.timebank.services.CommonResponse;

@RestController
@RequestMapping("/api/v1/request/{requestId}/comment")

public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("")
    public ResponseEntity<CommonResponse> getAllCommentsByRequestId(@PathVariable Long requestId) {

        return commentService.getAllCommentsByRequestId(requestId);
    }

    @PostMapping("")
    public ResponseEntity<CommonResponse> createComment(@PathVariable Long requestId, @RequestBody Comment newComment){
        return commentService.createComment(requestId,newComment);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<CommonResponse> getCommentById(@PathVariable Long requestId, @PathVariable Long commentId){
        return commentService.getCommentById(commentId);
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<CommonResponse> updateCommentById(@PathVariable Long requestId, @PathVariable Long commentId, @RequestBody Comment newComment){
        return commentService.updateCommentById(commentId,newComment);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<CommonResponse> deleteCommentById(@PathVariable Long requestId, @PathVariable Long commentId){
        return commentService.deleteCommentById(commentId);
    }
}
