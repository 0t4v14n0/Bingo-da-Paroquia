package cruz.bingoConceicao.domain.bingo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartelaRepository extends JpaRepository<Cartela, Long> {
    List<Cartela> findAllByBateuTvFalse();
    List<Cartela> findAllByBateuMotoFalse();
    List<Cartela> findAllByBateuCarroFalse();
}
