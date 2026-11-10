<div align="center">

<img src="./docs/banner.png" alt="Bingo da Paróquia Banner" width="100%" />

# ⛪ Bingo da Paróquia — Sistema Full-Stack de Sorteio Ao Vivo

**Gerenciamento de bingo comunitário com radar em tempo real, autenticação JWT e auditoria pública de cartelas.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

[![Status](https://img.shields.io/badge/status-em%20produ%C3%A7%C3%A3o-brightgreen?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#-licença)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](#-contribuindo)

**[🚀 Demo ao Vivo](#-demonstração)** · **[📺 Vídeo Completo](#-vídeo-de-demonstração)** · **[🐛 Reportar Bug](../../issues)** · **[💡 Sugerir Feature](../../issues)**

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Vídeo de Demonstração](#-vídeo-de-demonstração)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Stack Tecnológica](#️-stack-tecnológica)
- [Arquitetura](#️-arquitetura)
- [Estrutura do Repositório](#-estrutura-do-repositório)
- [Como Executar Localmente](#️-como-executar-localmente)
- [Endpoints da API](#-endpoints-da-api)
- [Screenshots](#-screenshots)
- [Segurança](#️-segurança)
- [Roadmap](#-roadmap)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 📌 Sobre o Projeto

O **Bingo da Paróquia** nasceu da necessidade real de modernizar os tradicionais sorteios comunitários: elimina conferência manual, garante transparência e traz uma experiência digital premium para operadores e participantes.

O grande diferencial é o **Radar de Aproximação**: um algoritmo que calcula em tempo real quais cartelas estão mais próximas de bater, exibindo tudo em barras de progresso visuais. Isso permite que o operador saiba *na hora* quem está "quente" — e os participantes podem conferir a própria cartela pela tela pública, sem precisar esperar o locutor.

A interface usa **Glassmorphism** com paleta azul royal (`#051877`) e acento dourado (`#f1c40f`), remetendo à tradição litúrgica mas com polimento moderno.

> 🎯 **Objetivo**: substituir o "bingo de papel" por uma experiência digital confiável, bonita e 100% responsiva.

---

## 📺 Vídeo de Demonstração

<div align="center">

### 🔥 Teaser rápido (GIF)

<img src="./docs/demo.gif" alt="Demonstração em GIF - 15s" width="90%" />

*— Cadastro → Sorteio ao vivo → Radar atualizando —*

### 🎥 Vídeo completo (3 min)

[![Assista ao vídeo completo](https://img.youtube.com/vi/SEU_VIDEO_ID_AQUI/maxresdefault.jpg)](https://www.youtube.com/watch?v=SEU_VIDEO_ID_AQUI)

*Clique na imagem para assistir no YouTube*

</div>

> 💡 **Como criar o GIF**: use [LICEcap](https://www.cockos.com/licecap/) ou [Peek](https://github.com/phw/peek), grave 10–15s mostrando `Login → 3 pedras sorteadas → radar subindo → auditoria`, mantenha abaixo de **8MB** e otimize no [ezgif.com](https://ezgif.com/optimize) se necessário.

---

## 🚀 Principais Funcionalidades

### 🔐 Painel do Operador (Admin)

- **Autenticação JWT** com Spring Security stateless
- **CRUD de cartelas** — Nome, WhatsApp e as 10 dezenas associadas
- **Sorteio multi-prêmio** — TV, Moto e Carro em rodadas independentes
- **Radar de Aproximação** — as 3 cartelas mais próximas em barras animadas
- **Bloqueio automático** do sorteio quando há vencedor
- **Banner de vitória** com destaque visual dourado
- **Histórico de pedras cantadas** por prêmio

### 🔎 Área Pública (Participantes)

- **Auditoria sem login** — busca por ID da cartela
- **Visualização ao vivo** dos acertos por prêmio
- **Sequência pública de sorteio** com ordem das pedras
- **Destaque dourado** nas pedras cantadas que estão na sua cartela
- **Card de vitória** quando a cartela bate

---

## 🛠️ Stack Tecnológica

### Frontend

![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-7-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=flat-square&logo=css3&logoColor=white)

- **React 19** com Hooks + máquina de estados de tela (`login` / `admin` / `auditoria`)
- **Axios** com interceptors para injetar JWT e tratar 401
- **CSS puro** com variáveis, `backdrop-filter` e grid responsivo
- **Poppins** (Google Fonts) + design system dourado/azul

### Backend

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=spring-security&logoColor=white)
![JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=flat-square&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)

- **Spring Boot 3** + **Spring Security** (stateless, JWT)
- **Spring Data JPA** (Hibernate) com `@ElementCollection` para as dezenas
- **JWT** com expiração configurável
- **CORS** configurado por `CorsConfigurationSource`
- **DTOs** (`AuditoriaDTO`, `RankingDTO`) para desacoplamento

---

## 🏗️ Arquitetura

```mermaid
graph LR
    A[👤 Participante] -->|HTTP público| B[🌐 React SPA<br/>Vite]
    C[🔐 Operador] -->|Login JWT| B
    B -->|Axios + Interceptor JWT| D[🚪 API Gateway<br/>Spring Boot]
    D -->|Spring Security| E{🔒 Filtro JWT}
    E -->|endpoints públicos| F[📢 Auditoria]
    E -->|endpoints protegidos| G[⚙️ CRUD Cartelas<br/>Sorteio<br/>Ranking]
    G --> H[(🗄️ PostgreSQL)]
    F --> H
    style A fill:#0a2a9e,color:#fff
    style C fill:#0a2a9e,color:#fff
    style B fill:#f1c40f,color:#000
    style D fill:#6DB33F,color:#fff
    style H fill:#4169E1,color:#fff
```

**Fluxo resumido:**

1. Participante abre o SPA (público) e consulta sua cartela por ID
2. Operador faz login → recebe JWT → guarda em `localStorage`
3. Toda requisição autenticada passa pelo `JwtAuthenticationFilter`
4. Endpoints `/api/bingo/**` exigem token; `/public/**` são abertos
5. Ranking e vencedores são recalculados a cada pedra cantada

---

## 📁 Estrutura do Repositório

```bash
bingo-paroquia/
├── backend/                    # 🍃 API Spring Boot
│   ├── src/main/java/...
│   │   ├── controller/         # Endpoints REST
│   │   ├── service/            # Regras de negócio
│   │   ├── repository/         # Spring Data JPA
│   │   ├── model/              # Entidades (Cartela, Sorteio)
│   │   ├── dto/                # AuditoriaDTO, RankingDTO
│   │   └── security/           # JWT filter, CORS, UserDetails
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/                   # ⚛️ React + Vite
│   ├── src/
│   │   ├── assets/             # Logo da padroeira
│   │   ├── services/api.js     # Axios + interceptor
│   │   ├── App.jsx             # SPA (login + admin + auditoria)
│   │   └── App.css             # Glassmorphism
│   ├── package.json
│   └── vite.config.js
│
├── docs/                       # 📸 Screenshots e vídeos
│   ├── banner.png
│   ├── demo.gif
│   ├── login.png
│   ├── painel-admin.png
│   └── auditoria.png
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## ⚙️ Como Executar Localmente

### Pré-requisitos

| Ferramenta | Versão |
|---|---|
| ☕ Java | 21+ |
| 📦 Maven | 3.9+ (ou use `./mvnw`) |
| 🟢 Node.js | 20+ |
| 📦 npm / pnpm | 10+ |
| 🗄️ PostgreSQL | 15+ |

### 1️⃣ Backend (Spring Boot)

```bash
cd backend

# Crie o banco
psql -U postgres -c "CREATE DATABASE bingo_db;"

# Configure as credenciais em src/main/resources/application.properties
# OU use variáveis de ambiente:
export DB_URL=jdbc:postgresql://localhost:5432/bingo_db
export DB_USER=postgres
export DB_PASS=sua_senha
export JWT_SECRET=chave-super-secreta-min-256-bits

# Rode
./mvnw spring-boot:run
```

✅ API em **http://localhost:8080**

### 2️⃣ Frontend (React + Vite)

```bash
cd frontend

npm install

# Ajuste a URL da API em src/services/api.js se necessário
# (padrão: http://localhost:8080)

npm run dev
```

✅ Painel em **http://localhost:5173**

### 🔑 Credenciais padrão (dev)

> Crie um usuário operador no banco ou use o `data.sql` com:
>
> - Usuário: `admin@paroquia.com`
> - Senha: `admin123`

---

## 🔌 Endpoints da API

### 🌐 Públicos

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/public/login` | Autenticar e receber JWT |
| `GET` | `/public/cartela/{id}` | Dados completos da cartela + histórico (AuditoriaDTO) |

### 🔒 Protegidos (requer `Authorization: Bearer <token>`)

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/bingo/cartelas` | Cadastrar cartela |
| `POST` | `/api/bingo/sortear/{premio}/{numero}` | Registrar pedra cantada |
| `GET` | `/api/bingo/ranking/{premio}` | Radar de aproximação |
| `GET` | `/api/bingo/sorteados/{premio}` | Lista de pedras já cantadas |
| `GET` | `/api/bingo/vencedores/{premio}` | Ganhadores do prêmio |

> `{premio}` aceita: `TV` · `MOTO` · `CARRO`

### Exemplo — Auditoria pública

```json
GET /public/cartela/42

{
  "cartela": {
    "id": 42,
    "nomeDono": "Maria Silva",
    "numeros": [5, 12, 23, 34, 45, 56, 67, 78, 89, 90],
    "bateuTv": false,
    "bateuMoto": false,
    "bateuCarro": false
  },
  "sequenciaSorteioTv": [5, 12, 23, 45, 67],
  "acertosTv": [5, 12, 23, 45, 67],
  "sequenciaSorteioMoto": [],
  "acertosMoto": [],
  "sequenciaSorteioCarro": [],
  "acertosCarro": []
}
```

---

## 📸 Screenshots

<div align="center">

### 🔐 Tela de Login
<img src="./docs/login.png" alt="Login com imagem da padroeira" width="80%" />

### 🎤 Painel do Operador — Sorteio + Radar
<img src="./docs/painel-admin.png" alt="Painel do operador com radar de aproximação" width="100%" />

### 🔎 Auditoria Pública — Cartela do participante
<img src="./docs/auditoria.png" alt="Tela pública de auditoria" width="80%" />

</div>

> 💡 Para adicionar prints reais: tire screenshot, salve em `docs/`, e substitua os caminhos acima.

---

## 🛡️ Segurança

| Camada | Implementação |
|---|---|
| **Senhas** | BCrypt via `PasswordEncoder` |
| **Autenticação** | JWT stateless (sem sessão) |
| **Autorização** | `SecurityFilterChain` com matchers por rota |
| **CORS** | `CorsConfigurationSource` explícito por origem |
| **Tratamento 401** | Interceptor Axios faz logout automático |
| **Secrets** | Nunca comitadas — use variáveis de ambiente |
| **SQL Injection** | Protegido pelo JPA/Hibernate |

**⚠️ Antes de deploy em produção:**

- [ ] Rotacione o `JWT_SECRET`
- [ ] Configure HTTPS
- [ ] Restrinja origens no CORS
- [ ] Ative rate limiting no login

---

## 🗺️ Roadmap

- [x] Autenticação JWT
- [x] Radar em tempo real
- [x] Área pública de auditoria
- [x] Sequência pública de sorteio
- [ ] **WebSocket** para atualização sem *polling*
- [ ] **Painel de múltiplas rodadas** simultâneas
- [ ] **QR Code** por cartela para acesso rápido
- [ ] **Exportação** de relatório em PDF
- [ ] **PWA** com modo offline
- [ ] **Testes E2E** com Playwright

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! 🎉

```bash
# 1. Faça fork
# 2. Crie sua branch
git checkout -b feature/minha-feature

# 3. Commit seguindo Conventional Commits
git commit -m "feat: adiciona exportação PDF"

# 4. Push
git push origin feature/minha-feature

# 5. Abra um Pull Request
```

**Padrões:**

- Commits: [Conventional Commits](https://www.conventionalcommits.org/pt-br/)
- Estilo: ESLint + Prettier (frontend) · Checkstyle (backend)
- Cobertura mínima de testes: 70%

---

## 📄 Licença

Distribuído sob a **Licença MIT**. Veja [`LICENSE`](./LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

<div align="center">

**Otaviano Cruz**

*Desenvolvedor Full-Stack · Entusiasta de boas UX e código limpo*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/SEU_USUARIO/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SEU_USUARIO/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:seu@email.com)

</div>

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela!**

Feito com 💙 e ☕ para a Paróquia Nossa Senhora da Conceição

</div>