// SOSO AUTO Interactive App Logic
document.addEventListener('DOMContentLoaded', () => {

  // 1. Flash Sale Countdown Timer (24h loop)
  function initCountdown() {
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (!hoursEl || !minsEl || !secsEl) return;

    function update() {
      const now = new Date();
      // Calculate remaining seconds until end of current day
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

  // 2. Package Selector Synced with Order Form
  const packageCards = document.querySelectorAll('.package-card');
  const packageSelect = document.getElementById('order-package');

  packageCards.forEach(card => {
    card.addEventListener('click', () => {
      packageCards.forEach(c => c.classList.remove('border-blue-500', 'bg-blue-950/30', 'ring-2', 'ring-blue-500'));
      card.classList.add('border-blue-500', 'bg-blue-950/30', 'ring-2', 'ring-blue-500');

      const pkgVal = card.dataset.package;
      if (packageSelect) {
        packageSelect.value = pkgVal;
      }
    });
  });

  if (packageSelect) {
    packageSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      packageCards.forEach(card => {
        if (card.dataset.package === val) {
          packageCards.forEach(c => c.classList.remove('border-blue-500', 'bg-blue-950/30', 'ring-2', 'ring-blue-500'));
          card.classList.add('border-blue-500', 'bg-blue-950/30', 'ring-2', 'ring-blue-500');
        }
      });
    });
  }

  // 3. Supported Car Brands Filter
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

  // 4. Order Form Submission & Confirmation Modal
  const orderForm = document.getElementById('soso-order-form');
  const modal = document.getElementById('order-success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const summaryDetails = document.getElementById('modal-summary-details');

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('customer-name').value.trim();
      const phone = document.getElementById('customer-phone').value.trim();
      const car = document.getElementById('customer-car').value.trim();
      const address = document.getElementById('customer-address').value.trim();
      const pkg = document.getElementById('order-package').value;
      const note = document.getElementById('customer-note').value.trim();

      // Simple phone validation
      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!phoneRegex.test(phone)) {
        alert('Vui lòng nhập số điện thoại hợp lệ (10 số)!');
        document.getElementById('customer-phone').focus();
        return;
      }

      if (!name || !car || !address) {
        alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
        return;
      }

      // Format package display
      let pkgText = 'Bộ Full 4 Rèm (1.220.000đ - Freeship)';
      if (pkg === 'front') pkgText = 'Cặp 2 Rèm Cửa Trước (629.000đ)';
      if (pkg === 'rear') pkgText = 'Cặp 2 Rèm Cửa Sau (669.000đ)';

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('soso_orders') || '[]');
      orders.push({ name, phone, car, address, pkg: pkgText, note, time: new Date().toISOString() });
      localStorage.setItem('soso_orders', JSON.stringify(orders));

      // Display Modal Summary
      if (summaryDetails) {
        summaryDetails.innerHTML = `
          <div class="bg-slate-900 p-4 rounded-xl text-left space-y-2 border border-slate-700 text-sm">
            <p><span class="text-slate-400">Khách hàng:</span> <strong class="text-white">${name}</strong></p>
            <p><span class="text-slate-400">Số điện thoại:</span> <strong class="text-blue-400">${phone}</strong></p>
            <p><span class="text-slate-400">Dòng xe & Đời xe:</span> <strong class="text-amber-400">${car}</strong></p>
            <p><span class="text-slate-400">Gói chọn:</span> <strong class="text-green-400">${pkgText}</strong></p>
            <p><span class="text-slate-400">Địa chỉ:</span> <strong class="text-slate-200">${address}</strong></p>
            ${note ? `<p><span class="text-slate-400">Ghi chú:</span> <span class="text-slate-300">${note}</span></p>` : ''}
          </div>
        `;
      }

      // Update Zalo CTA inside modal
      const zaloDirect = document.getElementById('modal-zalo-link');
      if (zaloDirect) {
        const msg = encodeURIComponent(`Chào SOSO AUTO, tôi là ${name} (${phone}), muốn đặt ${pkgText} cho xe ${car}. Địa chỉ: ${address}.`);
        zaloDirect.href = `https://zalo.me/0967103928?text=${msg}`;
      }

      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }

      orderForm.reset();
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  // 5. Recent Purchase Notification Simulation (Social Proof Boost)
  const notifications = [
    { name: 'Anh Minh', city: 'Hà Nội', car: 'Mazda CX-5 2024', pkg: 'Combo 4 rèm' },
    { name: 'Anh Hoàng', city: 'TP.HCM', car: 'Toyota Cross 2023', pkg: 'Combo 4 rèm' },
    { name: 'Chị Lan', city: 'Đà Nẵng', car: 'VinFast VF8', pkg: 'Combo 4 rèm' },
    { name: 'Anh Dũng', city: 'Bình Dương', car: 'Ford Everest 2024', pkg: 'Combo 4 rèm' },
    { name: 'Anh Tuấn', city: 'Hải Phòng', car: 'Hyundai SantaFe 2023', pkg: 'Cặp cửa trước' },
    { name: 'Anh Quang', city: 'Cần Thơ', car: 'Honda CR-V 2024', pkg: 'Combo 4 rèm' },
    { name: 'Bác Hùng', city: 'Quảng Ninh', car: 'Toyota Fortuner', pkg: 'Combo 4 rèm' }
  ];

  const toast = document.getElementById('purchase-toast');
  const toastText = document.getElementById('toast-message');

  function showToast() {
    if (!toast || !toastText) return;
    const item = notifications[Math.floor(Math.random() * notifications.length)];
    toastText.innerHTML = `<strong>${item.name}</strong> (${item.city}) vừa đặt thành công <strong>${item.pkg}</strong> cho xe <em>${item.car}</em>`;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 4500);
  }

  // 6. Mobile Drawer Sidebar Toggle
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

  // 7. Mobile Quick Order Bottom Sheet
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

  // 8. Mobile Bottom Sheet Form Submission
  if (mobileSheetForm) {
    mobileSheetForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('sheet-name').value.trim();
      const phone = document.getElementById('sheet-phone').value.trim();
      const car = document.getElementById('sheet-car').value.trim();
      const address = document.getElementById('sheet-address').value.trim();
      const selectedPkgInput = document.querySelector('input[name="mobile-pkg"]:checked');
      const pkgVal = selectedPkgInput ? selectedPkgInput.value : 'full';

      // Phone check
      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!phoneRegex.test(phone)) {
        alert('Vui lòng nhập số điện thoại hợp lệ (10 số)!');
        document.getElementById('sheet-phone').focus();
        return;
      }

      if (!name || !car || !address) {
        alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
        return;
      }

      let pkgText = 'Bộ Full 4 Rèm (1.220.000đ - Freeship)';
      if (pkgVal === 'front') pkgText = 'Cặp 2 Rèm Cửa Trước (629.000đ)';
      if (pkgVal === 'rear') pkgText = 'Cặp 2 Rèm Cửa Sau (669.000đ)';

      // Save order
      const orders = JSON.parse(localStorage.getItem('soso_orders') || '[]');
      orders.push({ name, phone, car, address, pkg: pkgText, time: new Date().toISOString() });
      localStorage.setItem('soso_orders', JSON.stringify(orders));

      // Close bottom sheet
      closeQuickOrderSheet();

      // Show Confirmation Modal
      if (summaryDetails) {
        summaryDetails.innerHTML = `
          <div class="bg-slate-900 p-4 rounded-xl text-left space-y-2 border border-slate-700 text-sm">
            <p><span class="text-slate-400">Khách hàng:</span> <strong class="text-white">${name}</strong></p>
            <p><span class="text-slate-400">Số điện thoại:</span> <strong class="text-blue-400">${phone}</strong></p>
            <p><span class="text-slate-400">Dòng xe & Đời xe:</span> <strong class="text-amber-400">${car}</strong></p>
            <p><span class="text-slate-400">Gói chọn:</span> <strong class="text-green-400">${pkgText}</strong></p>
            <p><span class="text-slate-400">Địa chỉ:</span> <strong class="text-slate-200">${address}</strong></p>
          </div>
        `;
      }

      const zaloDirect = document.getElementById('modal-zalo-link');
      if (zaloDirect) {
        const msg = encodeURIComponent(`Chào SOSO AUTO, tôi là ${name} (${phone}), muốn đặt ${pkgText} cho xe ${car}. Địa chỉ: ${address}.`);
        zaloDirect.href = `https://zalo.me/0967103928?text=${msg}`;
      }

      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }

      mobileSheetForm.reset();
    });
  }

});

