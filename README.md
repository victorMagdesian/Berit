# Berit

Berit agora usa **Clerk como autenticação única**, com **RLS no Supabase via JWT do Clerk**, e um **gate de passphrase** que ativa o acesso apenas uma vez.

## Ambiente

Configure as variáveis abaixo:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_JWT_TEMPLATE=supabase # opcional
SUPABASE_JWT_TEMPLATE=supabase # opcional (server-side)

CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SIGN_IN_URL=/sign-in
CLERK_SIGN_UP_URL=/sign-up

BERIT_GATE_PASSPHRASE=06122025
HANDOFF_SECRET=uma-chave-longa-e-aleatoria
HANDOFF_AUD=abstinenciahelp
```

## Clerk ↔ Supabase (RLS)

1. No Clerk, crie um **JWT Template** chamado `supabase` (ou ajuste `SUPABASE_JWT_TEMPLATE`).
2. Inclua as claims necessárias para o Supabase, garantindo `sub` com o `clerk_user_id`.  
   - Se o projeto exigir, inclua `role: "authenticated"` no template.
3. O cliente Supabase é criado com `Authorization: Bearer <token>` e **não usa service_role**.

As políticas RLS usam `request.jwt.claims.sub` via `clerk_uid()` para permitir acesso apenas quando há JWT válido.

## Gate de Passphrase (Ativação Única)

- Após login no Clerk, o usuário é direcionado ao `/gate` caso não esteja ativado.
- `/api/berit/activate` valida a passphrase usando `BERIT_GATE_PASSPHRASE` (server-only).
- Ao ativar, o registro `berit_access.activated` é marcado como `true`.

## Handoff para AbstinenciaHelp

- `POST /api/handoff/abstinencia` gera um JWT curto (120s) com `HS256`.
- O botão “Abrir AbstinenciaHelp” redireciona para:
  `https://abstinenciahelp.vercel.app/handoff?token=<token>`.

## Segurança

- Clerk é o único login; não há fallback de senha local.
- RLS depende do JWT do Clerk (sem service_role no cliente).
- Passphrase é validada somente no backend.
