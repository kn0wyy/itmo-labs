'use strict';
// Ключевые слова C++20: такие имена не разрешены.
const keywords = new Set(('alignas alignof and and_eq asm atomic_cancel atomic_commit atomic_noexcept auto bitand bitor bool break case catch char char8_t char16_t char32_t class compl concept const consteval constexpr constinit const_cast continue co_await co_return co_yield decltype default delete do double dynamic_cast else enum explicit export extern false float for friend goto if inline int long mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public reflexpr register reinterpret_cast requires return short signed sizeof static static_assert static_cast struct switch synchronized template this thread_local throw true try typedef typeid typename union unsigned using virtual void volatile wchar_t while xor xor_eq').split(' '));
/** Проверяет безопасное подмножество идентификаторов C++. */
function checkName(name) {
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name) || name.includes('__') || keywords.has(name)) {
    throw new Error(`Недопустимое имя: ${name || '(пусто)'}. Используйте латинскую букву в начале, затем буквы, цифры и одиночные подчёркивания; не ключевые слова C++.`);
  }
}
/** Разбирает описание, вычисляет значения и строит enum class и функцию toString. */
function generate(input) {
  if (typeof input !== 'string' || !input.trim()) throw new Error('Введите описание перечисления.');
  if (input.length > 5000) throw new Error('Описание слишком длинное: максимум 5000 символов.');
  const parts = input.split(':');
  if (parts.length !== 2) throw new Error('Нужно одно двоеточие: Status: New, Active=5, Done');
  const name = parts[0].trim(); checkName(name);
  const names = new Set(), values = new Set(), items = [];
  let next = 0;
  for (const raw of parts[1].split(',')) {
    const entry = raw.trim();
    if (!entry) throw new Error('Пустой элемент: проверьте список и запятые.');
    const pair = entry.split('=');
    if (pair.length > 2) throw new Error(`Лишний знак = в элементе ${entry}.`);
    const key = pair[0].trim(); checkName(key);
    if (key === name) throw new Error('Имя элемента не должно совпадать с именем перечисления.');
    if (names.has(key)) throw new Error(`Повтор имени: ${key}.`);
    let value = next;
    if (pair.length === 2) {
      if (!/^-?\d+$/.test(pair[1].trim())) throw new Error(`Значение ${key} должно быть целым десятичным числом.`);
      value = Number(pair[1].trim());
    }
    if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647) throw new Error('Значение вышло за диапазон 32-битного целого.');
    if (values.has(value)) throw new Error(`Повтор значения: ${value}. Для switch нужны разные значения.`);
    names.add(key); values.add(value); items.push({name: key, value}); next = value + 1;
  }
  const fields = items.map(x => `    ${x.name} = ${x.value}`).join(',\n');
  const cases = items.map(x => `        case ${name}::${x.name}: return "${x.name}";`).join('\n');
  return `#include <cstdint>\n\nenum class ${name} : std::int32_t {\n${fields}\n};\n\ninline const char* toString(${name} value) {\n    switch (value) {\n${cases}\n        default: return "Unknown";\n    }\n}\n`;
}
module.exports = { generate };
