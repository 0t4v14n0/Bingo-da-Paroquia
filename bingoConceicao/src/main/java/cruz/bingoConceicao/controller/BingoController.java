package cruz.bingoConceicao.controller;

import cruz.bingoConceicao.domain.bingo.BingoService;
import cruz.bingoConceicao.domain.bingo.Cartela;
import cruz.bingoConceicao.domain.bingo.dtos.RankingDTO;
import cruz.bingoConceicao.domain.bingo.enums.Premio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bingo")
public class BingoController {

    @Autowired
    private BingoService service;

    // --- CADASTRO ANTES DO EVENTO ---

    // Endpoint: POST /api/bingo/cartelas
    @PostMapping("/cartelas")
    public ResponseEntity<Cartela> cadastrar(@RequestBody Cartela cartela) {
        return ResponseEntity.ok(service.cadastrar(cartela));
    }

    // Endpoint: GET /api/bingo/cartelas
    @GetMapping("/cartelas")
    public ResponseEntity<List<Cartela>> listar() {
        return ResponseEntity.ok(service.listarTodas());
    }

    // Endpoint: DELETE /api/bingo/cartelas/{id}
    @DeleteMapping("/cartelas/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // --- OPERAÇÃO DURANTE O BINGO ---

    // Endpoint: POST /api/bingo/sortear/{premio}/{numero}
    // Exemplo de uso: /api/bingo/sortear/TV/45
    @PostMapping("/sortear/{premio}/{numero}")
    public ResponseEntity<List<Cartela>> sortear(@PathVariable Premio premio, @PathVariable Integer numero) {

        List<Cartela> ganhadores = service.registrarPedraCantada(numero, premio);

        // Retorna a lista para o React.
        // O React só precisa fazer: if (res.data.length > 0) { alert('BINGO!') }
        return ResponseEntity.ok(ganhadores);
    }

    // Endpoint: GET /api/bingo/sorteados/{premio}
    // Útil caso o frontend precise recarregar a tela do locutor e mostrar quais pedras já saíram
    @GetMapping("/sorteados/{premio}")
    public ResponseEntity<List<Integer>> listarSorteados(@PathVariable Premio premio) {
        return ResponseEntity.ok(service.getSorteados(premio));
    }

    @GetMapping("/ranking/{premio}")
    public ResponseEntity<List<RankingDTO>> obterRanking(@PathVariable Premio premio) {
        return ResponseEntity.ok(service.obterRanking(premio));
    }

    @GetMapping("/vencedores/{premio}")
    public ResponseEntity<List<Cartela>> listarVencedores(@PathVariable Premio premio) {
        return ResponseEntity.ok(service.getVencedores(premio));
    }
}