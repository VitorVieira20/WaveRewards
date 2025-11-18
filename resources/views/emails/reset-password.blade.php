<x-mail::message>
# Olá!

Recebeste este email porque recebemos um pedido de recuperação de password para a tua conta.

<x-mail::button :url="$url">
Recuperar Password
</x-mail::button>

Este link de recuperação expira em 60 minutos.

Se não pediste uma recuperação de password, nenhuma ação é necessária.

Obrigado,<br>
Equipa {{ config('app.name') }}
</x-mail::message>