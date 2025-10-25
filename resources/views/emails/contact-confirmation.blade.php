@component('mail::message')
# Obrigado pelo teu contacto, {{ $data['name'] }}!

Recebemos a tua mensagem e entraremos em contacto o mais breve possível.

**Mensagem enviada:**
> {{ $data['message'] }}

Cumprimentos,
**Equipa WaveRewards**
@endcomponent