import { pgTable, serial, text, timestamp, integer, numeric } from "drizzle-orm/pg-core";

export const pneusTable = pgTable("pneus", {
  id: serial("id").primaryKey(),
  marca: text("marca").notNull(),
  kmAtual: integer("km_atual").notNull(),
  kmLimite: integer("km_limite"),
  preco: numeric("preco"),
  tipo: text("tipo").notNull(),
  medidaPneu: text("medida_pneu"),
  numeroDot: text("numeroDot"),
  ultimaPressao: numeric("ultima_pressa"),
  pressaoPneu: numeric("precao_pneu"),
  profundidadeSulco: text("profundidade_sulco"),
  posicao: text("posicao"),
  veiculoId: integer("veiculo_id").references(() => veiculosTable.id),
});


export const pneuMovimentacaoTable = pgTable("pneus_movimentacoes", {
  id: serial("id").primaryKey(),
  pneuId: integer("pneu_id").references(() => pneusTable.id),
  movimentacaoId: integer("movimentacao_id").references(() => movimentacaoPneuTable.id),
});


export const movimentacaoPneuTable = pgTable("movimentacoes_pneus", {
  id: serial("id").primaryKey(),
  pneuId: integer("pneu_id").references(() => pneusTable.id).notNull(),
  tipoMovimentacao: text("tipo_movimentacao"),
  data: timestamp("data").notNull(),
  observacoes: text("observacoes"),
});


export const veiculosTable = pgTable("veiculos", {
  id: serial("id").primaryKey(),
  placa: text("placa").notNull(),
  nPneus: integer("n_pneus").notNull(),
  tipo: text("tipo").notNull(),
});


export const borracheiroTable = pgTable("borracheiro", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  telefone: text("telefone"),
  endereco: text("endereco"),
  cep: text("cep"),
  email: text("email"),
  idade: text("idade"),
});


export const ordemTable = pgTable("borracheiro", {
  id: serial("id").primaryKey(),
  borracheiroId: integer("borracheiro_id").references(() => borracheiroTable.id),
  idVeiculo: integer("veiculo_id").references(() => veiculosTable.id),
  data: timestamp("data").notNull(),
  status: text("status").notNull(),
});


export const detalhesOrdemTable = pgTable("borracheiro", {
  id: serial("id").primaryKey().notNull(),
  ordemId: integer("ordem_id").references(() => ordemTable.id),
  pneuId: integer("pneu_id").references(() => pneusTable.id),
  servico: text("servico").notNull(),
  custo: numeric("custo").notNull(),
  kmNoMomento: integer("km_no_momento"),
});

