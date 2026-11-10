package cruz.bingoConceicao.controller;

import cruz.bingoConceicao.domain.bingo.BingoService;
import cruz.bingoConceicao.domain.bingo.dtos.AuditoriaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class PublicBingoController {

    @Autowired
    private BingoService service;

    // Endpoint: GET /public/cartela/{id}
    @GetMapping("/cartela/{id}")
    public ResponseEntity<AuditoriaDTO> auditar(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.auditarCartela(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
