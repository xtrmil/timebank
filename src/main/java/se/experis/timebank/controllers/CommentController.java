package se.experis.timebank.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.experis.timebank.models.Comment;
import se.experis.timebank.services.CommonResponse;

@RestController
@RequestMapping("/api/v1/request/{requestId}/comment")

public class CommentController {

    @GetMapping("")
    public ResponseEntity<CommonResponse> getAllCommentsByRequestId(@PathVariable Long requestId) {
        return null;
    }

    @PostMapping("")
    public ResponseEntity<CommonResponse> createComment(@PathVariable Long requestId, @RequestBody Comment newComment){
        return null;
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<CommonResponse> getCommentById(@PathVariable Long requestId, @PathVariable Long commentId){
        return null;
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<CommonResponse> updateCommentById(@PathVariable Long requestId, @PathVariable Long commentId){
        return null;
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<CommonResponse> deleteCommentById(@PathVariable Long requestId, @PathVariable Long commentId){
        return null;
    }
}
