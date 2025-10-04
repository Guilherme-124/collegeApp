CREATE TABLE "borracheiro" (
	"id" serial PRIMARY KEY NOT NULL,
	"borracheiro_id" integer,
	"veiculo_id" integer,
	"data" timestamp NOT NULL,
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movimentacoes_pneus" (
	"id" serial PRIMARY KEY NOT NULL,
	"pneu_id" integer NOT NULL,
	"tipo_movimentacao" text,
	"data" timestamp NOT NULL,
	"observacoes" text
);
--> statement-breakpoint
CREATE TABLE "pneus_movimentacoes" (
	"id" serial PRIMARY KEY NOT NULL,
	"pneu_id" integer,
	"movimentacao_id" integer
);
--> statement-breakpoint
CREATE TABLE "pneus" (
	"id" serial PRIMARY KEY NOT NULL,
	"marca" text NOT NULL,
	"km_atual" integer NOT NULL,
	"km_limite" integer,
	"preco" numeric,
	"tipo" text NOT NULL,
	"medida_pneu" text,
	"numeroDot" text,
	"ultima_pressa" numeric,
	"precao_pneu" numeric,
	"profundidade_sulco" text,
	"posicao" text,
	"veiculo_id" integer
);
--> statement-breakpoint
CREATE TABLE "veiculos" (
	"id" serial PRIMARY KEY NOT NULL,
	"placa" text NOT NULL,
	"n_pneus" integer NOT NULL,
	"tipo" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "borracheiro" ADD CONSTRAINT "borracheiro_borracheiro_id_borracheiro_id_fk" FOREIGN KEY ("borracheiro_id") REFERENCES "public"."borracheiro"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borracheiro" ADD CONSTRAINT "borracheiro_veiculo_id_veiculos_id_fk" FOREIGN KEY ("veiculo_id") REFERENCES "public"."veiculos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movimentacoes_pneus" ADD CONSTRAINT "movimentacoes_pneus_pneu_id_pneus_id_fk" FOREIGN KEY ("pneu_id") REFERENCES "public"."pneus"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pneus_movimentacoes" ADD CONSTRAINT "pneus_movimentacoes_pneu_id_pneus_movimentacoes_id_fk" FOREIGN KEY ("pneu_id") REFERENCES "public"."pneus_movimentacoes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pneus_movimentacoes" ADD CONSTRAINT "pneus_movimentacoes_movimentacao_id_pneus_movimentacoes_id_fk" FOREIGN KEY ("movimentacao_id") REFERENCES "public"."pneus_movimentacoes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pneus" ADD CONSTRAINT "pneus_veiculo_id_veiculos_id_fk" FOREIGN KEY ("veiculo_id") REFERENCES "public"."veiculos"("id") ON DELETE no action ON UPDATE no action;