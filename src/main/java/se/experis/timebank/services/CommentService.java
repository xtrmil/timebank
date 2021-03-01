package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.Comment;
import se.experis.timebank.models.User;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.models.VacationRequest;
import se.experis.timebank.repositories.CommentRepository;
import se.experis.timebank.repositories.UserRepository;
import se.experis.timebank.repositories.VacationRequestRepository;


import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private VacationRequestRepository vacationRequestRepository;
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<CommonResponse> getAllCommentsByRequestId(Long requestId, UserCredentials userCredentials) {
        CommonResponse cr = new CommonResponse();
        Optional<VacationRequest> optionalRequest = vacationRequestRepository.findById(requestId);

        if (optionalRequest.isPresent()) {
            if (optionalRequest.get().getUser().getId() == userCredentials.getId() || userCredentials.isAdmin()) {
                cr.data = commentRepository.findAllByVacationRequestIdOrderByCreatedAtDesc(requestId); // add sorting chronological order (soonest first)
                cr.msg = "all Comments on request with id: " + requestId;
                cr.status = HttpStatus.OK;
            } else {
                cr.msg = "Unauthorized operation";
                cr.status = HttpStatus.UNAUTHORIZED;
            }
        } else {
            cr.msg = "Request id not found, unable to get all comments.";
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> createComment(Long requestId, Comment newComment, UserCredentials userCredentials) {
        CommonResponse cr = new CommonResponse();
        Optional<VacationRequest> optionalRequest = vacationRequestRepository.findById(requestId);

        if (optionalRequest.isPresent()) {
            if (optionalRequest.get().getUser().getId() == userCredentials.getId() || userCredentials.isAdmin()) {
                newComment.setVacationRequest(optionalRequest.get());
                User user = userRepository.findById(userCredentials.getId()).get();
                newComment.setUser(user);
                commentRepository.save(newComment);

                cr.data = newComment;
                cr.msg = "New Comment added. ";
                cr.status = HttpStatus.CREATED;
            } else {
                cr.msg = "Unauthorized operation";
                cr.status = HttpStatus.UNAUTHORIZED;
            }
        } else {
            cr.msg = "User with id:" + userCredentials.getId() + " was not found.";
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    /**
     * TODO validate for edit within 24h
     */
    public ResponseEntity<CommonResponse> updateCommentById(Long commentId, Comment newComment, UserCredentials userCredentials) {
        CommonResponse cr = new CommonResponse();
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        if (optionalComment.isPresent()) {
            if (optionalComment.get().getUser().getId() == userCredentials.getId()) {
                Comment comment = optionalComment.get();
                if (newComment.getMessage() != null) {
                    comment.setMessage(newComment.getMessage());
                }
                cr.data = commentRepository.save(comment);
                cr.msg = "Comment with id " + commentId + " was updated";
                cr.status = HttpStatus.OK;
            } else {
                cr.msg = "Unauthorized operation";
                cr.status = HttpStatus.UNAUTHORIZED;
            }
        } else {
            cr.msg = "Comment  with id " + commentId + " not found";
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> deleteCommentById(Long id, UserCredentials userCredentials) {
        CommonResponse cr = new CommonResponse();

        Optional<Comment> optionalComment = commentRepository.findById(id);

        if (optionalComment.isPresent()) {
            if (optionalComment.get().getUser().getId() == userCredentials.getId()) {
                commentRepository.deleteById(id);
                cr.status = HttpStatus.OK;
                cr.msg = "Comment with id: " + id + " successfully deleted";
            } else {
                cr.msg = "Unauthorized operation";
                cr.status = HttpStatus.UNAUTHORIZED;
            }
        } else {
            cr.msg = "Comment with id: " + id + " not found";
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

//    public ResponseEntity<CommonResponse> getCommentById(Long id) {
//        CommonResponse cr = new CommonResponse();
//        Optional<Comment> commentOptional = commentRepository.findById(id);
//        if (commentOptional.isPresent()) {
//            cr.data = commentOptional.get();
//            cr.msg = "Comment found with id: " + id;
//            cr.status = HttpStatus.OK;
//        } else {
//            cr.msg = "No Comment found with id: " + id;
//            cr.status = HttpStatus.NOT_FOUND;
//        }
//        return new ResponseEntity<>(cr, cr.status);
//    }
}
