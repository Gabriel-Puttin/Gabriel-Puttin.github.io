// ============================================================
// EFEITO MATRIX (fundo)
// ============================================================
const matrixCanvas = document.getElementById("matrix-bg");
const matrixCtx = matrixCanvas.getContext("2d");

const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MATRIX_FONT_SIZE = 16;

let matrixColumns = 0;
let matrixDrops = [];
let matrixFrameId = null;
let matrixLastTick = 0;
const MATRIX_TICK_MS = 45;

function resizeMatrixCanvas() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  matrixColumns = Math.floor(matrixCanvas.width / MATRIX_FONT_SIZE);
  matrixDrops = new Array(matrixColumns)
    .fill(0)
    .map(() => Math.floor(Math.random() * -50));
}

function drawMatrixFrame(timestamp) {
  matrixFrameId = requestAnimationFrame(drawMatrixFrame);

  if (timestamp - matrixLastTick < MATRIX_TICK_MS) return;
  matrixLastTick = timestamp;

  // rastro: pinta um preto semitransparente por cima do frame anterior
  matrixCtx.fillStyle = "rgba(10, 2, 9, 0.08)";
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  matrixCtx.font = `${MATRIX_FONT_SIZE}px monospace`;

  for (let i = 0; i < matrixDrops.length; i++) {
    const char =
      MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
    const x = i * MATRIX_FONT_SIZE;
    const y = matrixDrops[i] * MATRIX_FONT_SIZE;

    // caractere da frente mais claro, o resto no verde padrão
    matrixCtx.fillStyle = "#c9ffd8";
    if (Math.random() > 0.1) {
      matrixCtx.fillStyle = "#3ddc5b";
    }
    matrixCtx.fillText(char, x, y);

    if (y > matrixCanvas.height && Math.random() > 0.975) {
      matrixDrops[i] = 0;
    }
    matrixDrops[i]++;
  }
}

function startMatrix() {
  resizeMatrixCanvas();
  if (matrixFrameId) cancelAnimationFrame(matrixFrameId);
  matrixFrameId = requestAnimationFrame(drawMatrixFrame);
}

function stopMatrix() {
  if (matrixFrameId) cancelAnimationFrame(matrixFrameId);
  matrixFrameId = null;
  matrixCtx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
}

window.addEventListener("resize", resizeMatrixCanvas);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (!prefersReducedMotion.matches) {
  startMatrix();
}
prefersReducedMotion.addEventListener("change", (e) => {
  if (e.matches) {
    stopMatrix();
  } else {
    startMatrix();
  }
});

// ============================================================
// DADOS DO PORTFÓLIO
// Conteúdo extraído do currículo. Pode ser refinado/expandido
// depois na etapa de modelagem de dados.
// ============================================================
const DATA = {
  nome: "Gabriel Constantino Biancardi Puttin",
  titulo: "Desenvolvedor Full Stack | Go | C# | JavaScript | Python",
  localizacao: "Vila Velha / ES",
  contato: {
    telefone: "(27) 99782-5825",
    email: "gabrielputtin@hotmail.com",
    linkedin: "https://www.linkedin.com/in/gabriel-puttin/",
    github: "https://github.com/Gabriel-Puttin",
  },
  sobre: [
    "Olá! Me chamo Gabriel, sou de Vila Velha/ES e trabalho como Desenvolvedor Full Stack, com foco em back-end. Sou formado em Desenvolvimento Web Full Stack pela Trybe, técnico em Edificações pelo IFES e atualmente curso Sistemas de Informação na UVV.",
    "Na Genesis Tecnologia, trabalhei com Go em sistemas da área hospitalar. Participei da migração de uma API SOAP antiga para REST, desenvolvi workers assíncronos para melhorar o processamento das integrações e otimizei consultas que deixaram a transferência de prontuários 20% mais rápida.",
    "Na Volia Cosméticos, onde continuo prestando serviços, criei do zero o primeiro sistema de controle de estoque da empresa (Node.js, MongoDB e GCP), cuido das landing pages e desenvolvi dashboards em Power BI para a diretoria.",
    "Sou apaixonado por tecnologia e gosto de construir soluções que facilitem a rotina de quem usa o sistema.",
    "",
    "Tecnologias: Go, C#, JavaScript, TypeScript, Python, SQL, Node.js, Express, ASP.NET Core, Entity Framework, Django, Flask, React, Next.js, Redux, Docker, GCP, AWS, GitHub Actions, MongoDB, PostgreSQL, SQLite e Power BI.",
  ],
  skills: {
    "Linguagens": ["Go", "C#", "JavaScript/TypeScript", "Python", "SQL"],
    "Back-End": ["ASP.NET Core", "Entity Framework", "Node.js", "Express.js", "Django", "Flask"],
    "Front-End": ["React.js", "Next.js", "Redux", "Context API"],
    "Cloud, Dados & DevOps": ["Docker", "Docker Compose", "GCP", "AWS", "GitHub Actions", "MongoDB", "PostgreSQL/SQLite", "Power BI", "Pandas"],
  },
  formacao: [
    "Bacharelado em Sistemas de Informação – Universidade Vila Velha (UVV) | Conclusão: Dezembro 2027",
    "Desenvolvimento Web Full Stack – Trybe | Concluído",
    "Técnico em Edificações – Instituto Federal do Espírito Santo | Concluído",
  ],
  idiomas: ["Português — nativo", "Inglês — avançado"],
  experiencias: [
    {
      id: "genesis",
      categoria: "Profissional",
      nome: "Desenvolvedor Back-End — Genesis Tecnologia",
      tecnologias: ["Go", "Arquitetura Hexagonal", "REST", "SOAP", "HIS/PACS", "Workers Assíncronos"],
      bullets: [
        "Arquiteturei a migração completa de uma API SOAP legada para REST utilizando Go e arquitetura hexagonal, reduzindo o acoplamento sistêmico entre plataformas hospitalares críticas (HIS e PACS).",
        "Escalei o processamento de dados do sistema Clinux ao desenvolver um polling de workers assíncronos, mitigando bloqueios de I/O e garantindo 100% de disponibilidade no fluxo de integrações.",
        "Acelerei a transferência de prontuários e dados médicos em 20%, liderando a otimização de rotas e consultas complexas em Go.",
      ],
      stack: "Go, Arquitetura Hexagonal, REST, SOAP, HIS/PACS, Workers Assíncronos",
      imagens: [],
      secoes: [],
    },
    {
      id: "volia",
      categoria: "Profissional",
      nome: "Desenvolvedor Full Stack — Volia Cosméticos",
      tecnologias: ["Node.js", "MongoDB", "GCP", "Power BI", "HTML/CSS"],
      bullets: [
        "Lancei o primeiro sistema de gestão de estoque automatizado da empresa do zero, utilizando Node.js e MongoDB no GCP, alcançando 100% de rastreabilidade em operações antes executadas manualmente.",
        "Liderei a infraestrutura tecnológica como único profissional de TI da operação, otimizando o carregamento e a UX de landing pages corporativas com HTML/CSS.",
        "Estruturei a inteligência de negócios ao construir dashboards em Power BI, centralizando métricas gerenciais da diretoria.",
      ],
      stack: "Node.js, MongoDB, GCP, Power BI, HTML/CSS",
      imagens: [],
      secoes: [],
    },
  ],
};

// ============================================================
// PROJETOS (lista + conteúdo detalhado do modal)
// Cada projeto pode ter "secoes" vazio enquanto o conteúdo
// detalhado não é fornecido — o modal mostra só o resumo.
// ============================================================
const PROJETOS = [
  {
    id: "simulai",
    categoria: "Pessoal · Universidade",
    nome: "SimulAI · análise de ativos com IA",
    tecnologias: ["Go", "PostgreSQL", "Redis", "LLM"],
    resumo:
      "Plataforma web para apoiar investidores na análise de ativos financeiros, combinando indicadores técnicos, dados históricos de mercado e inteligência artificial.",
    imagens: [
      "./assets/projetos/simulai/SimulAI-home.jpeg",
      "./assets/projetos/simulai/SimulAI-results.jpeg",
      "./assets/projetos/simulai/SimulAI-history.jpeg",
    ],
    secoes: [
      {
        titulo: "A proposta",
        paragrafos: [
          "O SimulAI é uma plataforma web para apoiar investidores na análise de ativos financeiros, combinando indicadores técnicos tradicionais, dados históricos de mercado e inteligência artificial. A ideia é centralizar as informações relevantes de um ativo e transformar esses dados numa leitura mais clara para a tomada de decisão.",
        ],
      },
      {
        titulo: "O que a plataforma faz",
        paragrafos: ["O usuário busca um ativo pelo ticker e acessa:"],
        bullets: [
          "dados históricos de mercado",
          "indicadores calculados automaticamente",
          "informações obtidas por API externa",
          "análises preditivas geradas por uma LLM a partir dos indicadores processados",
        ],
        paragrafoFinal:
          "Isso reduz a necessidade de consultar diferentes fontes e organiza a análise numa única aplicação.",
      },
      {
        titulo: "Arquitetura",
        paragrafos: [
          "O projeto segue a Arquitetura Hexagonal (Ports & Adapters), separando regras de negócio, integrações externas e infraestrutura. Isso facilita manutenção, testes e evolução, e reduz o acoplamento entre componentes.",
        ],
      },
      {
        titulo: "Backend e dados",
        paragrafos: [
          "O backend foi feito em Go, pela performance, concorrência nativa, tipagem forte e simplicidade para construir e publicar APIs. A aplicação usa:",
        ],
        bullets: [
          "PostgreSQL para persistência dos dados",
          "Redis para cache das consultas financeiras",
          "JWT para autenticação e autorização",
          "Massive como fonte externa de dados históricos do mercado",
        ],
      },
      {
        titulo: "Inteligência Artificial",
        paragrafos: [
          "Uma Large Language Model interpreta os indicadores calculados e gera análises preditivas a partir dos dados disponíveis. A ideia não é substituir a decisão do investidor, mas transformar dados técnicos numa análise mais acessível e contextualizada.",
        ],
      },
      {
        titulo: "Frontend",
        paragrafos: [
          "Interface em HTML e CSS, com renderização no servidor (Server Side Rendering).",
        ],
      },
    ],
    stack: "Go · PostgreSQL · Redis · JWT · HTML · CSS · Massive API · LLM",
  },
  {
    id: "alugai",
    categoria: "Pessoal · Universidade",
    nome: "AlugaÍ - plataforma de moradia universitária",
    tecnologias: ["C#", ".NET Core", "ASP.NET Core", "Entity Framework", "Fluent Assertions", "SQLite", "Docker", "Next.js", "TypeScript", "HTML", "CSS"],
    resumo:
      "Plataforma Full-Stack — marketplace web escalável focado em moradia universitária, conectando estudantes a apartamentos e repúblicas.",
    imagens: ["./assets/projetos/alugai/Corgi.jpg"],
    secoes: [
      {
        titulo: "A proposta",
        paragrafos: [
          "O AlugAI é um marketplace web escalável voltado para moradia universitária, criado para conectar estudantes que possuem vagas disponíveis em apartamentos ou repúblicas a outros estudantes que estão procurando um lugar para morar.",
          "A proposta é facilitar esse processo em uma única plataforma, permitindo que estudantes anunciem vagas disponíveis, encontrem opções de moradia, conheçam a experiência de outros usuários e entrem em contato diretamente com os responsáveis pelos anúncios.",
        ],
      },
      {
        titulo: "O que a plataforma faz",
        paragrafos: ["Na plataforma, o estudante pode:"],
        bullets: [
          "anunciar uma vaga disponível em seu apartamento ou república;",
          "visualizar anúncios de moradias disponíveis;",
          "consultar informações e detalhes sobre cada acomodação;",
          "avaliar e compartilhar feedbacks sobre a experiência em determinada moradia;",
          "utilizar as avaliações de outros estudantes como apoio na escolha;",
          "acessar os dados de contato do anunciante;",
          "comunicar-se diretamente com o responsável pelo anúncio para obter mais informações e combinar os detalhes da possível locação."
        ],
        paragrafoFinal:
          "A ideia é centralizar a busca por moradia universitária em um ambiente mais prático, colaborativo e direcionado ao público estudantil.",
      },
      {
        titulo: "Arquitetura",
        paragrafos: [
          "O projeto utiliza uma arquitetura baseada no padrão MVC (Model-View-Controller), adaptada ao desenvolvimento de uma API orientada a objetos em C#.",
          "Além da separação tradicional de responsabilidades, foram adicionadas camadas e padrões complementares para melhorar a organização e reduzir o acoplamento entre os componentes da aplicação.",
          "Entre eles estão:",
        ],
        bullets: [
          "DTOs (Data Transfer Objects) para controlar os dados enviados e recebidos pela API;",
          "Repository Pattern para abstrair o acesso e a persistência dos dados;",
          "separação entre controllers, modelos e regras relacionadas ao acesso ao banco;",
          "testes automatizados com xUnit e Fluent Assertions.",
        ],
        paragrafoFinal:
          "Essa organização facilita a manutenção, os testes e a evolução da aplicação.",
      },
      {
        titulo: "Backend e dados",
        paragrafos: [
          "O backend foi desenvolvido em C# com .NET e ASP.NET Core, responsáveis pela criação dos endpoints, processamento das requisições HTTP e envio das respostas da API.",
          "Para persistência dos dados, foi utilizado:",
        ],
        bullets: [
          "SQLite como banco de dados relacional;",
          "Entity Framework Core como ORM para comunicação entre a aplicação e o banco de dados;",
          "LINQ e os recursos do ecossistema .NET para consulta e manipulação dos dados;",
          "xUnit para implementação dos testes automatizados;",
          "Fluent Assertions para tornar as validações dos testes mais legíveis;",
          "Docker e Docker Compose para containerização e padronização do ambiente de execução.",
        ],
        paragrafoFinal:
          "O SQLite foi escolhido por ser uma solução leve, open source e adequada ao ambiente Linux utilizado durante o desenvolvimento.",
      },
      {
        titulo: "Frontend",
        paragrafos: [
          "O frontend foi desenvolvido em Next.js com TypeScript, responsável pela interface da plataforma e pela comunicação com a API construída em ASP.NET Core.",
          "A aplicação segue uma organização modular baseada na estrutura tradicional de projetos Next.js, separando responsabilidades entre:",
        ],
        bullets: [
          "components, responsáveis pelos elementos reutilizáveis da interface;",
          "hooks, responsáveis por encapsular lógica e comportamentos reutilizáveis;",
          "services, responsáveis pela comunicação com a API e pelo acesso aos dados;",
          "páginas e rotas responsáveis pela navegação e apresentação das diferentes funcionalidades do sistema."
        ],
        paragrafoFinal:
          "Essa estrutura reduz o acoplamento entre interface, regras de interação e comunicação com o backend, facilitando a manutenção e a evolução da aplicação."
      },
    ],
    stack: "C# · .NET Core · SQLite · Docker · nominatim API · Next.js · TypeScript · HTML · CSS",
  },
  {
    id: "hotelapi",
    categoria: "Projeto Pessoal",
    nome: "HotelAPI",
    tecnologias: ["C#", ".NET Core", "ASP.NET Core", "Entity Framework", "Fluent Assertions", "SQLite", "Docker"],
    resumo:
      "Microsserviço de Booking — API RESTful de alta performance para reservas hoteleiras em C#/ASP.NET Core e Entity Framework (SQLite), com deploy conteinerizado via Docker Compose.",
    imagens: ["./assets/projetos/hotelapi/Corgi.jpg"],
    secoes: [
      {
        titulo: "A proposta",
        paragrafos: [
          "O projeto consiste em uma API REST para gerenciamento de um sistema de booking de diferentes redes de hotéis. A aplicação permite administrar cidades, hotéis e apartamentos, estruturando as principais informações necessárias para uma plataforma de hospedagem.",
          "O objetivo foi desenvolver uma API organizada, escalável e de fácil manutenção, aplicando conceitos de desenvolvimento backend com C# e o ecossistema .NET.",
        ],
      },
      {
        titulo: "O que a plataforma faz",
        paragrafos: ["A API disponibiliza operações CRUD para gerenciamento das principais entidades do sistema, permitindo:"],
        bullets: [
          "cadastrar, visualizar, atualizar e remover cidades;",
          "cadastrar e gerenciar hotéis associados às cidades;",
          "cadastrar e administrar apartamentos vinculados aos hotéis;",
          "consultar os dados armazenados por meio de endpoints HTTP;",
          "validar e organizar a comunicação entre requisições, regras da aplicação e banco de dados.",
        ],
        paragrafoFinal:
          "A estrutura permite que diferentes aplicações clientes possam consumir a API e utilizar seus dados para construir sistemas de reserva e gerenciamento hoteleiro.",
      },
      {
        titulo: "Arquitetura",
        paragrafos: [
          "O projeto utiliza uma arquitetura baseada no padrão MVC (Model-View-Controller), adaptada ao desenvolvimento de uma API orientada a objetos em C#.",
          "Além da separação tradicional de responsabilidades, foram adicionadas camadas e padrões complementares para melhorar a organização e reduzir o acoplamento entre os componentes da aplicação.",
          "Entre eles estão:",
        ],
        bullets: [
          "DTOs (Data Transfer Objects) para controlar os dados enviados e recebidos pela API;",
          "Repository Pattern para abstrair o acesso e a persistência dos dados;",
          "separação entre controllers, modelos e regras relacionadas ao acesso ao banco;",
          "testes automatizados com xUnit e Fluent Assertions.",
        ],
        paragrafoFinal:
          "Essa organização facilita a manutenção, os testes e a evolução da aplicação.",
      },
      {
        titulo: "Backend e dados",
        paragrafos: [
          "O backend foi desenvolvido em C# com .NET e ASP.NET Core, responsáveis pela criação dos endpoints, processamento das requisições HTTP e envio das respostas da API.",
          "Para persistência dos dados, foi utilizado:",
        ],
        bullets: [
          "SQLite como banco de dados relacional;",
          "Entity Framework Core como ORM para comunicação entre a aplicação e o banco de dados;",
          "LINQ e os recursos do ecossistema .NET para consulta e manipulação dos dados;",
          "xUnit para implementação dos testes automatizados;",
          "Fluent Assertions para tornar as validações dos testes mais legíveis;",
          "Docker e Docker Compose para containerização e padronização do ambiente de execução.",
        ],
        paragrafoFinal:
          "O SQLite foi escolhido por ser uma solução leve, open source e adequada ao ambiente Linux utilizado durante o desenvolvimento.",
      },
      {
        titulo: "Frontend",
        paragrafos: [
          "O projeto foi desenvolvido com foco no backend e na construção da API REST, não possuindo uma interface frontend própria.",
          "A arquitetura permite, no entanto, que diferentes aplicações web, mobile ou desktop consumam os endpoints da API e utilizem os dados de cidades, hotéis e apartamentos para construir uma interface de booking.",
        ]
      }
    ],
    stack: "",
  },
];

// Arquivos "virtuais" listados pelo comando ls / abertos com cat
const FILES = [
  "sobre.txt",
  "skills.sh",
  "formacao.txt",
  "projetos",
  "experiencias.log",
  "contato.md",
  "curriculo.pdf",
];

// Arquivos binários baixáveis via `curl <arquivo>`
const DOWNLOADABLE_FILES = {
  "curriculo.pdf": "./assets/curriculo_geral_gabriel.pdf",
};

function downloadFile(src, filename) {
  const link = document.createElement("a");
  link.href = src;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// ============================================================
// ESTADO DO TERMINAL
// ============================================================
const outputEl = document.getElementById("output");
const inputEl = document.getElementById("cmd-input");
const history = [];
let historyIndex = -1;

// ============================================================
// HELPERS DE RENDERIZAÇÃO
// ============================================================
function printLine(text = "", className = "") {
  const line = document.createElement("div");
  line.className = `line ${className}`.trim();
  line.textContent = text;
  outputEl.appendChild(line);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLine(text = "", className = "", speed = 25) {
  const line = document.createElement("div");
  line.className = `line ${className}`.trim();
  outputEl.appendChild(line);

  for (const char of text) {
    line.textContent += char;
    await sleep(speed);
  }

  return line;
}

function loadBootImage(src, duration = 1800) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      canvas.className = "boot-image";

      outputEl.appendChild(canvas);

      const totalRows = img.height;
      const startTime = performance.now();

      function draw() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentRow = Math.floor(totalRows * progress);

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        if (currentRow > 0) {
          ctx.drawImage(
            img,
            0,
            0,
            img.width,
            currentRow,
            0,
            0,
            canvas.width,
            currentRow
          );
        }

        if (progress < 1) {
          requestAnimationFrame(draw);
        } else {
          resolve(canvas);
        }
      }

      requestAnimationFrame(draw);
    };

    img.onerror = reject;

    img.src = src;
  });
}

async function showBootSpinner(duration = 1800) {
  const spinner = document.createElement("div");
  spinner.className = "line line--dim boot-spinner";

  outputEl.appendChild(spinner);

  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

  const start = Date.now();
  let index = 0;

  while (Date.now() - start < duration) {
    spinner.textContent = ` ${frames[index]} Inicializando Ubuntu 24.04 LTS...`;
    index = (index + 1) % frames.length;

    await sleep(80);
  }

  spinner.remove();
}

function printBlock(lines, className = "") {
  lines.forEach((l) => printLine(l, className));
}

function printHeading(text) {
  printLine(text, "line--heading");
}

function scrollToBottom() {
  outputEl.scrollTop = outputEl.scrollHeight;
}

// ============================================================
// JOGO DA COBRINHA (comando `play`)
// Alternativa ao nSnake: em vez de um shell script, o jogo roda
// inteiramente em JS, desenhando um grid de texto dentro do
// próprio terminal.
// ============================================================
const SNAKE_COLS = 30;
const SNAKE_ROWS = 16;
const SNAKE_SPEED_MS = 130;

let snakeState = null; // null enquanto o jogo não está ativo
let snakeLoopId = null;
let snakeGridEl = null;
let snakeHeaderEl = null;

function snakeRandomFood(body) {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * SNAKE_COLS),
      y: Math.floor(Math.random() * SNAKE_ROWS),
    };
  } while (body.some((seg) => seg.x === pos.x && seg.y === pos.y));
  return pos;
}

function snakeInit() {
  const startX = Math.floor(SNAKE_COLS / 2);
  const startY = Math.floor(SNAKE_ROWS / 2);
  const body = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];
  return {
    body,
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: snakeRandomFood(body),
    score: 0,
    over: false,
  };
}

function snakeRenderGrid(state) {
  const grid = [];
  for (let y = 0; y < SNAKE_ROWS; y++) {
    grid.push(new Array(SNAKE_COLS).fill("·"));
  }

  grid[state.food.y][state.food.x] = "●";

  state.body.forEach((seg, i) => {
    if (seg.y < 0 || seg.y >= SNAKE_ROWS || seg.x < 0 || seg.x >= SNAKE_COLS) {
      return;
    }
    grid[seg.y][seg.x] = i === 0 ? "▓" : "█";
  });

  const top = "┌" + "─".repeat(SNAKE_COLS) + "┐";
  const bottom = "└" + "─".repeat(SNAKE_COLS) + "┘";
  const rows = grid.map((row) => "│" + row.join("") + "│");

  return [top, ...rows, bottom].join("\n");
}

function snakeRenderHeader(state) {
  return state.over
    ? `SCORE: ${state.score}  |  FIM DE JOGO  —  pressione ENTER para voltar ao terminal`
    : `SCORE: ${state.score}  |  setas / WASD para mover  |  ESC para sair`;
}

const GAME_OVER_ART =
` ██████╗  █████╗ ███╗   ███╗███████╗     ██████╗ ██╗   ██╗███████╗██████╗ \n` +
`██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██╔═══██╗██║   ██║██╔════╝██╔══██╗\n` +
`██║  ███╗███████║██╔████╔██║█████╗      ██║   ██║██║   ██║█████╗  ██████╔╝\n` +
`██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗\n` +
`╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║\n` +
` ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝     ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝`;

function snakeShowGameOver(state) {
  outputEl.innerHTML = "";

  const art = document.createElement("pre");
  art.className = "game-over-art";
  art.textContent = GAME_OVER_ART;
  outputEl.appendChild(art);

  const header = document.createElement("div");
  header.className = "line line--dim";
  header.textContent = snakeRenderHeader(state);
  outputEl.appendChild(header);

  scrollToBottom();
}

function snakeUpdateView() {
  snakeHeaderEl.textContent = snakeRenderHeader(snakeState);
  snakeGridEl.textContent = snakeRenderGrid(snakeState);
}

function snakeStopLoop() {
  if (snakeLoopId) {
    clearInterval(snakeLoopId);
    snakeLoopId = null;
  }
}

function snakeTick() {
  const state = snakeState;
  if (!state || state.over) return;

  state.dir = state.nextDir;
  const head = state.body[0];
  const newHead = { x: head.x + state.dir.x, y: head.y + state.dir.y };

  const hitWall =
    newHead.x < 0 ||
    newHead.x >= SNAKE_COLS ||
    newHead.y < 0 ||
    newHead.y >= SNAKE_ROWS;
  const hitSelf = state.body.some(
    (seg) => seg.x === newHead.x && seg.y === newHead.y
  );

  if (hitWall || hitSelf) {
    state.over = true;
    snakeStopLoop();
    snakeShowGameOver(state);
    return;
  }

  state.body.unshift(newHead);

  if (newHead.x === state.food.x && newHead.y === state.food.y) {
    state.score++;
    state.food = snakeRandomFood(state.body);
  } else {
    state.body.pop();
  }

  snakeUpdateView();
}

const SNAKE_DIR_MAP = {
  ArrowUp: { x: 0, y: -1 },
  w: { x: 0, y: -1 },
  W: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  s: { x: 0, y: 1 },
  S: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  a: { x: -1, y: 0 },
  A: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  d: { x: 1, y: 0 },
  D: { x: 1, y: 0 },
};

function snakeKeyHandler(e) {
  if (!snakeState) return;

  const navKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
  if (navKeys.includes(e.key)) e.preventDefault();

  if (e.key === "Escape") {
    snakeExit();
    return;
  }

  if (snakeState.over) {
    if (e.key === "Enter") snakeExit();
    return;
  }

  const next = SNAKE_DIR_MAP[e.key];
  if (!next) return;

  // impede inverter o sentido diretamente sobre o próprio corpo
  const current = snakeState.dir;
  if (next.x === -current.x && next.y === -current.y) return;

  snakeState.nextDir = next;
}

function snakeExit() {
  snakeStopLoop();
  snakeState = null;
  document.removeEventListener("keydown", snakeKeyHandler);
  outputEl.innerHTML = "";
  printLine(
    'Você saiu do jogo. Digite "help" para ver os comandos disponíveis.',
    "line--dim"
  );
  inputEl.disabled = false;
  inputEl.focus();
  scrollToBottom();
}

function snakeStart() {
  outputEl.innerHTML = "";
  inputEl.disabled = true;
  inputEl.blur();

  snakeState = snakeInit();

  snakeHeaderEl = document.createElement("div");
  snakeHeaderEl.className = "line line--dim";
  outputEl.appendChild(snakeHeaderEl);

  snakeGridEl = document.createElement("pre");
  snakeGridEl.className = "snake-game";
  outputEl.appendChild(snakeGridEl);

  snakeUpdateView();

  document.addEventListener("keydown", snakeKeyHandler);
  snakeLoopId = setInterval(snakeTick, SNAKE_SPEED_MS);

  scrollToBottom();
}

// ============================================================
// MODAL DE PROJETOS
// ============================================================
const modalEl = document.getElementById("project-modal");
const modalCloseBtn = document.getElementById("modal-close");
const modalCategoryEl = document.getElementById("modal-category");
const modalTitleEl = document.getElementById("modal-title");
const modalTechEl = document.getElementById("modal-tech");
const modalGalleryWrapEl = document.getElementById("modal-gallery-wrap");
const modalGalleryEl = document.getElementById("modal-gallery");
const modalPrevBtn = document.getElementById("modal-prev");
const modalNextBtn = document.getElementById("modal-next");
const modalProgressEl = document.getElementById("modal-progress");
const modalProgressBarEl = document.getElementById("modal-progress-bar");
const modalBodyEl = document.getElementById("modal-body");

function buildProjectSections(container, secoes) {
  container.innerHTML = "";

  if (!secoes || secoes.length === 0) {
    const p = document.createElement("p");
    p.className = "modal__paragraph modal__paragraph--dim";
    p.textContent = "Detalhes completos em breve.";
    container.appendChild(p);
    return;
  }

  secoes.forEach((sec) => {
    const h = document.createElement("h3");
    h.className = "modal__section-title";
    h.textContent = sec.titulo;
    container.appendChild(h);

    (sec.paragrafos || []).forEach((texto) => {
      const p = document.createElement("p");
      p.className = "modal__paragraph";
      p.textContent = texto;
      container.appendChild(p);
    });

    if (sec.bullets && sec.bullets.length) {
      const ul = document.createElement("ul");
      ul.className = "modal__list";
      sec.bullets.forEach((texto) => {
        const li = document.createElement("li");
        li.textContent = texto;
        ul.appendChild(li);
      });
      container.appendChild(ul);
    }

    if (sec.paragrafoFinal) {
      const p = document.createElement("p");
      p.className = "modal__paragraph";
      p.textContent = sec.paragrafoFinal;
      container.appendChild(p);
    }
  });
}

function updateModalProgress() {
  const count = modalGalleryEl.children.length;
  if (count === 0) return;
  const total = modalGalleryEl.scrollWidth - modalGalleryEl.clientWidth;
  const ratio = total > 0 ? modalGalleryEl.scrollLeft / total : 0;
  modalProgressBarEl.style.width = `${100 / count}%`;
  modalProgressBarEl.style.transform = `translateX(${ratio * (count - 1) * 100}%)`;
}

function modalKeyHandler(e) {
  if (e.key === "Escape") closeProjectModal();
}

// Modal genérico: usado tanto pelos projetos quanto pelas
// experiências — basta passar um objeto com categoria, nome,
// tecnologias, imagens, secoes e (opcionalmente) stack.
function openDetailModal(item) {
  if (!item) return;

  modalCategoryEl.textContent = item.categoria || "";
  modalTitleEl.textContent = item.nome || "";
  modalTechEl.textContent = (item.tecnologias || []).join(" · ");

  modalGalleryEl.innerHTML = "";
  modalGalleryEl.scrollLeft = 0;

  if (item.imagens && item.imagens.length > 0) {
    modalGalleryWrapEl.hidden = false;
    modalProgressEl.hidden = false;
    item.imagens.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${item.nome} — captura ${i + 1}`;
      img.className = "modal__image";
      modalGalleryEl.appendChild(img);
    });
    updateModalProgress();
  } else {
    modalGalleryWrapEl.hidden = true;
    modalProgressEl.hidden = true;
  }

  buildProjectSections(modalBodyEl, item.secoes);

  if (item.stack) {
    const stackLine = document.createElement("p");
    stackLine.className = "modal__stack";
    stackLine.textContent = `Stack: ${item.stack}`;
    modalBodyEl.appendChild(stackLine);
  }

  modalEl.hidden = false;
  document.body.classList.add("modal-open");
  document.addEventListener("keydown", modalKeyHandler);
  modalCloseBtn.focus();
}

function closeProjectModal() {
  modalEl.hidden = true;
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", modalKeyHandler);
  inputEl.focus();
}

modalCloseBtn.addEventListener("click", closeProjectModal);
modalEl.addEventListener("click", (e) => {
  if (e.target === modalEl) closeProjectModal();
});
modalPrevBtn.addEventListener("click", () => {
  modalGalleryEl.scrollBy({ left: -modalGalleryEl.clientWidth, behavior: "smooth" });
});
modalNextBtn.addEventListener("click", () => {
  modalGalleryEl.scrollBy({ left: modalGalleryEl.clientWidth, behavior: "smooth" });
});
modalGalleryEl.addEventListener("scroll", updateModalProgress);

function printProjectsList() {
  printHeading("Projetos de software");
  PROJETOS.forEach((p) => {
    printLine("");
    printLine(p.nome, "line--accent");
    printLine("  " + p.resumo);

    const linkLine = document.createElement("div");
    linkLine.className = "line";
    linkLine.appendChild(document.createTextNode("  "));

    const link = document.createElement("a");
    link.href = "#";
    link.className = "project-link";
    link.textContent = "ver detalhes →";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openDetailModal(p);
    });

    linkLine.appendChild(link);
    outputEl.appendChild(linkLine);
  });
}

function printExperienciasList() {
  printHeading("Experiências profissionais");
  DATA.experiencias.forEach((exp) => {
    printLine("");
    printLine(exp.nome, "line--accent");
    exp.bullets.forEach((b) => printLine(`  * ${b}`));
    printLine(`  Stack: ${exp.stack}`, "line--dim");

    const linkLine = document.createElement("div");
    linkLine.className = "line";
    linkLine.appendChild(document.createTextNode("  "));

    const link = document.createElement("a");
    link.href = "#";
    link.className = "project-link";
    link.textContent = "ver detalhes →";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openDetailModal(exp);
    });

    linkLine.appendChild(link);
    outputEl.appendChild(linkLine);
  });
}

// ============================================================
// COMANDOS
// ============================================================
const COMMANDS = {
  help() {
    printHeading("Comandos disponíveis:");
    printBlock([
      "  sobre         - um pouco sobre mim",
      "  skills        - tecnologias e ferramentas",
      "  formacao      - formação, certificados e idiomas",
      "  projetos      - projetos de software",
      "  experiencias  - histórico profissional",
      "  contato       - formas de contato",
      "  ls            - lista os \"arquivos\" do portfólio",
      "  cat <arquivo> - abre um arquivo específico",
      "  curl <arquivo> - baixa um arquivo (ex: curl curriculo.pdf)",
      "  play          - jogo da cobrinha (ESC para sair)",
      "  clear         - limpa a tela",
    ]);
  },

  clear() {
    outputEl.innerHTML = "";
  },

  formacao() {
    printHeading("Formação e certificados");
    printLine("");
    DATA.formacao.forEach((item) => printLine(`  ● ${item}`));
    printLine("");
    printLine("Idiomas", "line--accent");
    DATA.idiomas.forEach((item) => printLine(`  ● ${item}`));
  },

  ls() {
    printLine(FILES.join("   "));
  },

  cat(args) {
    const file = args[0];
    if (!file) {
      printLine("uso: cat <arquivo>", "line--error");
      return;
    }
    if (DOWNLOADABLE_FILES[file]) {
      printLine(
        `cat: ${file}: arquivo binário — use "curl ${file}" para baixar`,
        "line--error"
      );
      return;
    }
    const map = {
      "sobre.txt": COMMANDS.sobre,
      "skills.sh": COMMANDS.skills,
      "formacao.txt": COMMANDS.formacao,
      "projetos": COMMANDS.projetos,
      "experiencias.log": COMMANDS.experiencias,
      "contato.md": COMMANDS.contato,
    };
    if (map[file]) {
      map[file]();
    } else {
      printLine(`cat: ${file}: arquivo não encontrado`, "line--error");
    }
  },

  curl(args) {
    const file = args[0];
    if (!file) {
      printLine("uso: curl <arquivo>", "line--error");
      return;
    }
    const src = DOWNLOADABLE_FILES[file];
    if (!src) {
      printLine(`curl: ${file}: arquivo não encontrado`, "line--error");
      return;
    }
    printLine(`% Baixando ${file}...`, "line--dim");
    downloadFile(src, file);
    printLine(`✓ download concluído: ${file}`, "line--accent");
  },

  sobre() {
    printHeading(`${DATA.nome}`);
    printLine(DATA.titulo, "line--dim");
    printLine("");
    printBlock(DATA.sobre);
  },

  skills() {
    printHeading("Skills técnicas");
    Object.entries(DATA.skills).forEach(([categoria, itens]) => {
      printLine("");
      printLine(categoria, "line--accent");
      printLine("  " + itens.join(", "));
    });
  },

  projetos() {
    printProjectsList();
  },

  experiencias() {
    printExperienciasList();
  },

  contato() {
    printHeading("Contato");
    printLine("");
    printLine(`Telefone : ${DATA.contato.telefone}`);
    printLine(`Email    : ${DATA.contato.email}`);
    printLine(`LinkedIn : ${DATA.contato.linkedin}`, "line--link");
    printLine(`GitHub   : ${DATA.contato.github}`, "line--link");
  },

  play() {
    snakeStart();
  },
};

// alias em pt para digitar sem acento
COMMANDS["experiencia"] = COMMANDS.experiencias;
// alias para quem digitar "snake" em vez de "play"
COMMANDS["snake"] = COMMANDS.play;

// ============================================================
// EXECUÇÃO DE COMANDOS
// ============================================================
function runCommand(raw) {
  const trimmed = raw.trim();
  printLine(`gabriel@portfolio:~$ ${trimmed}`, "line--echo");

  if (trimmed === "") return;

  const [cmd, ...args] = trimmed.split(/\s+/);
  const handler = COMMANDS[cmd.toLowerCase()];

  if (handler) {
    handler(args);
  } else {
    printLine(`comando não encontrado: ${cmd}`, "line--error");
    printLine('digite "help" para ver os comandos disponíveis', "line--dim");
  }

  scrollToBottom();
}

// ============================================================
// INPUT: enter para executar, setas para navegar histórico
// ============================================================
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = inputEl.value;
    if (value.trim() !== "") {
      history.push(value);
      historyIndex = history.length;
    }
    runCommand(value);
    inputEl.value = "";
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      inputEl.value = history[historyIndex];
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex < history.length - 1) {
      historyIndex++;
      inputEl.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      inputEl.value = "";
    }
  }
});

document.getElementById("terminal").addEventListener("click", () => inputEl.focus());

// ============================================================
// BOOT SEQUENCE
// ============================================================
async function boot() {
  inputEl.disabled = true;
  await showBootSpinner(1200);
  await typeLine("Ubuntu 24.04 LTS", "line--dim", 35);
  await sleep(250);
  await typeLine("");
  await typeLine(
    `Bem-vindo ao terminal de ${DATA.nome.split(" ")[0]}.`,
    "line--accent",
    30
  );
  try {
    await loadBootImage("./assets/perfil-gabriel.jpg", 4000);
  } catch (err) {
    // se a imagem não existir/carregar, o boot segue sem travar o terminal
    console.warn("Imagem de boot não carregada:", err);
  }
  await typeLine(
    'Digite "help" para ver os comandos disponíveis, ou "ls" para listar as seções.',
    "",
    20
  );
  await typeLine("");
  inputEl.disabled = false;
  inputEl.focus();
}

boot();