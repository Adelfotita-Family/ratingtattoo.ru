// ===== FILTERS, SEARCH, SORT for homepage =====
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('salonsGrid');
  if (!grid) return; // Not homepage

  const cards = Array.from(grid.querySelectorAll('.salon-card'));
  const noResults = document.getElementById('noResults');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let activeDistrict = 'all';
  let activeStyle = '';

  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    let visible = cards.filter(function (card) {
      const name = card.dataset.name;
      const district = card.dataset.district;
      const styles = card.dataset.styles;
      const matchSearch = !query || name.includes(query);
      const matchDistrict = activeDistrict === 'all' || district === activeDistrict;
      const matchStyle = !activeStyle || styles.includes(activeStyle);
      return matchSearch && matchDistrict && matchStyle;
    });

    // Sort
    const sort = sortSelect.value;
    if (sort === 'price-asc') visible.sort(function (a, b) { return +a.dataset.price - +b.dataset.price; });
    else if (sort === 'price-desc') visible.sort(function (a, b) { return +b.dataset.price - +a.dataset.price; });
    else if (sort === 'reviews') visible.sort(function (a, b) { return +b.dataset.rating - +a.dataset.rating; });
    else visible.sort(function (a, b) { return +a.dataset.rank - +b.dataset.rank; });

    cards.forEach(function (c) { c.style.display = 'none'; });
    visible.forEach(function (c) { c.style.display = ''; grid.appendChild(c); });

    if (noResults) {
      noResults.classList.toggle('show', visible.length === 0);
    }
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.dataset.filter !== undefined) {
        activeDistrict = btn.dataset.filter || 'all';
        activeStyle = '';
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      }
      if (btn.dataset.style !== undefined) {
        activeStyle = activeStyle === btn.dataset.style ? '' : btn.dataset.style;
        activeDistrict = 'all';
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        if (activeStyle) {
          btn.classList.add('active');
        } else {
          var allBtn = document.querySelector('[data-filter="all"]');
          if (allBtn) allBtn.classList.add('active');
        }
      }
      applyFilters();
    });
  });

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);
});

// ===== FAQ Accordion =====
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function (fi) { fi.classList.remove('open'); });
      // Toggle
      if (!isOpen) item.classList.add('open');
    });
  });
});
