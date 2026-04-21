/**
 * date-auto.js — автоматическое обновление даты и года на всех страницах
 * Бейдж "Обновлено" показывает вчерашнюю дату (формат: «8 апреля 2026»)
 * Год в <title>, <meta> и <h1> подставляется автоматически
 */
(function () {
  // ---------- Вспомогательные функции ----------
  var MONTHS_RU = [
    'января','февраля','марта','апреля','мая','июня',
    'июля','августа','сентября','октября','ноября','декабря'
  ];

  function getYesterday() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
  }

  function formatDateRu(d) {
    return d.getDate() + '\u00a0' + MONTHS_RU[d.getMonth()] + '\u00a0' + d.getFullYear();
  }

  function getCurrentYear() {
    return new Date().getFullYear();
  }

  // ---------- Обновление бейджа ----------
  function updateBadge() {
    var badge = document.querySelector('.hero-badge');
    if (!badge) return;
    var yesterday = getYesterday();
    // Сохраняем иконку (первый дочерний элемент <i>)
    var icon = badge.querySelector('i');
    badge.innerHTML = '';
    if (icon) badge.appendChild(icon);
    badge.appendChild(document.createTextNode('\u00a0Обновлено:\u00a0' + formatDateRu(yesterday)));
  }

  // ---------- Обновление года в тексте ----------
  // Заменяет СТАРЫЙ год → ТЕКУЩИЙ во всех строках
  function replaceYear(str) {
    return str.replace(/20\d\d/g, getCurrentYear());
  }

  function updateYear() {
    var year = getCurrentYear();

    // <title>
    if (document.title) {
      document.title = replaceYear(document.title);
    }

    // <meta name="description">
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', replaceYear(metaDesc.getAttribute('content') || ''));

    // <meta property="og:title">
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', replaceYear(ogTitle.getAttribute('content') || ''));

    // <meta property="og:description">
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', replaceYear(ogDesc.getAttribute('content') || ''));

    // <meta property="og:site_name">
    var ogSite = document.querySelector('meta[property="og:site_name"]');
    if (ogSite) ogSite.setAttribute('content', replaceYear(ogSite.getAttribute('content') || ''));

    // <h1> — обновляем только текстовые узлы, не трогая дочерние теги
    var h1 = document.querySelector('h1');
    if (h1) {
      h1.childNodes.forEach(function (node) {
        if (node.nodeType === 3) { // TEXT_NODE
          node.textContent = replaceYear(node.textContent);
        }
      });
    }
  }

  // ---------- Запуск ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      updateBadge();
      updateYear();
    });
  } else {
    updateBadge();
    updateYear();
  }
})();
