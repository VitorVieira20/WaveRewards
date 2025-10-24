@component('mail::message')
# Nova mensagem de contacto

**Nome:** {{ $data['name'] }}
**Email:** {{ $data['email'] }}
**Telemóvel:** {{ $data['phone'] ?? '—' }}
**Empresa:** {{ $data['company'] ?? '—' }}

---

**Mensagem:**
> {{ $data['message'] }}

---

Obrigado,<br>
{{ config('app.name') }}
@endcomponent