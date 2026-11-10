package cruz.bingoConceicao.domain.bingo;

import cruz.bingoConceicao.domain.bingo.enums.Premio;
import jakarta.persistence.*;

@Entity
@Table(name = "numero_sorteado")
public class NumeroSorteado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer numero;

    @Enumerated(EnumType.STRING)
    private Premio premio;

    public NumeroSorteado() {}

    public NumeroSorteado(Integer numero, Premio premio) {
        this.numero = numero;
        this.premio = premio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Premio getPremio() {
        return premio;
    }

    public void setPremio(Premio premio) {
        this.premio = premio;
    }
}
