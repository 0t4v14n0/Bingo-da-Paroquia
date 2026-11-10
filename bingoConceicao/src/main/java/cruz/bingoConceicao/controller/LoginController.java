package cruz.bingoConceicao.controller;

import cruz.bingoConceicao.domain.usuario.Usuario;
import cruz.bingoConceicao.domain.usuario.dto.DadosAutenticacao;
import cruz.bingoConceicao.infra.security.TokenDataJWT;
import cruz.bingoConceicao.infra.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin; // 🔥 IMPORTANTE
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "*") // 🔥 A MÁGICA CONTRA O ERRO 403 NO REACT
public class LoginController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> efetuarLogin(@RequestBody @Valid DadosAutenticacao dados) {
        try {

            // Passamos o 'identificador' genérico
            var authenticationToken = new UsernamePasswordAuthenticationToken(dados.identificador(), dados.senha());

            var authentication = manager.authenticate(authenticationToken);

            var usuario = (Usuario) authentication.getPrincipal();

            assert usuario != null;

            var tokenJWT = tokenService.gerarToken(usuario);

            return ResponseEntity.ok(new TokenDataJWT(tokenJWT));

        } catch (DisabledException e) {
            // Captura o bloqueio da falta de confirmação de e-mail
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Acesso negado: Você precisa confirmar o seu e-mail antes de fazer login.");

        } catch (BadCredentialsException e) {
            // Captura erro de e-mail ou senha incorretos
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("E-mail ou senha incorretos.");
        }
    }
}