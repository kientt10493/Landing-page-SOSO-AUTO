// =========================================================
// SOSO AUTO - PRODUCTION APP CLIENT LOGIC
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. FLASH SALE COUNTDOWN TIMER
  function initCountdown() {
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (!hoursEl || !minsEl || !secsEl) return;

    function update() {
      const now = new Date();
      // Target midnight tonight
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      let diff = Math.floor((midnight - now) / 1000);
      if (diff < 0) diff = 86400;

      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;

      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  initCountdown();

  // 2. PACKAGE SELECTION & DYNAMIC FORM SYNC
  const packageCards = document.querySelectorAll('.package-card');
  const mainPackageSelect = document.getElementById('order-package');
  const sheetPackageRadios = document.querySelectorAll('input[name="mobile-pkg"]');

  function syncPackageState(pkgVal) {
    // Update package cards visual highlight
    packageCards.forEach(card => {
      if (card.dataset.package === pkgVal) {
        card.classList.add('selected', 'border-blue-500', 'ring-2', 'ring-blue-500');
      } else {
        card.classList.remove('selected', 'border-blue-500', 'ring-2', 'ring-blue-500');
      }
    });

    // Update main select
    if (mainPackageSelect && mainPackageSelect.value !== pkgVal) {
      mainPackageSelect.value = pkgVal;
    }

    // Update sheet radios
    sheetPackageRadios.forEach(radio => {
      if (radio.value === pkgVal) {
        radio.checked = true;
      }
    });
  }

  packageCards.forEach(card => {
    card.addEventListener('click', () => {
      const pkgVal = card.dataset.package;
      if (pkgVal) syncPackageState(pkgVal);
    });
  });

  if (mainPackageSelect) {
    mainPackageSelect.addEventListener('change', (e) => {
      syncPackageState(e.target.value);
    });
  }

  sheetPackageRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      syncPackageState(e.target.value);
    });
  });

  // 3. SUPPORTED CAR BRANDS FILTER
  const carTabs = document.querySelectorAll('.car-tab-btn');
  const carItems = document.querySelectorAll('.car-item');

  carTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      carTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const brand = tab.dataset.brand;
      carItems.forEach(item => {
        if (brand === 'all' || item.dataset.brand === brand) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. ORDER CONFIRMATION MODAL & SUBMISSION HELPER
  const orderSuccessModal = document.getElementById('order-success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const summaryDetails = document.getElementById('modal-summary-details');
  const modalZaloLink = document.getElementById('modal-zalo-link');

  function handleOrderSuccess({ name, phone, car, address, pkg, note }) {
    let pkgTitle = 'Bộ Full 4 Rèm (1.220.000đ - Freeship Toàn Quốc)';
    if (pkg === 'front') pkgTitle = 'Cặp 2 Rèm Trước (629.000đ)';
    if (pkg === 'rear') pkgTitle = 'Cặp 2 Rèm Sau (669.000đ)';

    // Save to local storage for backup
    try {
      const orders = JSON.parse(localStorage.getItem('soso_orders') || '[]');
      orders.push({ name, phone, car, address, pkg: pkgTitle, note: note || '', time: new Date().toISOString() });
      localStorage.setItem('soso_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage quota or error:', e);
    }

    // Populate modal summary
    if (summaryDetails) {
      summaryDetails.innerHTML = `
        <div class="bg-slate-900/90 p-4 rounded-xl text-left space-y-2 border border-slate-700/80 text-xs sm:text-sm">
          <p class="flex justify-between"><span class="text-slate-400">Khách hàng:</span> <strong class="text-white">${name}</strong></p>
          <p class="flex justify-between"><span class="text-slate-400">Số điện thoại:</span> <strong class="text-blue-400">${phone}</strong></p>
          <p class="flex justify-between"><span class="text-slate-400">Dòng xe:</span> <strong class="text-amber-400">${car}</strong></p>
          <p class="flex justify-between"><span class="text-slate-400">Gói đặt:</span> <strong class="text-emerald-400">${pkgTitle}</strong></p>
          <p class="flex justify-between"><span class="text-slate-400">Địa chỉ nhận:</span> <strong class="text-slate-200">${address}</strong></p>
          ${note ? `<p class="border-t border-slate-800 pt-1.5"><span class="text-slate-400">Ghi chú:</span> <span class="text-slate-300">${note}</span></p>` : ''}
        </div>
      `;
    }

    // Pre-fill direct Zalo confirmation button
    if (modalZaloLink) {
      const msg = encodeURIComponent(`Chào SOSO AUTO, tôi vừa đặt đơn: ${name} (${phone}), xe ${car}, gói ${pkgTitle}, địa chỉ ${address}. Vui lòng xác nhận cho tôi.`);
      modalZaloLink.href = `https://zalo.me/0967103928?text=${msg}`;
    }

    if (orderSuccessModal) {
      orderSuccessModal.classList.remove('hidden');
      orderSuccessModal.classList.add('flex');
    }
  }

  function hideModal() {
    if (orderSuccessModal) {
      orderSuccessModal.classList.add('hidden');
      orderSuccessModal.classList.remove('flex');
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
  if (orderSuccessModal) {
    orderSuccessModal.addEventListener('click', (e) => {
      if (e.target === orderSuccessModal) hideModal();
    });
  }

  // 5. MAIN FORM SUBMISSION
  const mainOrderForm = document.getElementById('soso-order-form');
  if (mainOrderForm) {
    mainOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('customer-name').value.trim();
      const phone = document.getElementById('customer-phone').value.trim();
      const car = document.getElementById('customer-car').value.trim();
      const address = document.getElementById('customer-address').value.trim();
      const pkg = document.getElementById('order-package').value;
      const note = document.getElementById('customer-note') ? document.getElementById('customer-note').value.trim() : '';

      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        alert('Vui lòng kiểm tra lại số điện thoại (10 chữ số, ví dụ 0912345678)!');
        document.getElementById('customer-phone').focus();
        return;
      }

      if (!name || !car || !address) {
        alert('Vui lòng điền đầy đủ các thông tin bắt buộc (*)!');
        return;
      }

      handleOrderSuccess({ name, phone, car, address, pkg, note });
      mainOrderForm.reset();
    });
  }

  // 6. MOBILE DRAWER SIDEBAR
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  function openMobileDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      drawerBackdrop.classList.remove('hidden');
      mobileDrawer.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.add('translate-x-full');
      drawerBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeMobileDrawer));

  // 7. MOBILE QUICK ORDER BOTTOM SHEET
  const quickOrderBtns = document.querySelectorAll('.open-quick-order-btn');
  const quickOrderSheet = document.getElementById('quick-order-sheet');
  const sheetBackdrop = document.getElementById('quick-order-backdrop');
  const closeSheetBtn = document.getElementById('close-sheet-btn');
  const mobileSheetForm = document.getElementById('mobile-sheet-form');

  function openQuickOrderSheet() {
    if (quickOrderSheet && sheetBackdrop) {
      sheetBackdrop.classList.add('active');
      quickOrderSheet.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Sync package selection from current state
      const currentPkg = mainPackageSelect ? mainPackageSelect.value : 'full';
      syncPackageState(currentPkg);
    }
  }

  function closeQuickOrderSheet() {
    if (quickOrderSheet && sheetBackdrop) {
      sheetBackdrop.classList.remove('active');
      quickOrderSheet.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  quickOrderBtns.forEach(btn => btn.addEventListener('click', openQuickOrderSheet));
  if (closeSheetBtn) closeSheetBtn.addEventListener('click', closeQuickOrderSheet);
  if (sheetBackdrop) sheetBackdrop.addEventListener('click', closeQuickOrderSheet);

  if (mobileSheetForm) {
    mobileSheetForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('sheet-name').value.trim();
      const phone = document.getElementById('sheet-phone').value.trim();
      const car = document.getElementById('sheet-car').value.trim();
      const address = document.getElementById('sheet-address').value.trim();
      const selectedPkgInput = document.querySelector('input[name="mobile-pkg"]:checked');
      const pkg = selectedPkgInput ? selectedPkgInput.value : 'full';

      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        alert('Vui lòng kiểm tra lại số điện thoại (10 chữ số)!');
        document.getElementById('sheet-phone').focus();
        return;
      }

      if (!name || !car || !address) {
        alert('Vui lòng nhập đầy đủ họ tên, dòng xe và địa chỉ!');
        return;
      }

      closeQuickOrderSheet();
      handleOrderSuccess({ name, phone, car, address, pkg, note: '' });
      mobileSheetForm.reset();
    });
  }

  // Escape key handler for drawer & sheet & modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileDrawer();
      closeQuickOrderSheet();
      hideModal();
    }
  });

  // 8. SOCIAL PROOF RECENT PURCHASE TOAST NOTIFICATION
  const notifications = [
    { name: 'Anh Minh', city: 'Hà Nội', car: 'Mazda CX-5 2024', pkg: 'Combo Full 4 rèm' },
    { name: 'Anh Hoàng', city: 'TP.HCM', car: 'Toyota Cross 2023', pkg: 'Combo Full 4 rèm' },
    { name: 'Chị Lan', city: 'Đà Nẵng', car: 'VinFast VF8', pkg: 'Combo Full 4 rèm' },
    { name: 'Anh Dũng', city: 'Bình Dương', car: 'Ford Everest 2024', pkg: 'Combo Full 4 rèm' },
    { name: 'Anh Tuấn', city: 'Hải Phòng', car: 'Hyundai SantaFe 2023', pkg: 'Cặp 2 rèm trước' },
    { name: 'Anh Quang', city: 'Cần Thơ', car: 'Honda CR-V 2024', pkg: 'Combo Full 4 rèm' },
    { name: 'Bác Hùng', city: 'Quảng Ninh', car: 'Toyota Fortuner', pkg: 'Combo Full 4 rèm' },
    { name: 'Anh Huy', city: 'Nghệ An', car: 'Kia Seltos 2023', pkg: 'Combo Full 4 rèm' },
    { name: 'Anh Trọng', city: 'Đồng Nai', car: 'Mitsubishi Xpander', pkg: 'Combo Full 4 rèm' }
  ];

  const toast = document.getElementById('purchase-toast');
  const toastMessage = document.getElementById('toast-message');

  function triggerSocialProofToast() {
    if (!toast || !toastMessage) return;
    const item = notifications[Math.floor(Math.random() * notifications.length)];
    toastMessage.innerHTML = `<strong>${item.name}</strong> (${item.city}) vừa đặt <strong>${item.pkg}</strong> cho xe <em>${item.car}</em>`;
    
    // Slide in
    toast.classList.remove('translate-y-28', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    // Slide out after 4.5 seconds
    setTimeout(() => {
      toast.classList.add('translate-y-28', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 4500);
  }

  // Initial delay then recurring loop
  setTimeout(triggerSocialProofToast, 3500);
  setInterval(triggerSocialProofToast, 14000);

  // 9. HERO VIDEO AUDIO / PLAY CONTROLS
  const heroVideo = document.getElementById('hero-video');
  const heroSoundToggle = document.getElementById('hero-sound-toggle');
  if (heroVideo && heroSoundToggle) {
    heroSoundToggle.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      const icon = heroSoundToggle.querySelector('i');
      if (icon) {
        if (heroVideo.muted) {
          icon.className = 'ph ph-speaker-slash text-base';
          heroSoundToggle.setAttribute('title', 'Bật âm thanh');
        } else {
          icon.className = 'ph ph-speaker-high text-base text-amber-400';
          heroSoundToggle.setAttribute('title', 'Tắt âm thanh');
        }
      }
    });
  }

});
