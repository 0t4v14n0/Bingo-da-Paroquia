package cruz.bingoConceicao.domain.bingo;

import cruz.bingoConceicao.domain.bingo.dtos.AuditoriaDTO;
import cruz.bingoConceicao.domain.bingo.dtos.RankingDTO;
import cruz.bingoConceicao.domain.bingo.enums.Premio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BingoService {

    @Autowired
    private CartelaRepository cartelaRepository;

    @Autowired
    private NumeroSorteadoRepository numeroRepository;

    // --- CRUD DE CARTELAS ---
    public Cartela cadastrar(Cartela cartela) {
        return cartelaRepository.save(cartela);
    }

    public List<Cartela> listarTodas() {
        return cartelaRepository.findAll();
    }

    public void deletar(Long id) {
        cartelaRepository.deleteById(id);
    }

    // --- SORTEIO OFICIAL (CHAMADO PELO FRONTEND) ---
    public List<Cartela> registrarPedraCantada(Integer numero, Premio premio) {

        // 1. Salva a pedra no banco de dados para garantir que não será perdida
        boolean jaSaiu = numeroRepository.findAllByPremioOrderByIdAsc(premio)
                .stream().anyMatch(n -> n.getNumero().equals(numero));

        if (!jaSaiu) {
            numeroRepository.save(new NumeroSorteado(numero, premio));
        }

        // 2. Busca o histórico de todas as pedras já cantadas para ESSE prêmio
        List<Integer> todasPedrasCantadas = getSorteados(premio);

        // 3. Busca apenas as cartelas dos seus amigos que ainda NÃO ganharam esse prêmio
        List<Cartela> cartelasAtivas = switch (premio) {
            case TV -> cartelaRepository.findAllByBateuTvFalse();
            case MOTO -> cartelaRepository.findAllByBateuMotoFalse();
            case CARRO -> cartelaRepository.findAllByBateuCarroFalse();
        };

        // 4. A mágica: Verifica se tem alguma cartela onde TODOS os números dela estão nas pedras cantadas
        List<Cartela> ganhadoras = cartelasAtivas.stream()
                .filter(cartela -> todasPedrasCantadas.containsAll(cartela.getNumeros()))
                .toList();

        // 5. Se alguém bateu, salva no banco para ele não ganhar de novo no mesmo prêmio
        if (!ganhadoras.isEmpty()) {
            for (Cartela c : ganhadoras) {
                if (premio == Premio.TV) c.setBateuTv(true);
                if (premio == Premio.MOTO) c.setBateuMoto(true);
                if (premio == Premio.CARRO) c.setBateuCarro(true);
            }
            cartelaRepository.saveAll(ganhadoras);
        }

        // Retorna a lista de ganhadores (se for vazia, o frontend não faz nada)
        return ganhadoras;
    }

    // --- AUDITORIA ---
    public AuditoriaDTO auditarCartela(Long id) {
        Cartela c = cartelaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cartela não encontrada"));

        // Busca do banco as pedras sorteadas de cada rodada
        List<Integer> tv = getSorteados(Premio.TV);
        List<Integer> moto = getSorteados(Premio.MOTO);
        List<Integer> carro = getSorteados(Premio.CARRO);

        // Cruza os números da cartela com os que já saíram
        Set<Integer> acertosTv = c.getNumeros().stream().filter(tv::contains).collect(Collectors.toSet());
        Set<Integer> acertosMoto = c.getNumeros().stream().filter(moto::contains).collect(Collectors.toSet());
        Set<Integer> acertosCarro = c.getNumeros().stream().filter(carro::contains).collect(Collectors.toSet());

        return new AuditoriaDTO(c, tv, acertosTv, moto, acertosMoto, carro, acertosCarro);
    }

    // --- UTILITÁRIOS ---
    public List<Integer> getSorteados(Premio premio) {
        return numeroRepository.findAllByPremioOrderByIdAsc(premio)
                .stream()
                .map(NumeroSorteado::getNumero)
                .toList();
    }


    public List<RankingDTO> obterRanking(Premio premio) {
        List<Cartela> cartelas = cartelaRepository.findAll(); // Ajuste para o nome do seu repository de cartelas
        List<Integer> sorteados = getSorteados(premio); // O método que você já tem que retorna List<Integer>

        return cartelas.stream()
                .map(cartela -> {
                    long acertos = cartela.getNumeros().stream().filter(sorteados::contains).count();
                    int total = cartela.getNumeros().size();
                    int faltam = (int) (total - acertos);
                    double porcentagem = ((double) acertos / total) * 100.0;

                    return new RankingDTO(cartela.getNomeDono(), (int) acertos, faltam, porcentagem);
                })
                // Filtra para não mostrar quem já bateu (opcional, tira da lista se faltam 0)
                .filter(r -> r.faltam() > 0)
                // Ordena do maior número de acertos para o menor
                .sorted((a, b) -> Integer.compare(b.acertos(), a.acertos()))
                // Pega apenas os 3 mais próximos de bater
                .limit(3)
                .toList();
    }

    public List<Cartela> getVencedores(Premio premio) {
        return cartelaRepository.findAll().stream()
                .filter(c -> {
                    if (premio == Premio.TV) return c.isBateuTv();
                    if (premio == Premio.MOTO) return c.isBateuMoto();
                    if (premio == Premio.CARRO) return c.isBateuCarro();
                    return false;
                })
                .toList();
    }
}