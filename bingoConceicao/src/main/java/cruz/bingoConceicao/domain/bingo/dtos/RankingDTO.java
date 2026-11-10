package cruz.bingoConceicao.domain.bingo.dtos;

public record RankingDTO(
        String nomeDono,
        int acertos,
        int faltam,
        double porcentagem
) {}
