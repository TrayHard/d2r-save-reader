# @your-scope/d2r-save-reader

Минимальная библиотека для чтения заголовка Diablo II Resurrected `.d2s` и общего сташа из `Buffer` или base64.

## Установка

```bash
npm install @your-scope/d2r-save-reader
```

## Пример

```ts
import {
  parseD2S,
  parseD2SFromBase64,
  parseSharedStash,
  parseSharedStashFromBase64,
} from "@your-scope/d2r-save-reader";

const char = parseD2S(buffer);
console.log(char.header.characterName);

const char2 = parseD2SFromBase64(base64);

const stash = parseSharedStash(stashBuffer);
console.log(stash.header.version);
```

API сейчас парсит только минимальный заголовок. Планируется расширение: статистика, навыки, квесты, путевые точки, инвентарь, наемники и вкладки сташа.

Внимание: форматы D2/D2R различаются между версиями; используйте на свой риск.
