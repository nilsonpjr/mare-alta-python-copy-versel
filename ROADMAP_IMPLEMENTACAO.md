# Roadmap de Implementação Tática - Mare Alta

Este documento serve como nosso **"Mapa de Controle"** para garantir que o Plano de Negócios seja implementado de forma organizada, sem perder o foco.

**Regra de Ouro:** *Nunca iniciar um Módulo novo sem terminar o anterior (Codificar -> Testar -> Validar).*

---

## 🏁 Fase 1: O "Diferencial Vendedor" (Foco Atual)
*Objetivo: Ter uma ferramenta que encante oficinas e mecânicos imediatamente.*

- [x] **Estrutura de Dados dos Kits de Revisão** (Criado em `frontend/types/maintenance.ts` e `data/maintenance_kits.ts`)
- [ ] **Tela de Orçador Rápido (UI):** Criar a interface onde o mecânico seleciona "Mercury Verado 300 - 100h" e o orçamento sai pronto.
- [ ] **PDF de Orçamento:** Gerar um PDF profissional com logo da oficina para enviar ao cliente.
- [ ] **Integração com Estoque:** Ao aprovar o orçamento, baixar as peças do estoque automaticamente.

## 🏗 Fase 2: Estrutura SaaS & Backend (Alicerce)
*Objetivo: Preparar o sistema para ter múltiplos clientes (Multi-tenancy).*

- [ ] **Migração Completa para Python/FastAPI:** Garantir que todo o frontend fale com a API Python.
- [ ] **Login & Autenticação Real:** Implementar JWT e tabela de usuários no banco SQL.
- [ ] **Suporte a Multi-Empresas:** Adicionar coluna `tenant_id` em todas as tabelas do banco de dados (Barcos, Clientes, Ordens).

## 🤝 Fase 3: Rede de Parceiros & Analista Técnico
*Objetivo: Expandir para gerenciamento de grandes embarcações.*

- [ ] **Cadastro de Parceiros:** Tela para registrar eletricistas, capoteiros, etc., com ranking de avaliação.
- [ ] **Checklist de Inspeção (Mobile):** Interface focada em celular para o Analista marcar problemas no barco.
- [ ] **Gerador de Pré-Ordem:** Ferramenta que agrupa orçamentos de parceiros em uma proposta única para o dono do barco.

## 🌐 Fase 4: Portal do Cliente & CRM
*Objetivo: O cliente final interagir sozinho.*

- [ ] **CRM Ativo:** Robô que verifica datas/horas e manda link de WhatsApp.
- [ ] **Portal Web:** Login para o dono do barco ver suas O.S. e fotos.

---

## 📌 Status Atual
**Módulo em Andamento:** Fase 1 -> Tela de Orçador Rápido.
**Próxima Ação:** Criar o componente React `MaintenanceBudgetView.tsx`.
