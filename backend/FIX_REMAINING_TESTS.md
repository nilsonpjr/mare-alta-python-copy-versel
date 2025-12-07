# Guia para Correção dos Testes Restantes (5 Falhas)

A suíte de testes está com 90% de aprovação (46/51 testes passando). Abaixo estão as instruções para corrigir as 5 falhas restantes.

## 1. Falha de Login (`test_auth_router.py`)
- **Erro:** `test_login_success` retorna 401 Unauthorized.
- **Causa Provável:** O `pwd_context` usado para hashear a senha no teste (`tests/conftest.py`) pode ter configuração diferente (ex: rounds, algorithm) do `pwd_context` usado no endpoint `/login` (`backend/auth.py`), fazendo com que `verify_password` falhe.
- **Ação:** Verificar se `CryptContext` é instanciado de forma idêntica ou unificar a instância.

## 2. Falha de Get Boat e Update Client
- **Erro:** `test_get_boat_by_id` (404) e `test_update_client` (422).
- **Causa (Boat):** O objeto criado manualmente no teste via `db.add()` pode não estar visível para o endpoint devido ao isolamento de transação do `testclient`.
- **Causa (Client):** Retorna status 422 (Unprocessable Entity). O payload enviado no teste falta campos obrigatórios exigidos pelo schema `ClientCreate` (que está sendo usado no update).
- **Ação (Client):** Criar um schema `ClientUpdate` onde todos os campos sejam opcionais ou preencher todos os campos required no payload do teste.

## 3. Falhas de Inventário
- **Erro:** `test_update_part_quantity` e `test_get_stock_movements`.
- **Causa:** Provavelmente erros de assertion nos dados retornados ou payloads incorretos similares ao do Client.

## Comando para Rodar Apenas as Falhas
```bash
python3 -m pytest -v --tb=short -k "test_login_success or test_get_boat_by_id or test_update_client or test_update_part_quantity or test_get_stock_movements"
```
