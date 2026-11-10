package cruz.bingoConceicao.domain.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticationService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String identificador) throws UsernameNotFoundException {
        // Agora, quando o Spring pedir um usuário, nós buscamos nas 3 colunas!
        return repository.findByLogin(identificador)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado."));
    }
}

