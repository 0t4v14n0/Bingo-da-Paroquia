package cruz.bingoConceicao.domain.bingo;

import cruz.bingoConceicao.domain.bingo.enums.Premio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NumeroSorteadoRepository extends JpaRepository<NumeroSorteado, Long> {
    List<NumeroSorteado> findAllByPremioOrderByIdAsc(Premio premio);
}
