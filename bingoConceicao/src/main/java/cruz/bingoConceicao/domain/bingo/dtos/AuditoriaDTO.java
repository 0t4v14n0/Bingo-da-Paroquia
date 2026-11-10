package cruz.bingoConceicao.domain.bingo.dtos;

import cruz.bingoConceicao.domain.bingo.Cartela;

import java.util.List;
import java.util.Set;

public record AuditoriaDTO(
        Cartela cartela,
        List<Integer> sequenciaSorteioTv,
        Set<Integer> acertosTv,
        List<Integer> sequenciaSorteioMoto,
        Set<Integer> acertosMoto,
        List<Integer> sequenciaSorteioCarro,
        Set<Integer> acertosCarro
) {}