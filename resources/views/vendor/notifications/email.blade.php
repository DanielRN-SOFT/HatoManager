{{--
    resources/views/vendor/notifications/email.blade.php
    Contenido del email — sigue el sistema de diseño HatoManager
--}}
<x-mail::message>

{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
@if ($level === 'error')
# Algo salió mal
@else
# Hola{{ ! empty($name) ? ', ' . $name : '' }}
@endif
@endif

{{-- Intro Lines --}}
@foreach ($introLines as $line)
{{ $line }}

@endforeach

{{-- Action Button --}}
@isset($actionText)
<x-mail::button :url="$actionUrl" color="{{ $level === 'error' ? 'red' : 'green' }}">
{{ $actionText }}
</x-mail::button>
@endisset

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{{ $line }}

@endforeach

@isset($salutation)
{{ $salutation }}
@else
Saludos,<br>
**{{ config('app.name') }}**
@endisset

{{-- Subcopy / URL fallback --}}
@isset($actionText)
<x-slot:subcopy>
Si tienes problemas al hacer clic en el botón **"{{ $actionText }}"**, copia y pega esta URL en tu navegador:
[{{ $displayableActionUrl }}]({{ $actionUrl }})
</x-slot:subcopy>
@endisset

</x-mail::message>
