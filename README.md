# Mini Novela Interactiva (ES / EN / RU opcional)

Proyecto web estático para una mini telenovela educativa bilingüe con soporte opcional para ruso.

## Características
- Capítulos cortos renderizados dinámicamente.
- Cada párrafo en español con traducción inmediata al inglés y opcional al ruso.
- Botón para mostrar/ocultar ruso.
- Modo vocabulario: resalta palabras y muestra traducción emergente.
- Progreso visual por capítulo.
- Guarda estado (capítulo, preferencias) en `localStorage`.
- Diseño responsive, tipografía elegante y transiciones suaves.
- Soporte de audio de fondo (debes reemplazar el archivo placeholder con audio con licencia válida).

## Estructura
- `index.html` estructura base.
- `styles.css` estilos y temas.
- `script.js` lógica de capítulos y UI.
- `assets/audio/placeholder.mp3` (NO incluido todavía; crea la carpeta y añade audio propio con derechos de uso).

## Añadir más capítulos
Edita el arreglo `chapters` en `script.js`.

```js
chapters.push({
  title: 'Capítulo 2 · Título',
  segments: [
    { es: 'Texto ES', en: 'Text EN', ru: 'Текст RU', vocab: [['palabra','word']] }
  ]
});
```

## Vocabulario
Cada segmento puede definir `vocab: [ [es, en], ... ]` para habilitar resaltados cuando el modo Vocab está activo.

## Ejecución local
Abre `index.html` en el navegador o sirve la carpeta con un servidor estático.

Ejemplo (PowerShell):
```powershell
# Python simple server (si tienes Python instalado)
python -m http.server 8080
```
Luego visita: http://localhost:8080/

## Audio
Reemplaza el `<source>` en `index.html` por un archivo válido. No incluyas material con copyright sin permiso.

## Licencia
Uso personal / educativo. Ajusta según necesidades.
