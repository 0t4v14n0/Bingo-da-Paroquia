import { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

import padroeiraImg from './assets/pnsc.jpg';

function App() {
  // --- MÁQUINA DE ESTADOS DE TELA ---
  // 'login' (Inicial), 'admin' (Painel Bingo), 'auditoria' (Tela Pública)
  const [telaAtual, setTelaAtual] = useState(
    localStorage.getItem('bingo_token') ? 'admin' : 'login'
  );

  // --- Estados do Admin ---
  const [token, setToken] = useState(localStorage.getItem('bingo_token') || '');
  const [loginForm, setLoginForm] = useState({ identificador: '', senha: '' });
  const [nomeDono, setNomeDono] = useState('');
  const [telefone, setTelefone] = useState('');
  const [numerosInput, setNumerosInput] = useState('');
  const [premioSelecionado, setPremioSelecionado] = useState('TV');
  const [numeroSorteado, setNumeroSorteado] = useState('');
  const [loading, setLoading] = useState(false);
  const [ranking, setRanking] = useState([]);
  const [numerosSorteados, setNumerosSorteados] = useState([]);
  const [vencedores, setVencedores] = useState([]);

  // --- Estados da Tela Pública (Auditoria) ---
  const [buscaId, setBuscaId] = useState('');
  const [dadosAuditoria, setDadosAuditoria] = useState(null);
  const [erroAuditoria, setErroAuditoria] = useState('');
  const [abaAuditoria, setAbaAuditoria] = useState('TV');

  // ==========================================
  // FUNÇÕES DO ADMIN
  // ==========================================
  const carregarRanking = async (premio) => {
    try {
      const res = await api.get(`/api/bingo/ranking/${premio}`);
      setRanking(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const carregarSorteados = async (premio) => {
    try {
      const res = await api.get(`/api/bingo/sorteados/${premio}`);
      setNumerosSorteados(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const carregarVencedores = async (premio) => {
    try {
      const res = await api.get(`/api/bingo/vencedores/${premio}`);
      setVencedores(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (telaAtual === 'admin' && token) {
      carregarRanking(premioSelecionado);
      carregarSorteados(premioSelecionado);
      carregarVencedores(premioSelecionado);
    }
  }, [premioSelecionado, token, telaAtual]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/public/login', {
        identificador: loginForm.identificador,
        senha: loginForm.senha,
      });
      const tokenRecebido = response.data.Token;
      if (tokenRecebido) {
        localStorage.setItem('bingo_token', tokenRecebido);
        setToken(tokenRecebido);
        setTelaAtual('admin');
      }
    } catch (error) {
      alert('Acesso negado! Verifique usuário/senha.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bingo_token');
    setToken('');
    setTelaAtual('login');
  };

  const handleCadastrar = async (e) => {
    e.preventDefault();
    const arrayNumeros = numerosInput.split(',').map((n) => parseInt(n.trim(), 10));
    try {
      const response = await api.post('/api/bingo/cartelas', {
        nomeDono,
        telefone,
        numeros: arrayNumeros,
      });
      alert(`Cartela de ${response.data.nomeDono} cadastrada! ID: ${response.data.id}`);
      setNomeDono('');
      setTelefone('');
      setNumerosInput('');
    } catch (error) {
      if (error.response?.status === 401) handleLogout();
      alert('Erro ao cadastrar cartela.');
    }
  };

  const handleSortear = async (e) => {
    e.preventDefault();
    if (!numeroSorteado) return;
    try {
      const response = await api.post(
        `/api/bingo/sortear/${premioSelecionado}/${numeroSorteado}`
      );
      const ganhadores = response.data;
      if (ganhadores.length > 0) {
        alert(
          `🎉 BINGO!!! 🎉\nGanhador(es) na ${premioSelecionado}: ${ganhadores
            .map((g) => g.nomeDono)
            .join(', ')}`
        );
      }
      setNumeroSorteado('');
      carregarRanking(premioSelecionado);
      carregarSorteados(premioSelecionado);
      carregarVencedores(premioSelecionado);
    } catch (error) {
      if (error.response?.status === 401) handleLogout();
      alert('Erro ao registrar pedra.');
    }
  };

  // ==========================================
  // FUNÇÕES DA TELA PÚBLICA
  // ==========================================
  const handleAuditoria = async (e) => {
    e.preventDefault();
    setErroAuditoria('');
    setDadosAuditoria(null);
    setLoading(true);
    try {
      const response = await api.get(`/public/cartela/${buscaId}`);
      setDadosAuditoria(response.data);
    } catch (error) {
      setErroAuditoria('Cartela não encontrada. Verifique o número digitado.');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RENDERIZAÇÃO: TELA PÚBLICA (AUDITORIA)
  // ==========================================
  if (telaAtual === 'auditoria') {
    // Sequência de sorteio da aba atual
    let sequenciaAtual = [];
    if (dadosAuditoria) {
      if (abaAuditoria === 'TV') sequenciaAtual = dadosAuditoria.sequenciaSorteioTv || [];
      if (abaAuditoria === 'MOTO') sequenciaAtual = dadosAuditoria.sequenciaSorteioMoto || [];
      if (abaAuditoria === 'CARRO') sequenciaAtual = dadosAuditoria.sequenciaSorteioCarro || [];
    }

    return (
      <div className="app-container">
        <header className="main-header header-auditoria">
          <button onClick={() => setTelaAtual('login')} className="btn-voltar">
            ← Voltar
          </button>
          <div className="header-brand header-brand-auditoria">
            <img src={padroeiraImg} alt="Padroeira" className="header-logo" />
            <h1>Acompanhe sua Cartela</h1>
            <p>🔎 Auditoria Pública — Bingo da Paróquia</p>
          </div>
        </header>

        <main className="dashboard-card card-auditoria">
          <form onSubmit={handleAuditoria} className="form-auditoria">
            <input
              type="number"
              placeholder="Digite o número (ID) da sua cartela"
              required
              value={buscaId}
              onChange={(e) => setBuscaId(e.target.value)}
              className="input-busca"
            />
            <button type="submit" className="btn-entrar" disabled={loading}>
              {loading ? 'Buscando...' : '🔍 Buscar Cartela'}
            </button>
          </form>

          {erroAuditoria && <p className="erro-msg">{erroAuditoria}</p>}

          {dadosAuditoria && (
            <div className="auditoria-resultado">
              <div className="cartela-info">
                <h2>Cartela Nº {dadosAuditoria.cartela.id}</h2>
                <p>
                  👤 Dono: <strong>{dadosAuditoria.cartela.nomeDono}</strong>
                </p>
              </div>

              <div className="abas-auditoria">
                <button
                  className={abaAuditoria === 'TV' ? 'aba-ativa' : ''}
                  onClick={() => setAbaAuditoria('TV')}
                >
                  📺 TV
                </button>
                <button
                  className={abaAuditoria === 'MOTO' ? 'aba-ativa' : ''}
                  onClick={() => setAbaAuditoria('MOTO')}
                >
                  🏍️ Moto
                </button>
                <button
                  className={abaAuditoria === 'CARRO' ? 'aba-ativa' : ''}
                  onClick={() => setAbaAuditoria('CARRO')}
                >
                  🚗 Carro
                </button>
              </div>

              {/* SEQUÊNCIA PÚBLICA DE SORTEIO */}
              <div className="sequencia-container">
                <h3 className="sequencia-title">
                  🎲 Sequência de Sorteio — {abaAuditoria}
                </h3>
                {sequenciaAtual.length === 0 ? (
                  <p className="sequencia-vazia">Nenhuma pedra sorteada ainda.</p>
                ) : (
                  <div className="sequencia-grid">
                    {sequenciaAtual.map((num, idx) => {
                      const naCartela =
                        Array.isArray(dadosAuditoria.cartela.numeros)
                          ? dadosAuditoria.cartela.numeros.includes(num)
                          : false;
                      return (
                        <div
                          key={idx}
                          className={`sequencia-item ${naCartela ? 'na-cartela' : ''}`}
                          title={naCartela ? 'Você tem este número!' : 'Não está na sua cartela'}
                        >
                          <span className="sequencia-ordem">{idx + 1}º</span>
                          <span className="sequencia-bola">{num}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* CARTELA DO USUÁRIO */}
              <div className="grid-cartela">
                {[...dadosAuditoria.cartela.numeros]
                  .sort((a, b) => a - b)
                  .map((num) => {
                    let acertou = false;
                    if (abaAuditoria === 'TV')
                      acertou = dadosAuditoria.acertosTv.includes(num);
                    if (abaAuditoria === 'MOTO')
                      acertou = dadosAuditoria.acertosMoto.includes(num);
                    if (abaAuditoria === 'CARRO')
                      acertou = dadosAuditoria.acertosCarro.includes(num);

                    return (
                      <div
                        key={num}
                        className={`bola-cartela ${acertou ? 'acertou' : ''}`}
                      >
                        {num}
                      </div>
                    );
                  })}
              </div>

              {((abaAuditoria === 'TV' && dadosAuditoria.cartela.bateuTv) ||
                (abaAuditoria === 'MOTO' && dadosAuditoria.cartela.bateuMoto) ||
                (abaAuditoria === 'CARRO' &&
                  dadosAuditoria.cartela.bateuCarro)) && (
                <div className="vencedor-banner vencedor-banner-auditoria">
                  <h3>🏆 BINGO! VOCÊ GANHOU ESTE PRÊMIO! 🏆</h3>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    );
  }

  // ==========================================
  // RENDERIZAÇÃO: LOGIN INICIAL
  // ==========================================
  if (telaAtual === 'login') {
    return (
      <div className="login-bg">
        <div className="login-card">
          <div className="padroeira-header">
            <img
              src={padroeiraImg}
              alt="Nossa Senhora da Conceição"
              className="logo-padroeira"
            />
            <h2>Bingo da Paróquia</h2>
            <h3>Nossa Senhora da Conceição</h3>
          </div>

          <form onSubmit={handleLogin} className="login-form login-form-mb">
            <div className="input-group">
              <input
                type="text"
                placeholder="Usuário (Admin)"
                required
                value={loginForm.identificador}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, identificador: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Senha"
                required
                value={loginForm.senha}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, senha: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn-entrar" disabled={loading}>
              Acessar Painel 🔒
            </button>
          </form>

          <hr className="divisor-login" />
          <button onClick={() => setTelaAtual('auditoria')} className="btn-publico">
            🔎 Acompanhar Minha Cartela
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDERIZAÇÃO: PAINEL ADMIN
  // ==========================================
  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-brand">
          <img src={padroeiraImg} alt="Padroeira" className="header-logo" />
          <div>
            <h1>Grande Bingo de Nossa Senhora da Conceição</h1>
            <p>⛪ Paróquia Nossa Senhora da Conceição — Painel do Operador</p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-sair">
          Sair do Sistema ↩
        </button>
      </header>

      <main className="grid-container">
        {/* LADO ESQUERDO: SORTEIO */}
        <section className="dashboard-card card-sorteio">
          <div className="card-header">
            <h2>🎤 Rodada de Sorteio</h2>
            <span className="badge">Ao Vivo</span>
          </div>

          {vencedores.length > 0 && (
            <div className="vencedor-banner">
              <h3>🏆 TEMOS UM VENCEDOR PARA A {premioSelecionado}! 🏆</h3>
              <p>
                Parabéns:{' '}
                <strong>{vencedores.map((v) => v.nomeDono).join(' & ')}</strong>
              </p>
              <small>O sorteio deste prêmio foi encerrado.</small>
            </div>
          )}

          <form onSubmit={handleSortear} className="form-sorteio">
            <div className="premio-selector">
              <label>Escolha o Prêmio Atual:</label>
              <div className="radio-group">
                <label
                  className={`radio-label ${
                    premioSelecionado === 'TV' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    value="TV"
                    checked={premioSelecionado === 'TV'}
                    onChange={(e) => setPremioSelecionado(e.target.value)}
                  />
                  <span>📺 TV 50"</span>
                </label>
                <label
                  className={`radio-label ${
                    premioSelecionado === 'MOTO' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    value="MOTO"
                    checked={premioSelecionado === 'MOTO'}
                    onChange={(e) => setPremioSelecionado(e.target.value)}
                  />
                  <span>🏍️ MOTO TMOV</span>
                </label>
                <label
                  className={`radio-label ${
                    premioSelecionado === 'CARRO' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    value="CARRO"
                    checked={premioSelecionado === 'CARRO'}
                    onChange={(e) => setPremioSelecionado(e.target.value)}
                  />
                  <span>🚗 GOL 1.6</span>
                </label>
              </div>
            </div>

            <div className="sorteio-action">
              <div className="numero-grande-box">
                <label>Anotar Pedra Sorteada</label>
                <input
                  type="number"
                  value={numeroSorteado}
                  onChange={(e) => setNumeroSorteado(e.target.value)}
                  placeholder="00"
                  className="input-sorteio"
                  min="1"
                  max="99"
                  disabled={vencedores.length > 0}
                />
              </div>
              <button
                type="submit"
                className="btn-sortear"
                disabled={vencedores.length > 0}
              >
                Confirmar Pedra Cantada 🔔
              </button>
            </div>
          </form>

          <div className="sorteados-container">
            <h3 className="ranking-title">
              Bolas Cantadas ({numerosSorteados.length})
            </h3>
            <div className="sorteados-grid">
              {numerosSorteados.length === 0 ? (
                <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>
                  Nenhuma pedra sorteada ainda.
                </p>
              ) : (
                numerosSorteados.map((num, idx) => (
                  <span key={idx} className="bola-sorteada">
                    {num}
                  </span>
                ))
              )}
            </div>
          </div>

          {ranking.length > 0 && (
            <div className="ranking-container">
              <h3 className="ranking-title">🔥 Radar do Bingo (Mais Próximos)</h3>
              {ranking.map((r, index) => (
                <div key={index} className="ranking-item">
                  <div className="ranking-info">
                    <span className="ranking-nome">{r.nomeDono}</span>
                    <span className="ranking-falta">Faltam {r.faltam}</span>
                  </div>
                  <div className="progress-bg">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${r.porcentagem}%`,
                        backgroundColor: r.faltam === 1 ? '#ef4444' : '#22c55e',
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* LADO DIREITO: CADASTRO */}
        <section className="dashboard-card card-cadastro">
          <div className="card-header">
            <h2>📝 Cadastrar Cartelas</h2>
            <span className="badge-count">Novo Amigo</span>
          </div>
          <form onSubmit={handleCadastrar} className="form-cadastro">
            <div className="input-group-cad">
              <label>Nome do Dono</label>
              <input
                type="text"
                placeholder="Nome Completo do Comprador"
                required
                value={nomeDono}
                onChange={(e) => setNomeDono(e.target.value)}
              />
            </div>
            <div className="input-group-cad">
              <label>WhatsApp</label>
              <input
                type="text"
                placeholder="Ex: (81) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div className="input-group-cad">
              <label>Números da Cartela (separados por vírgula)</label>
              <textarea
                placeholder="Ex: 5, 12, 23, 34, 45, 56, 67, 78, 89, 90"
                required
                rows="3"
                value={numerosInput}
                onChange={(e) => setNumerosInput(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-salvar">
              Salvar Cartela no Banco ✔
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;