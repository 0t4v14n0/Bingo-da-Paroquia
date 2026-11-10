package cruz.bingoConceicao.domain.usuario.dto;

import jakarta.validation.constraints.NotBlank;

public record DadosAutenticacao(
        @NotBlank(message = "O identificador (E-mail, CPF ou Login) é obrigatório")
        String identificador,

        @NotBlank(message = "A senha é obrigatória")
        String senha
) {
}
