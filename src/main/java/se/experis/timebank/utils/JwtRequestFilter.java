package se.experis.timebank.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.services.UserCredentialsService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter  extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserCredentialsService userCredentialsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String header = request.getHeader("Authorization");

        String jwt = null;
        String username = null;

        if(header != null && header.startsWith("Bearer ")){
            jwt = header.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }

        if(username !=null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserCredentials userCredentials = userCredentialsService.loadUserByUsername(username);
            if(jwtUtil.validateToken(jwt,userCredentials)){
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userCredentials,null,userCredentials.getAuthorities());
                token.setDetails((new WebAuthenticationDetailsSource().buildDetails(request)));
                SecurityContextHolder.getContext().setAuthentication(token);
            }
        }
        filterChain.doFilter(request,response);
    }
}
