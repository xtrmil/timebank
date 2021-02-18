package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.Comment;
import se.experis.timebank.models.User;
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

    public ResponseEntity<CommonResponse> getAllCommentsByRequestId(Long requestId) {
        CommonResponse cr = new CommonResponse();
        cr.data = commentRepository.findAllByVacationRequestId(requestId); // add sorting chronological order (soonest first)
        cr.status = HttpStatus.OK;
        cr.msg = "all Comments on request with id: " + requestId;

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> createComment(Long requestId, Comment newComment) {
        CommonResponse cr = new CommonResponse();
        VacationRequest vacationRequest = vacationRequestRepository.findById(requestId).get();
        User user = userRepository.findById(newComment.getUser().getId()).get();
        newComment.setUser(user);
        newComment.setVacationRequest(vacationRequest);
        commentRepository.save(newComment);
        cr.data = newComment;
        cr.msg = "New Comment added. ";
        cr.status = HttpStatus.CREATED;

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> getCommentById(Long id) {
        CommonResponse cr = new CommonResponse();
        Optional<Comment> commentOptional = commentRepository.findById(id);
        if (commentOptional.isPresent()) {
            cr.data = commentOptional.get();
            cr.msg = "Comment found with id: " + id;
            cr.status = HttpStatus.OK;

        } else {
            cr.msg = "No Comment found with id: " + id;
            cr.status = HttpStatus.NOT_FOUND;
        }

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> updateCommentById(Long id, Comment newComment) {
        CommonResponse cr = new CommonResponse();

        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {

            Comment comment = optionalComment.get();
            if (newComment.getMessage() != null) {
                comment.setMessage(newComment.getMessage());
            }

            cr.data = commentRepository.save(comment);
            cr.msg = "Comment with id " + id + " was updated";
            cr.status = HttpStatus.OK;
        } else {
            cr.msg = "Comment  with id " + id + " not found";
        }

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> deleteCommentById(Long id) {
        CommonResponse cr = new CommonResponse();

        Optional<Comment> optionalComment = commentRepository.findById(id);

        if (optionalComment.isPresent()) {
            commentRepository.deleteById(id);
            cr.status = HttpStatus.OK;
            cr.msg = "Comment with id: " + id + " successfully deleted";
        } else {
            cr.msg = "Comment with id: " + id + " not found";
            cr.status = HttpStatus.NOT_FOUND;
        }

        return new ResponseEntity<>(cr, cr.status);
    }
}
