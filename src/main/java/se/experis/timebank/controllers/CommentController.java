package se.experis.timebank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import se.experis.timebank.models.Comment;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.services.CommentService;
import se.experis.timebank.services.CommonResponse;

@RestController
@RequestMapping("/api/v1/comment/")

public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("{requestId}")
    public ResponseEntity<CommonResponse> getAllCommentsByRequestId(@PathVariable Long requestId, @AuthenticationPrincipal UserCredentials userCredentials) {
        return commentService.getAllCommentsByRequestId(requestId, userCredentials);
    }

    @PostMapping("{requestId}")
    public ResponseEntity<CommonResponse> createComment(@PathVariable Long requestId, @RequestBody Comment newComment, @AuthenticationPrincipal UserCredentials userCredentials){
        return commentService.createComment(requestId,newComment, userCredentials);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommonResponse> updateCommentById(@PathVariable Long commentId, @RequestBody Comment newComment, @AuthenticationPrincipal UserCredentials userCredentials){
        return commentService.updateCommentById(commentId,newComment,userCredentials);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<CommonResponse> deleteCommentById(@PathVariable Long commentId, @AuthenticationPrincipal UserCredentials userCredentials){
        return commentService.deleteCommentById(commentId,userCredentials);
    }

//    @GetMapping("/{commentId}")
//    public ResponseEntity<CommonResponse> getCommentById(@PathVariable Long requestId, @PathVariable Long commentId){
//        return commentService.getCommentById(commentId);
//    }
}
