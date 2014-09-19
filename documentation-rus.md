# Документация плагина gmxBaseLayersManager

## gmxBaseLayersManager - плагин управления базовыми подложками.

Плагин предоставляет интерфейс управления базовыми подложками.
Доступен через map.gmxBaseLayersManager

### Методы

Метод|Синтаксис|Возвращаемое значение|Описание
------|------|:---------:|-----------
add|`add(<string> id, <options> options? )`|`<BaseLayer>`| Добавить подложку.
get|`get(<string> id)`|`<BaseLayer , null>`| Получить подложку.
remove|`remove(<string> id)`|`<BaseLayer , null>`| Удалить подложку.
getAll|`getAll()`|`<BaseLayer{}>`| Получить все подложки.
setActiveIDs|`setActiveIDs(<string[]>)`|| Установить список активных подложек.
getActiveIDs|`getActiveIDs()`|`<string[]>`| Получить список активных подложек.
addActiveID|`addActiveID(<string> id, <int> index?)`|| Добавить активную подложку (где index порядковый номер подложки).
isActiveID|`isActiveID(<string> id)`|`<bool>`| Проверить id в списке активных подложек.
setCurrentID|`setCurrentID(<string> id)`|`<BaseLayer , null>`| Установить текущую подложку.
getCurrentID|`getCurrentID()`|`<string> id , null`| Получить текущую подложку.

### BaseLayer - базовая подложка

Метод|Синтаксис|Возвращаемое значение|Описание
------|------|:---------:|-----------
addLayer|`addLayer(<ILayer> layer)`|| Добавить слой в подложку.
removeLayer|`removeLayer(<ILayer> layer)`|| Удалить слой из подложки.

### BaseLayer свойства

Свойство|Тип|По умолчанию|Описание
------|------|:---------:|-----------
layers | `<ILayer[]> | []` | Массив слоев подложки(в порядке возрастания).
options | `<hash> | {}` | Опции заданные при добавлении подложки.

При добавленни подложки `add(<string> id, <options> options? )` можно задать список слоев подложки через атрибут:
options.layers = `<ILayer[]> | []`

### Events

| Type | Property | Description
| --- | --- | ---
| onAdd | `event<BaseLayer>` | Добавлена подложка.
| onRemove | `event<BaseLayer>` | Удалена подложка.
| onActiveChanged | `event<string[]`> | Изменен список активных подложек.
| onSetCurrent | `event<BaseLayer>` | Изменена текущая подложка.
| onLayerChange | `event<BaseLayer>` | Произошло изменение в списке слоев подложки.
