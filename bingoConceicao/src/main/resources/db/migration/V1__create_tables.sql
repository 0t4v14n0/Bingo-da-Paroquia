-- 1. Cria a tabela de Usuários (para o login)
CREATE TABLE usuario (
                         id BIGSERIAL PRIMARY KEY,
                         login VARCHAR(255) NOT NULL UNIQUE,
                         senha_hash VARCHAR(255) NOT NULL
);

-- 2. Cria a tabela principal da Cartela
CREATE TABLE cartela (
                         id BIGSERIAL PRIMARY KEY,
                         nome_dono VARCHAR(255),
                         telefone VARCHAR(20),
                         bateu_tv BOOLEAN NOT NULL DEFAULT FALSE,
                         bateu_moto BOOLEAN NOT NULL DEFAULT FALSE,
                         bateu_carro BOOLEAN NOT NULL DEFAULT FALSE
);

-- 3. Cria a tabela associativa para os números (ElementCollection)
CREATE TABLE cartela_numeros (
                                 cartela_id BIGINT NOT NULL,
                                 numeros INTEGER NOT NULL,
                                 CONSTRAINT fk_cartela_numeros FOREIGN KEY (cartela_id) REFERENCES cartela(id) ON DELETE CASCADE
);

CREATE TABLE numero_sorteado (
                                 id BIGSERIAL PRIMARY KEY,
                                 numero INTEGER NOT NULL,
                                 premio VARCHAR(50) NOT NULL
);

-- (Opcional) Insere o usuário padrão de administração
-- A senha aqui é '123456' encodada usando BCrypt.
INSERT INTO usuario (login, senha_hash)
VALUES ('admin', '$2a$10$Y50UaMFOxteibQEYLrwuHeehHYfcoafCopUazP12.rqB41bsolF5.');