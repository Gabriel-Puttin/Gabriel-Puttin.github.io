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
    "Desenvolvedor Full Stack especializado em arquiteturas back-end corporativas",
    "e integrações de alta criticidade. Histórico comprovado na modernização de",
    "sistemas legados (Go/REST) e na construção de infraestruturas em nuvem do",
    "zero (GCP, MongoDB, Node.js).",
    "",
    "Estudante de Sistemas de Informação na UVV, focado em projetar soluções",
    "assíncronas, reduzir gargalos de I/O e entregar software altamente",
    "disponível e escalável.",
    "",
    "Formação:",
    "  - Bacharelado em Sistemas de Informação — UVV (conclusão: dez/2027)",
    "  - Desenvolvimento Web Full Stack — Trybe (concluído)",
    "  - Técnico em Edificações — IFES (concluído)",
  ],
  skills: {
    "Linguagens": ["Go", "C#", "JavaScript/TypeScript", "Python", "SQL"],
    "Back-End": ["ASP.NET Core", "Entity Framework", "Node.js", "Express.js", "Django", "Flask"],
    "Front-End": ["React.js", "Next.js", "Redux", "Context API"],
    "Cloud, Dados & DevOps": ["Docker", "Docker Compose", "GCP", "AWS", "GitHub Actions", "MongoDB", "PostgreSQL/SQLite", "Power BI", "Pandas"],
  },
  experiencias: [
    {
      cargo: "Desenvolvedor Back-End",
      empresa: "Genesis Tecnologia",
      bullets: [
        "Arquiteturei a migração completa de uma API SOAP legada para REST utilizando Go e arquitetura hexagonal, reduzindo o acoplamento sistêmico entre plataformas hospitalares críticas (HIS e PACS).",
        "Escalei o processamento de dados do sistema Clinux ao desenvolver um polling de workers assíncronos, mitigando bloqueios de I/O e garantindo 100% de disponibilidade no fluxo de integrações.",
        "Acelerei a transferência de prontuários e dados médicos em 20%, liderando a otimização de rotas e consultas complexas em Go.",
      ],
      stack: "Go, Arquitetura Hexagonal, REST, SOAP, HIS/PACS, Workers Assíncronos",
    },
    {
      cargo: "Desenvolvedor Full Stack",
      empresa: "Volia Cosméticos",
      bullets: [
        "Lancei o primeiro sistema de gestão de estoque automatizado da empresa do zero, utilizando Node.js e MongoDB no GCP, alcançando 100% de rastreabilidade em operações antes executadas manualmente.",
        "Liderei a infraestrutura tecnológica como único profissional de TI da operação, otimizando o carregamento e a UX de landing pages corporativas com HTML/CSS.",
        "Estruturei a inteligência de negócios ao construir dashboards em Power BI, centralizando métricas gerenciais da diretoria.",
      ],
      stack: "Node.js, MongoDB, GCP, Power BI, HTML/CSS",
    },
  ],
  projetos: [
    {
      nome: "AlugaÍ",
      descricao: "Plataforma Full-Stack — marketplace web escalável focado em moradia universitária, conectando estudantes a apartamentos e repúblicas.",
    },
    {
      nome: "HotelAPI",
      descricao: "Microsserviço de Booking — API RESTful de alta performance para reservas hoteleiras em C#/ASP.NET Core e Entity Framework (SQLite), com deploy conteinerizado via Docker Compose.",
    },
  ],
};

// Arquivos "virtuais" listados pelo comando ls / abertos com cat
const FILES = ["sobre.txt", "skills.sh", "projetos", "experiencias.log", "contato.md"];

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
// COMANDOS
// ============================================================
const COMMANDS = {
  help() {
    printHeading("Comandos disponíveis:");
    printBlock([
      "  sobre         - um pouco sobre mim",
      "  skills        - tecnologias e ferramentas",
      "  projetos      - projetos de software",
      "  experiencias  - histórico profissional",
      "  contato       - formas de contato",
      "  ls            - lista os \"arquivos\" do portfólio",
      "  cat <arquivo> - abre um arquivo específico",
      "  whoami        - quem sou eu",
      "  play          - jogo da cobrinha (ESC para sair)",
      "  clear         - limpa a tela",
    ]);
  },

  clear() {
    outputEl.innerHTML = "";
  },

  whoami() {
    printLine(DATA.nome, "line--accent");
    printLine(DATA.titulo, "line--dim");
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
    const map = {
      "sobre.txt": COMMANDS.sobre,
      "skills.sh": COMMANDS.skills,
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
    printHeading("Projetos de software");
    DATA.projetos.forEach((p) => {
      printLine("");
      printLine(p.nome, "line--accent");
      printLine("  " + p.descricao);
    });
  },

  experiencias() {
    printHeading("Experiências profissionais");
    DATA.experiencias.forEach((exp) => {
      printLine("");
      printLine(`${exp.cargo} — ${exp.empresa}`, "line--accent");
      exp.bullets.forEach((b) => printLine(`  * ${b}`));
      printLine(`  Stack: ${exp.stack}`, "line--dim");
    });
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