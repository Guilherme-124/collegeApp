ALTER TABLE "pneus_movimentacoes" DROP CONSTRAINT "pneus_movimentacoes_pneu_id_pneus_movimentacoes_id_fk";
--> statement-breakpoint
ALTER TABLE "pneus_movimentacoes" DROP CONSTRAINT "pneus_movimentacoes_movimentacao_id_pneus_movimentacoes_id_fk";
--> statement-breakpoint
ALTER TABLE "pneus_movimentacoes" ADD CONSTRAINT "pneus_movimentacoes_pneu_id_pneus_id_fk" FOREIGN KEY ("pneu_id") REFERENCES "public"."pneus"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pneus_movimentacoes" ADD CONSTRAINT "pneus_movimentacoes_movimentacao_id_movimentacoes_pneus_id_fk" FOREIGN KEY ("movimentacao_id") REFERENCES "public"."movimentacoes_pneus"("id") ON DELETE no action ON UPDATE no action;