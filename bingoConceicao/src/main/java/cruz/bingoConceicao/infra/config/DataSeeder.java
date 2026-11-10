package cruz.bingoConceicao.infra.config;

import cruz.bingoConceicao.domain.usuario.Usuario;
import cruz.bingoConceicao.domain.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Verifica se o usuário 'admin' já existe no banco
        if (repository.findByLogin("admin").isEmpty()) {
            Usuario admin = new Usuario();
            admin.setLogin("admin");

            // O próprio Spring gera o hash compatível com ele mesmo
            String senhaCodificada = passwordEncoder.encode("123456");
            admin.setSenha(senhaCodificada);

            repository.save(admin);
            System.out.println("Usuário 'admin' criado com sucesso com a senha '123456'.");
        }
    }
}
