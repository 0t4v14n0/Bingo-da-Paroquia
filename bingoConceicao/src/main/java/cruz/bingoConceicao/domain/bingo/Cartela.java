package cruz.bingoConceicao.domain.bingo;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Cartela {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeDono;
    private String telefone;

    // A mesma cartela serve para os 3 prêmios
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "cartela_numeros", joinColumns = @JoinColumn(name = "cartela_id"))
    private Set<Integer> numeros = new HashSet<>();

    private boolean bateuTv = false;
    private boolean bateuMoto = false;
    private boolean bateuCarro = false;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeDono() {
        return nomeDono;
    }

    public void setNomeDono(String nomeDono) {
        this.nomeDono = nomeDono;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Set<Integer> getNumeros() {
        return numeros;
    }

    public void setNumeros(Set<Integer> numeros) {
        this.numeros = numeros;
    }

    public boolean isBateuTv() {
        return bateuTv;
    }

    public void setBateuTv(boolean bateuTv) {
        this.bateuTv = bateuTv;
    }

    public boolean isBateuMoto() {
        return bateuMoto;
    }

    public void setBateuMoto(boolean bateuMoto) {
        this.bateuMoto = bateuMoto;
    }

    public boolean isBateuCarro() {
        return bateuCarro;
    }

    public void setBateuCarro(boolean bateuCarro) {
        this.bateuCarro = bateuCarro;
    }
}
