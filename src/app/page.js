"use client"; 
import { useState, useEffect } from "react";

export default function Home() {
  const [bancoProdutos, setBancoProdutos] = useState([]);
  
  const [build, setBuild] = useState({
    'cpu': null, 'cooler': null, 'placa-mae': null, 'ram': null, 
    'gpu': null, 'armazenamento': null, 'gabinete': null, 'fonte': null
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [categoriaAtual, setCategoriaAtual] = useState(null);
  const [linkPcPronto, setLinkPcPronto] = useState("");

  const categorias = [
    { id: 'cpu', nome: 'Processador (CPU)' },
    { id: 'cooler', nome: 'Cooler' },
    { id: 'placa-mae', nome: 'Placa-mãe' },
    { id: 'ram', nome: 'Memória RAM' },
    { id: 'gpu', nome: 'Placa de Vídeo' },
    { id: 'armazenamento', nome: 'Armazenamento' },
    { id: 'gabinete', nome: 'Gabinete' },
    { id: 'fonte', nome: 'Fonte' }
  ];

  useEffect(() => {
    fetch('/produtos.json')
      .then(res => res.json())
      .then(dados => setBancoProdutos(dados))
      .catch(err => console.error("Erro ao carregar produtos:", err));
  }, []);

  const abrirModal = (catId) => {
    setCategoriaAtual(catId);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCategoriaAtual(null);
  };

  const selecionarPeca = (peca, catId) => {
    setBuild(prev => ({ ...prev, [catId]: { ...peca, qtd: 1 } }));
    setLinkPcPronto(""); 
    fecharModal();
  };

  const removerPeca = (catId) => {
    setBuild(prev => ({ ...prev, [catId]: null }));
    setLinkPcPronto("");
  };

  const limparTudo = () => {
    setBuild({ 'cpu': null, 'cooler': null, 'placa-mae': null, 'ram': null, 'gpu': null, 'armazenamento': null, 'gabinete': null, 'fonte': null });
    setLinkPcPronto("");
  };

  const selecionarPecaDireta = (idStr, catId, bancoAtual) => {
    let p = bancoAtual.find(x => x.id === idStr);
    return p ? { ...p, qtd: 1 } : null;
  };

  const carregarSetupPronto = (tipo) => {
    let novoBuild = { ...build };
    
    if (tipo === 1) { 
      novoBuild['cpu'] = selecionarPecaDireta('c15', 'cpu', bancoProdutos);
      novoBuild['cooler'] = selecionarPecaDireta('cl1', 'cooler', bancoProdutos);
      novoBuild['placa-mae'] = selecionarPecaDireta('m_amd2', 'placa-mae', bancoProdutos);
      novoBuild['ram'] = selecionarPecaDireta('r5', 'ram', bancoProdutos);
      novoBuild['armazenamento'] = selecionarPecaDireta('a8', 'armazenamento', bancoProdutos);
      novoBuild['gabinete'] = selecionarPecaDireta('gb_a1', 'gabinete', bancoProdutos);
      novoBuild['fonte'] = selecionarPecaDireta('f3', 'fonte', bancoProdutos);
      novoBuild['gpu'] = null;
      setLinkPcPronto("https://s.shopee.com.br/gMPVeJjGb");
    } else if (tipo === 2) { 
      novoBuild['cpu'] = selecionarPecaDireta('c4', 'cpu', bancoProdutos);
      novoBuild['cooler'] = selecionarPecaDireta('cl1', 'cooler', bancoProdutos);
      novoBuild['placa-mae'] = selecionarPecaDireta('m_intel1', 'placa-mae', bancoProdutos);
      novoBuild['ram'] = selecionarPecaDireta('r6', 'ram', bancoProdutos);
      novoBuild['gpu'] = selecionarPecaDireta('g11', 'gpu', bancoProdutos);
      novoBuild['armazenamento'] = selecionarPecaDireta('a8', 'armazenamento', bancoProdutos);
      novoBuild['gabinete'] = selecionarPecaDireta('gb_m1', 'gabinete', bancoProdutos);
      novoBuild['fonte'] = selecionarPecaDireta('f3', 'fonte', bancoProdutos);
      setLinkPcPronto("https://s.shopee.com.br/1qYMtfWxKF");
    } else if (tipo === 3) { 
      novoBuild['cpu'] = selecionarPecaDireta('c19', 'cpu', bancoProdutos);
      novoBuild['cooler'] = selecionarPecaDireta('cl8', 'cooler', bancoProdutos);
      novoBuild['placa-mae'] = selecionarPecaDireta('m_amd3', 'placa-mae', bancoProdutos);
      novoBuild['ram'] = selecionarPecaDireta('r8', 'ram', bancoProdutos);
      novoBuild['gpu'] = selecionarPecaDireta('g23', 'gpu', bancoProdutos);
      novoBuild['armazenamento'] = selecionarPecaDireta('a1', 'armazenamento', bancoProdutos);
      novoBuild['gabinete'] = selecionarPecaDireta('gb_m3', 'gabinete', bancoProdutos);
      novoBuild['fonte'] = selecionarPecaDireta('f5', 'fonte', bancoProdutos);
      setLinkPcPronto("https://s.shopee.com.br/5AoortdqCm");
    }

    setBuild(novoBuild);
  };

  const compartilharWhatsApp = () => {
    let qtdPecas = Object.values(build).filter(p => p !== null).length;
    if (qtdPecas === 0) return alert("Adicione pelo menos uma peça antes de compartilhar!");

    let texto = "🚀 *Olha o PC que montei no HardwareMatch Pro!*\n\n";
    categorias.forEach(cat => {
        let item = build[cat.id];
        if (item) {
            texto += `✅ *${cat.nome}:* ${item.nome} - R$ ${(item.preco).toFixed(2)}\n`;
            let linkAcesso = (item.link && item.link !== 'https://shope.ee/SEU_LINK_AQUI') 
                             ? item.link 
                             : `https://shopee.com.br/search?keyword=${encodeURIComponent(item.nome)}`;
            texto += `🛒 Compre aqui: ${linkAcesso}\n\n`;
        }
    });
    texto += `💰 *Valor Total: R$ ${precoTotal.toFixed(2)}*\n\nQuer montar o seu PC sem gargalo? Acesse o HardwareMatch Pro!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`, '_blank');
  };

  let precoTotal = 0;
  let consumoTotal = 50; 
  let cpuPoder = 0, gpuPoder = 0, igpuPoder = 0;
  let temVideoDedicado = false;
  let qtdPecas = 0;

  Object.values(build).forEach(peca => {
    if (peca) {
      precoTotal += peca.preco;
      if (peca.consumo) consumoTotal += peca.consumo;
      if (peca.categoria === 'cpu') {
          cpuPoder = peca.poder_cpu || 0;
          igpuPoder = peca.poder_igpu || 0;
      }
      if (peca.categoria === 'gpu') {
          gpuPoder = peca.poder_gpu || 0;
          temVideoDedicado = true;
      }
      qtdPecas++;
    }
  });

  let gargaloPercentual = 0;
  let penalidadeFps = 1; 
  let textoGargalo = "Adicione CPU e GPU para analisar.";
  let corBarra = "#334155"; 
  let usandoGraficoIntegrado = false;

  if (!temVideoDedicado && igpuPoder > 0) {
      gpuPoder = igpuPoder;
      usandoGraficoIntegrado = true;
  }

  if (cpuPoder > 0 && gpuPoder > 0) {
      if (usandoGraficoIntegrado) {
          gargaloPercentual = 0;
          textoGargalo = `🎮 Rodando com Vídeo Integrado (APU). O desempenho em jogos será básico.`;
          corBarra = "#3b82f6"; 
          penalidadeFps = 0.8; 
      } else if (gpuPoder > cpuPoder * 1.6) {
          let diff = (gpuPoder - (cpuPoder * 1.6)) / gpuPoder;
          gargaloPercentual = Math.min(Math.round(diff * 100), 95); 
          textoGargalo = `Gargalo de CPU! A sua Placa de Vídeo está sendo limitada pelo processador.`;
          corBarra = "#ef4444"; 
          penalidadeFps = 1 - (gargaloPercentual / 100); 
      } else if (cpuPoder > gpuPoder * 2.0) {
          let diff = (cpuPoder - (gpuPoder * 2.0)) / cpuPoder;
          gargaloPercentual = Math.min(Math.round(diff * 100), 80);
          textoGargalo = `Gargalo de GPU! Seu Processador é forte demais para ela.`;
          corBarra = "#f59e0b"; 
          penalidadeFps = 1 - (gargaloPercentual / 150); 
      } else {
          gargaloPercentual = 2;
          textoGargalo = `Sistema Equilibrado! Extraindo 100% das peças.`;
          corBarra = "#4ade80"; 
      }
  } else if (cpuPoder > 0 && !temVideoDedicado && igpuPoder === 0) {
      textoGargalo = `⚠️ ATENÇÃO: O Processador escolhido NÃO tem vídeo! Adicione uma Placa de Vídeo.`;
      corBarra = "#ef4444";
      gargaloPercentual = 100;
  }

  let fpsJogos = [];
  if (cpuPoder > 0 && gpuPoder > 0) {
      const forcaSistema = (gpuPoder * 0.7) + (cpuPoder * 0.3);
      const jogosBase = [
          { nome: 'CS2', multi: 4.5, icone: '🔫' },
          { nome: 'Valorant', multi: 5.0, icone: '🎯' },
          { nome: 'LoL', multi: 6.0, icone: '⚔️' },
          { nome: 'Fortnite', multi: 3.2, icone: '🪂' },
          { nome: 'GTA V', multi: 2.8, icone: '🚗' },
          { nome: 'Warzone', multi: 1.8, icone: '🪖' },
          { nome: 'RDR 2', multi: 1.1, icone: '🐎' },
          { nome: 'Cyberpunk', multi: 0.9, icone: '🤖' }
      ];
      fpsJogos = jogosBase.map(j => {
          let est = Math.floor(forcaSistema * j.multi * penalidadeFps);
          return { ...j, fps: est > 500 ? "500+" : est };
      });
  }

  let avisoFonte = false;
  if (build.fonte && build.fonte.potencia < consumoTotal * 1.2) avisoFonte = true;

  const produtosComLinkReal = bancoProdutos.filter(p => p.link && p.link !== 'https://shope.ee/SEU_LINK_AQUI' && p.link.trim() !== '');
  const produtosFiltrados = bancoProdutos.filter(p => p.categoria === categoriaAtual);

  return (
    <>
      <div className="bg-grid"></div>

      <header>
        <h1>🖥️ Hardware<span>Match</span> Pro</h1>
        <p>Montagem Automática e Validação de Compatibilidade em Tempo Real</p>
      </header>

      <main className="container">
        
        <div className="layout-duplo">
          <section className="secao-principal">
            
            <div className="pcs-prontos" style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
              <button onClick={() => carregarSetupPronto(1)} style={{ flex: 1, padding: '10px', background: '#334155', border: '1px solid #4ade80', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🥉 Baratinho</button>
              <button onClick={() => carregarSetupPronto(2)} style={{ flex: 1, padding: '10px', background: '#334155', border: '1px solid #3b82f6', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🥈 Custo-Benefício</button>
              <button onClick={() => carregarSetupPronto(3)} style={{ flex: 1, padding: '10px', background: '#334155', border: '1px solid #f59e0b', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🥇 PC da NASA</button>
              <button onClick={limparTudo} style={{ padding: '10px', background: '#ef4444', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🗑️ Limpar</button>
            </div>

            <div className="lista-montagem">
              <div className="header-tabela">
                <span>Imagem</span>
                <span>Componente Selecionado</span>
                <span>Consumo</span>
                <span>Preço (R$)</span>
              </div>
              <div id="lista-categorias">
                
                {categorias.map(cat => {
                  const item = build[cat.id]; 
                  return (
                    <div key={cat.id} className="linha-peca">
                      <div className="col-img">
                        {item && item.imagem 
                          ? <img src={item.imagem} alt={item.nome} className="img-peca" /> 
                          : <div className="img-placeholder"></div>}
                      </div>
                      <div className="col-selecao">
                        <small style={{ color: 'var(--text-muted)', display:'block', marginBottom: '5px', textAlign: 'left' }}>{cat.nome}</small>
                        {item ? (
                          <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
                            <button className="btn-trocar" onClick={() => abrirModal(cat.id)}>
                              {item.nome} {item.poder_igpu > 0 && <span style={{fontSize:'0.7rem', background:'#3b82f6', color:'white', padding:'2px 5px', borderRadius:'4px', marginLeft:'5px'}}>APU</span>}
                            </button>
                            <button className="btn-remover" onClick={() => removerPeca(cat.id)}>🗑️</button>
                          </div>
                        ) : (
                          <button className="btn-add" onClick={() => abrirModal(cat.id)}>+ Escolher Peça</button>
                        )}
                      </div>
                      <div className="col-watts">
                        {item ? (item.consumo > 0 ? item.consumo + ' W' : '--') : '--'}
                      </div>
                      <div className="col-preco">
                        {item ? 'R$ ' + item.preco.toFixed(2) : '--'}
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            {produtosComLinkReal.length > 0 && (
              <div className="banner-ofertas" style={{ background: 'var(--card-bg)', border: '1px solid #ee4d2d', borderRadius: '6px', padding: '5px 0' }}>
                <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#ee4d2d', marginBottom: '5px', fontSize: '0.8rem' }}>🔥 OFERTAS EXCLUSIVAS 🔥</div>
                <div className="marquee-container">
                    <div className="marquee-conteudo">
                        {produtosComLinkReal.sort(() => 0.5 - Math.random()).slice(0, 15).map((p, i) => (
                          <a key={i} href={p.link} target="_blank" className="card-oferta-mini" rel="noreferrer">
                              <img src={p.imagem} alt={p.nome} />
                              <div className="info-oferta">
                                  <span className="nome-oferta">{p.nome}</span>
                                  <span className="preco-oferta">R$ {p.preco.toFixed(2)}</span>
                              </div>
                          </a>
                        ))}
                        {produtosComLinkReal.sort(() => 0.5 - Math.random()).slice(0, 15).map((p, i) => (
                          <a key={`dup-${i}`} href={p.link} target="_blank" className="card-oferta-mini" rel="noreferrer">
                              <img src={p.imagem} alt={p.nome} />
                              <div className="info-oferta">
                                  <span className="nome-oferta">{p.nome}</span>
                                  <span className="preco-oferta">R$ {p.preco.toFixed(2)}</span>
                              </div>
                          </a>
                        ))}
                    </div>
                </div>
              </div>
            )}

          </section>

          <aside className="painel-resultados">
            
            <div className="card-resultado">
              <h3>💰 Resumo do Sistema</h3>
              <div className="resumo-grid">
                <div className="resumo-item">
                  <small>Total Estimado</small>
                  <h2 className="texto-verde">R$ {precoTotal.toFixed(2)}</h2>
                </div>
                <div className="resumo-item">
                  <small>Consumo Base</small>
                  <h2>{consumoTotal} W</h2>
                </div>
              </div>
              <button onClick={compartilharWhatsApp} style={{ width: '100%', marginTop: '15px', padding: '12px', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                📲 Compartilhar Setup no WhatsApp
              </button>
              
              {linkPcPronto && (
                <a href={linkPcPronto} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', marginTop: '10px', padding: '12px', background: '#8b5cf6', color: 'white', textAlign: 'center', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', border: '1px solid #7c3aed' }}>
                    📦 Comprar Este PC Já Montado!
                </a>
              )}
            </div>

            <div className="card-resultado">
              <h3>⚖️ Análise de Gargalo</h3>
              <p className="texto-muted" style={{ marginBottom: '10px' }}>{textoGargalo}</p>
              <div className="barra-bg">
                <div className="barra-fill" style={{ width: `${gargaloPercentual}%`, backgroundColor: corBarra }}></div>
              </div>
              <p style={{ textAlign: 'right', marginTop: '5px', fontWeight: 'bold', fontSize: '1.2rem', color: corBarra }}>{gargaloPercentual}%</p>
            </div>

            <div className="card-resultado" style={{ borderColor: avisoFonte ? '#ef4444' : (qtdPecas > 0 ? '#4ade80' : 'var(--border)') }}>
              <h3>⚠️ Status de Montagem</h3>
              {avisoFonte ? (
                <p>🔥 <strong>PERIGO:</strong> Sua Fonte não aguenta o sistema! Recomendado: {Math.ceil(consumoTotal * 1.2)}W.</p>
              ) : qtdPecas > 0 ? (
                <p>✅ <strong>Perfeito:</strong> Peças compatíveis.</p>
              ) : (
                <p>Selecione as peças para iniciar a validação.</p>
              )}
            </div>

            <div className="card-resultado">
              <h3>🎮 Projeção de FPS (1080p Alto)</h3>
              <div className="fps-grid" id="container-fps">
                  {fpsJogos.length === 0 ? (
                      <p className="aviso-vazio">Adicione CPU com Vídeo Integrado ou Placa Dedicada para simular.</p>
                  ) : (
                      fpsJogos.map((jogo, i) => (
                          <div key={i} className="fps-item">
                              <span>{jogo.icone} {jogo.nome}</span>
                              <strong className={jogo.fps < 60 && jogo.fps !== "500+" ? 'texto-vermelho' : 'texto-verde'}>{jogo.fps} FPS</strong>
                          </div>
                      ))
                  )}
              </div>
            </div>

          </aside>
        </div>

      </main>

      <footer style={{ textAlign: 'center', padding: '50px 20px', marginTop: '40px', color: 'var(--text-muted)' }}>
        <p><strong>HardwareMatch Pro</strong> © 2026</p>
        <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>Desenvolvido por Washington Brum Teixeira para o TCC na E.E.E.M. Protásio Alves</p>
      </footer>

      {modalAberto && (
        <div className="modal">
          <div className="modal-conteudo">
            <div className="modal-header">
              <h2>Escolha a Peça</h2>
              <button onClick={fecharModal}>Fechar [X]</button>
            </div>
            
            <div className="grid-produtos-modal">
              {produtosFiltrados.length === 0 ? (
                <p className="texto-vermelho">Nenhuma peça compatível.</p>
              ) : (
                produtosFiltrados.map(p => (
                  <div key={p.id} className="card-modal">
                    <img src={p.imagem} alt={p.nome} className="img-modal" />
                    <div className="modal-info">
                      <h4>
                        {p.nome} {p.poder_igpu > 0 && <span style={{fontSize:'0.7rem', background:'#3b82f6', color:'white', padding:'2px 5px', borderRadius:'4px', marginLeft:'5px', verticalAlign: 'middle'}}>Vídeo Integrado</span>}
                      </h4>
                      {p.consumo > 0 && <span className="badge-tech" style={{background:'#0f172a'}}>{p.consumo}W</span>}
                    </div>
                    <div className="modal-acao">
                      <p className="texto-verde">R$ {p.preco.toFixed(2)}</p>
                      <button onClick={() => selecionarPeca(p, categoriaAtual)}>Adicionar</button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}