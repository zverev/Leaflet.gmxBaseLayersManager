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

### Events

| Type | Property | Description
| --- | --- | ---
| baselayeradd | `<BaseLayer>` | Добавлена подложка.
| baselayerremove | `<BaseLayer>` | Удалена подложка.
| baselayersactiveids | `<string[]`> | Изменен список активных подложек.
| baselayerchange | `<BaseLayer>` | Изменена текущая подложка.
| layerschange | `<BaseLayer>` | Произошло изменение в списке слоев подложки.

### [BaseLayer] - базовая подложка (наследуется от [L.LayerGroup](http://leafletjs.com/reference.html#layergroup)

Метод|Синтаксис|Возвращаемое значение|Описание
------|------|:---------:|-----------
addLayer|`addLayer(<ILayer> layer)`|| Добавить слой в подложку.
removeLayer|`removeLayer(<ILayer> layer)`|| Удалить слой из подложки.

### BaseLayer свойства

Свойство|Тип|По умолчанию|Описание
------|------|:---------:|-----------
id | `<string> id` | Идентификатор подложки.
options | `<hash> | {}` | Опции заданные при добавлении подложки.

При добавлении подложки `add(<string> id, <options> options? )` можно задать список слоев подложки через атрибут:
options.layers = `<ILayer[]> | []`

При использовании контролов слоев на основе `L.Control.Layers` совместно с gmxBaseLayersManager
для синхронизации изменений можно воспользоваться событиями gmxBaseLayersManager.
