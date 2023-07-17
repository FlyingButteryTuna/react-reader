package dev.epiphany.readerapi.auth;

import dev.epiphany.readerapi.user.Role;
import dev.epiphany.readerapi.user.User;
import dev.epiphany.readerapi.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.session.ConcurrentSessionControlAuthenticationStrategy;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
    private final SecurityContextRepository securityContextRepository;
    private final ConcurrentSessionControlAuthenticationStrategy sessionControlAuthenticationStrategy;
    private final SessionRegistry sessionRegistry;

    public AuthenticationResponse register(RegisterRequest requestBody, HttpServletRequest request,
                                           HttpServletResponse response) {
        var user = User.builder()
                .firstname(requestBody.getFirstname())
                .lastname(requestBody.getLastname())
                .email(requestBody.getEmail())
                .password(passwordEncoder.encode(requestBody.getPassword()))
                .role(Role.USER)
                .build();
        var savedUser = repository.save(user);
        return AuthenticationResponse.builder()
                .userid(savedUser.getId())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest requestBody, HttpServletRequest request,
                                               HttpServletResponse response) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        requestBody.getEmail(),
                        requestBody.getPassword()
                )
        );
        System.out.println(sessionRegistry.getAllSessions(auth.getPrincipal(), false).size());
        System.out.println("login");
        sessionControlAuthenticationStrategy.onAuthentication(auth, request, response);
        System.out.println("login1");
        var user = repository.findByEmail(requestBody.getEmail()).orElseThrow();

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);

        securityContextHolderStrategy.setContext(context);
        securityContextRepository.saveContext(context, request, response);
        securityContextHolderStrategy.getContext().getAuthentication().getDetails();

        return AuthenticationResponse.builder()
                .userid(user.getId())
                .build();
    }
}
