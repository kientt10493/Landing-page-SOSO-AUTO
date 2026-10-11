// =========================================================
// SOSO AUTO LANDING PAGE - DEDICATED VISUAL & MEDIA EDITOR
// =========================================================

(function() {
  const CONFIG_KEY = 'soso_landing_editor_config';

  // Default configuration
  const defaultConfig = {
    brandName: 'SOSO.AUTO',
    brandSub: 'Phụ Kiện Ô Tô Thông Minh',
    hotline: '0967.103.928',
    zalo: '0967103928',
    flashSaleText: 'Ưu đãi hôm nay: Miễn phí vận chuyển toàn quốc cho Bộ Full 4 rèm!',
    
    // Pricing
    frontPrice: '629.000đ',
    frontOldPrice: '850.000đ',
    rearPrice: '669.000đ',
    rearOldPrice: '890.000đ',
    fullPrice: '1.220.000đ',
    fullOldPrice: '1.650.000đ',

    // Section Toggles
    sections: {
      flashSale: true,
      pains: true,
      features: true,
      videos: true,
      comparison: true,
      cars: true,
      install: true,
      pricing: true,
      feedback: true,
      order: true,
      faq: true,
      toast: true
    },

    // Media (Images & Videos)
    media: {
      'hero-video': 'assets/videos/demo-auto.mp4',
      'showcase-video-1': 'assets/videos/demo-cross.mp4',
      'showcase-video-2': 'assets/videos/demo-auto.mp4',
      'feature-img-1': 'assets/images/mechanism-lift.jpg',
      'feature-img-2': 'assets/images/uv-protection.jpg',
      'feature-img-3': 'assets/images/feature-overview.jpg',
      'feature-img-4': 'assets/images/tapli-result.jpg',
      'feature-img-5': 'assets/images/install-guide-1.jpg',
      'feedback-img-1': 'assets/images/feedback-1.jpg',
      'feedback-img-2': 'assets/images/feedback-2.jpg',
      'feedback-img-3': 'assets/images/feedback-3.jpg',
      'feedback-img-4': 'assets/images/feedback-4.jpg',
      'feedback-img-5': 'assets/images/feedback-5.jpg',
      'feedback-img-6': 'assets/images/feedback-shopee.jpg'
    },

    // Theme Colors
    primaryColor: '#2563EB',
    accentColor: '#F59E0B'
  };

  // Asset Library for quick preset selection
  const ASSET_LIBRARY = {
    videos: [
      { title: 'Video 1: Nâng hạ tự động (demo-auto)', src: 'assets/videos/demo-auto.mp4' },
      { title: 'Video 2: Lắp trên Toyota Cross (demo-cross)', src: 'assets/videos/demo-cross.mp4' }
    ],
    images: [
      { title: 'Cơ chế nâng hạ', src: 'assets/images/mechanism-lift.jpg' },
      { title: 'Cản 95% UV', src: 'assets/images/uv-protection.jpg' },
      { title: 'Vát góc gương chiếu hậu', src: 'assets/images/feature-overview.jpg' },
      { title: 'Xử lý tapli uốn cong', src: 'assets/images/tapli-result.jpg' },
      { title: 'Lắp zin 100% không khoan', src: 'assets/images/install-guide-1.jpg' },
      { title: 'Hướng dẫn lắp đặt 2', src: 'assets/images/install-guide-2.jpg' },
      { title: 'So sánh vs rèm thường', src: 'assets/images/comparison-vs-regular.jpg' },
      { title: 'Bảng lợi ích so sánh', src: 'assets/images/comparison-benefits.jpg' },
      { title: 'Chi tiết nan rèm nano', src: 'assets/images/detail-mesh.jpg' },
      { title: 'Chi tiết ngàm cài', src: 'assets/images/detail-frame.jpg' },
      { title: 'Feedback 1 (CX5)', src: 'assets/images/feedback-1.jpg' },
      { title: 'Feedback 2 (Cross)', src: 'assets/images/feedback-2.jpg' },
      { title: 'Feedback 3 (Đà Nẵng)', src: 'assets/images/feedback-3.jpg' },
      { title: 'Feedback 4 (Bình Dương)', src: 'assets/images/feedback-4.jpg' },
      { title: 'Feedback 5 (Hải Phòng)', src: 'assets/images/feedback-5.jpg' },
      { title: 'Feedback Shopee 5★', src: 'assets/images/feedback-shopee.jpg' },
      { title: 'Form xe 1', src: 'assets/images/cars/car-1.jpg' },
      { title: 'Form xe 2', src: 'assets/images/cars/car-2.jpg' },
      { title: 'Form xe 3', src: 'assets/images/cars/car-3.jpg' },
      { title: 'Form xe 4', src: 'assets/images/cars/car-4.jpg' },
      { title: 'Form xe 5', src: 'assets/images/cars/car-5.jpg' },
      { title: 'Form xe 6', src: 'assets/images/cars/car-6.jpg' },
      { title: 'Form xe 7', src: 'assets/images/cars/car-7.jpg' },
      { title: 'Form xe 8', src: 'assets/images/cars/car-8.jpg' }
    ]
  };

  // Structured list of media for the sidebar tab
  const MEDIA_DEFINITIONS = [
    { id: 'hero-video', type: 'video', name: 'Video Hero (Đầu trang)', group: 'video' },
    { id: 'showcase-video-1', type: 'video', name: 'Video 1: Xe Toyota Cross', group: 'video' },
    { id: 'showcase-video-2', type: 'video', name: 'Video 2: Cơ chế nâng hạ tự động', group: 'video' },
    { id: 'feature-img-1', type: 'image', name: 'Tính năng 1: Cơ chế nâng hạ', group: 'feature' },
    { id: 'feature-img-2', type: 'image', name: 'Tính năng 2: Cản 95% tia UV', group: 'feature' },
    { id: 'feature-img-3', type: 'image', name: 'Tính năng 3: Vát góc nhìn gương', group: 'feature' },
    { id: 'feature-img-4', type: 'image', name: 'Tính năng 4: Xử lý tapli cong', group: 'feature' },
    { id: 'feature-img-5', type: 'image', name: 'Tính năng 5: Lắp zin 100%', group: 'feature' },
    { id: 'feedback-img-1', type: 'image', name: 'Feedback 1: Anh Hải (Hà Nội)', group: 'feedback' },
    { id: 'feedback-img-2', type: 'image', name: 'Feedback 2: Anh Trọng (TP.HCM)', group: 'feedback' },
    { id: 'feedback-img-3', type: 'image', name: 'Feedback 3: Bác Văn (Đà Nẵng)', group: 'feedback' },
    { id: 'feedback-img-4', type: 'image', name: 'Feedback 4: Anh Nghĩa (Bình Dương)', group: 'feedback' },
    { id: 'feedback-img-5', type: 'image', name: 'Feedback 5: Anh Phúc (Hải Phòng)', group: 'feedback' },
    { id: 'feedback-img-6', type: 'image', name: 'Feedback 6: Đánh giá sàn Shopee', group: 'feedback' }
  ];

  // Current working configuration
  let config = loadConfig();
  let isEditing = false;
  let isMobilePreview = false;
  let currentEditingMedia = { id: '', type: 'image', tempSrc: '' };

  function loadConfig() {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = Object.assign({}, defaultConfig, parsed);
        merged.sections = Object.assign({}, defaultConfig.sections, parsed.sections || {});
        merged.media = Object.assign({}, defaultConfig.media, parsed.media || {});
        return merged;
      }
    } catch(e) {
      console.warn('Could not parse saved config, using default', e);
    }
    return JSON.parse(JSON.stringify(defaultConfig));
  }

  function saveConfig() {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
      showToast('Đã lưu mọi tùy chỉnh (chữ, giá, ảnh & video) vào trình duyệt!');
    } catch(e) {
      alert('Không thể lưu: ' + e.message);
    }
  }

  function resetConfig() {
    if (confirm('Bạn có chắc chắn muốn khôi phục về toàn bộ cài đặt gốc ban đầu (kể cả ảnh và video)?')) {
      localStorage.removeItem(CONFIG_KEY);
      config = JSON.parse(JSON.stringify(defaultConfig));
      applyConfigToDOM();
      syncFormFields();
      renderMediaSidebar();
      showToast('Đã khôi phục về cài đặt gốc!');
    }
  }

  // Toast notification inside editor
  function showToast(msg) {
    let t = document.getElementById('editor-feedback-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'editor-feedback-toast';
      t.style.cssText = 'position:fixed;top:64px;left:50%;transform:translateX(-50%);background:#10B981;color:#fff;padding:8px 18px;border-radius:999px;font-size:13px;font-weight:700;z-index:99999;box-shadow:0 10px 25px rgba(0,0,0,0.4);transition:all 0.3s ease;';
      document.body.appendChild(t);
    }
    t.textContent = '✓ ' + msg;
    t.style.opacity = '1';
    t.style.display = 'block';
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.style.display = 'none', 300);
    }, 2800);
  }

  // Apply config to HTML Elements in DOM
  function applyConfigToDOM() {
    // 1. Contact & Brand
    document.querySelectorAll('[data-bind="brandName"]').forEach(el => el.textContent = config.brandName);
    document.querySelectorAll('[data-bind="brandSub"]').forEach(el => el.textContent = config.brandSub);
    document.querySelectorAll('[data-bind="hotline"]').forEach(el => el.textContent = config.hotline);
    document.querySelectorAll('[data-bind="flashSaleText"]').forEach(el => el.textContent = config.flashSaleText);

    // Update tel: links
    const cleanPhone = config.hotline.replace(/[^0-9]/g, '');
    document.querySelectorAll('a[href^="tel:"]').forEach(el => el.href = 'tel:' + cleanPhone);

    // Update Zalo links
    const cleanZalo = config.zalo.replace(/[^0-9]/g, '');
    document.querySelectorAll('a[href*="zalo.me"]').forEach(el => {
      el.href = 'https://zalo.me/' + cleanZalo;
    });

    // 2. Prices
    document.querySelectorAll('[data-bind="frontPrice"]').forEach(el => el.textContent = config.frontPrice);
    document.querySelectorAll('[data-bind="frontOldPrice"]').forEach(el => el.textContent = config.frontOldPrice);
    document.querySelectorAll('[data-bind="rearPrice"]').forEach(el => el.textContent = config.rearPrice);
    document.querySelectorAll('[data-bind="rearOldPrice"]').forEach(el => el.textContent = config.rearOldPrice);
    document.querySelectorAll('[data-bind="fullPrice"]').forEach(el => el.textContent = config.fullPrice);
    document.querySelectorAll('[data-bind="fullOldPrice"]').forEach(el => el.textContent = config.fullOldPrice);

    // Update select options in order form
    const pkgSelect = document.getElementById('order-package');
    if (pkgSelect) {
      const optFull = pkgSelect.querySelector('option[value="full"]');
      if (optFull) optFull.textContent = `Bộ Full 4 Rèm (${config.fullPrice}) - Freeship + Giảm 10% bộ sau`;
      const optFront = pkgSelect.querySelector('option[value="front"]');
      if (optFront) optFront.textContent = `Cặp 2 Rèm Cửa Trước (${config.frontPrice})`;
      const optRear = pkgSelect.querySelector('option[value="rear"]');
      if (optRear) optRear.textContent = `Cặp 2 Rèm Cửa Sau (${config.rearPrice})`;
    }

    // 3. Sections Visibility
    toggleSection('flash-sale-bar', config.sections.flashSale);
    toggleSection('pain-section', config.sections.pains);
    toggleSection('tinh-nang', config.sections.features);
    toggleSection('video-thuc-te', config.sections.videos);
    toggleSection('comparison-section', config.sections.comparison);
    toggleSection('dong-xe', config.sections.cars);
    toggleSection('install-section', config.sections.install);
    toggleSection('bang-gia', config.sections.pricing);
    toggleSection('feedback', config.sections.feedback);
    toggleSection('dat-hang', config.sections.order);
    toggleSection('faq-section', config.sections.faq);
    
    const toastEl = document.getElementById('purchase-toast');
    if (toastEl) {
      toastEl.style.display = config.sections.toast ? '' : 'none';
    }

    // 4. Media (Images & Videos)
    if (config.media) {
      for (const [mediaId, src] of Object.entries(config.media)) {
        if (!src) continue;
        const mediaEl = document.querySelector(`[data-media-id="${mediaId}"]`);
        if (mediaEl) {
          if (mediaEl.tagName === 'VIDEO') {
            const currentSrc = mediaEl.getAttribute('src');
            if (currentSrc !== src) {
              mediaEl.setAttribute('src', src);
              mediaEl.load();
            }
          } else if (mediaEl.tagName === 'IMG') {
            if (mediaEl.getAttribute('src') !== src) {
              mediaEl.setAttribute('src', src);
            }
          }
        }
      }
    }

    // 5. Colors
    document.documentElement.style.setProperty('--primary', config.primaryColor);
    document.documentElement.style.setProperty('--accent', config.accentColor);
  }

  function toggleSection(id, isVisible) {
    const el = document.getElementById(id);
    if (!el) return;
    if (isEditing) {
      if (isVisible) {
        el.style.display = '';
        el.classList.remove('section-disabled-in-editor');
      } else {
        el.style.display = '';
        el.classList.add('section-disabled-in-editor');
      }
    } else {
      el.style.display = isVisible ? '' : 'none';
      el.classList.remove('section-disabled-in-editor');
    }
  }

  // Toggle Edit Mode ON/OFF
  function setEditMode(enable) {
    isEditing = enable;
    const topBar = document.getElementById('editor-top-bar');
    const triggerBtn = document.getElementById('editor-trigger-btn');

    if (enable) {
      document.body.classList.add('editor-mode-active');
      if (topBar) topBar.classList.add('active');
      if (triggerBtn) triggerBtn.style.display = 'none';

      // Make all data-editable items editable
      document.querySelectorAll('[data-editable="true"]').forEach(el => {
        el.contentEditable = 'true';
      });

      applyConfigToDOM();
      renderMediaSidebar();
      showToast('Đã kích hoạt chế độ chỉnh sửa! Bấm vào chữ để sửa văn bản, hoặc bấm "Đổi ảnh/video" trên từng mục.');
    } else {
      document.body.classList.remove('editor-mode-active');
      if (topBar) topBar.classList.remove('active');
      if (triggerBtn) triggerBtn.style.display = '';

      // Disable contentEditable
      document.querySelectorAll('[data-editable="true"]').forEach(el => {
        el.contentEditable = 'false';
      });

      closeSidebar();
      closeMediaModal();
      applyConfigToDOM();
    }
  }

  // Sync Inline Edits back to Config State
  function setupInlineEditingListeners() {
    document.querySelectorAll('[data-editable="true"]').forEach(el => {
      el.addEventListener('blur', () => {
        if (!isEditing) return;
        const bindKey = el.dataset.bind;
        if (bindKey && config.hasOwnProperty(bindKey)) {
          config[bindKey] = el.textContent.trim();
          syncFormFields();
        }
      });
    });
  }

  // Media Editing Setup (Modal & Badges)
  function setupMediaEditingListeners() {
    // Attach click handler to all media elements with data-media-id
    document.querySelectorAll('[data-media-id]').forEach(el => {
      const mediaId = el.getAttribute('data-media-id');
      const isVideo = el.tagName === 'VIDEO';

      // Ensure parent container has relative positioning
      const parent = el.parentElement;
      if (parent) {
        parent.classList.add('editor-media-wrapper');

        // Check if badge already exists
        let badge = parent.querySelector(`.editor-media-badge[data-target-media="${mediaId}"]`);
        if (!badge) {
          badge = document.createElement('button');
          badge.type = 'button';
          badge.className = 'editor-media-badge';
          badge.setAttribute('data-target-media', mediaId);
          badge.innerHTML = `
            <i class="ph ${isVideo ? 'ph-film-strip' : 'ph-camera'} text-amber-400"></i>
            <span>${isVideo ? 'Đổi video' : 'Đổi ảnh'}</span>
          `;
          badge.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openMediaModal(mediaId, isVideo ? 'video' : 'image');
          });
          parent.appendChild(badge);
        }
      }

      // Direct click on the image/video when in edit mode
      el.addEventListener('click', (e) => {
        if (!isEditing) return;
        e.preventDefault();
        e.stopPropagation();
        openMediaModal(mediaId, isVideo ? 'video' : 'image');
      });
    });
  }

  // Open Media Modal Dialog
  function openMediaModal(mediaId, mediaType) {
    currentEditingMedia.id = mediaId;
    currentEditingMedia.type = mediaType;
    
    // Find current src from config or DOM
    let currentSrc = (config.media && config.media[mediaId]) || '';
    if (!currentSrc) {
      const el = document.querySelector(`[data-media-id="${mediaId}"]`);
      if (el) currentSrc = el.getAttribute('src') || '';
    }
    currentEditingMedia.tempSrc = currentSrc;

    const modalBackdrop = document.getElementById('editor-media-modal-backdrop');
    const modalTitle = document.getElementById('media-modal-title');
    const modalSubtitle = document.getElementById('media-modal-subtitle');
    const modalIcon = document.getElementById('media-modal-icon');
    const urlInput = document.getElementById('media-modal-url-input');
    const fileLabel = document.getElementById('media-modal-file-label');

    // Title & Icon
    const def = MEDIA_DEFINITIONS.find(m => m.id === mediaId);
    const mediaName = def ? def.name : mediaId;

    if (modalTitle) modalTitle.textContent = mediaType === 'video' ? 'Thay Đổi Video' : 'Thay Đổi Hình Ảnh';
    if (modalSubtitle) modalSubtitle.textContent = `Đang chỉnh sửa: ${mediaName}`;
    if (modalIcon) modalIcon.className = mediaType === 'video' ? 'ph ph-film-strip text-xl text-red-400' : 'ph ph-image text-xl text-blue-400';
    if (urlInput) urlInput.value = currentSrc;
    if (fileLabel) fileLabel.textContent = mediaType === 'video' ? 'Chọn file video (MP4, WebM) từ máy tính' : 'Chọn file ảnh (JPG, PNG, WebP) từ máy tính';

    // Update Live Preview inside modal
    updateModalPreview(currentSrc, mediaType);

    // Render Presets Grid
    renderModalPresets(mediaType);

    if (modalBackdrop) modalBackdrop.classList.add('active');
  }

  function closeMediaModal() {
    const modalBackdrop = document.getElementById('editor-media-modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('active');
    
    // Reset file input
    const fileInput = document.getElementById('media-modal-file-input');
    if (fileInput) fileInput.value = '';
  }

  function updateModalPreview(src, type) {
    const previewBox = document.getElementById('media-modal-preview-box');
    if (!previewBox) return;

    if (!src) {
      previewBox.innerHTML = '<div class="text-xs text-slate-500">Chưa có tệp nào được chọn</div>';
      return;
    }

    if (type === 'video') {
      previewBox.innerHTML = `
        <video src="${src}" controls autoplay muted loop playsinline class="w-full h-full object-cover rounded-xl"></video>
      `;
    } else {
      previewBox.innerHTML = `
        <img src="${src}" alt="Xem trước" class="w-full h-full object-contain rounded-xl">
      `;
    }
  }

  function renderModalPresets(type) {
    const grid = document.getElementById('media-modal-presets-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const items = type === 'video' ? ASSET_LIBRARY.videos : ASSET_LIBRARY.images;

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'editor-preset-item' + (currentEditingMedia.tempSrc === item.src ? ' selected' : '');
      div.title = item.title;

      if (type === 'video') {
        div.innerHTML = `
          <div class="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-slate-900 text-xs">
            <i class="ph ph-video-camera text-xl text-blue-400 mb-1"></i>
            <span class="text-[10px] text-slate-300 font-semibold line-clamp-2">${item.title}</span>
          </div>
        `;
      } else {
        div.innerHTML = `
          <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover">
          <div class="absolute inset-x-0 bottom-0 bg-black/75 p-1 text-[9px] text-white truncate text-center">${item.title}</div>
        `;
      }

      div.addEventListener('click', () => {
        currentEditingMedia.tempSrc = item.src;
        const urlInput = document.getElementById('media-modal-url-input');
        if (urlInput) urlInput.value = item.src;
        updateModalPreview(item.src, type);

        grid.querySelectorAll('.editor-preset-item').forEach(el => el.classList.remove('selected'));
        div.classList.add('selected');
      });

      grid.appendChild(div);
    });
  }

  // Save changes from Media Modal
  function saveMediaModal() {
    const urlInput = document.getElementById('media-modal-url-input');
    const finalSrc = (urlInput && urlInput.value.trim()) || currentEditingMedia.tempSrc;

    if (!finalSrc) {
      alert('Vui lòng chọn hoặc nhập đường dẫn ảnh/video!');
      return;
    }

    if (!config.media) config.media = {};
    config.media[currentEditingMedia.id] = finalSrc;

    // Apply directly to DOM element
    const mediaEl = document.querySelector(`[data-media-id="${currentEditingMedia.id}"]`);
    if (mediaEl) {
      if (mediaEl.tagName === 'VIDEO') {
        mediaEl.setAttribute('src', finalSrc);
        mediaEl.load();
      } else if (mediaEl.tagName === 'IMG') {
        mediaEl.setAttribute('src', finalSrc);
      }
    }

    saveConfig();
    renderMediaSidebar();
    closeMediaModal();
    showToast('Đã cập nhật media thành công!');
  }

  // Render list inside the Sidebar "Ảnh & Video" Tab
  function renderMediaSidebar() {
    const videoContainer = document.getElementById('sidebar-video-list');
    const featureContainer = document.getElementById('sidebar-features-list');
    const feedbackContainer = document.getElementById('sidebar-feedbacks-list');

    if (!videoContainer || !featureContainer || !feedbackContainer) return;

    videoContainer.innerHTML = '';
    featureContainer.innerHTML = '';
    feedbackContainer.innerHTML = '';

    MEDIA_DEFINITIONS.forEach(def => {
      const currentSrc = (config.media && config.media[def.id]) || '';
      const isVideo = def.type === 'video';

      const item = document.createElement('div');
      item.className = 'editor-media-list-item';
      item.innerHTML = `
        <div class="flex items-center gap-2.5 overflow-hidden">
          <div class="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
            ${isVideo 
              ? '<i class="ph ph-video-camera text-lg text-red-400"></i>' 
              : `<img src="${currentSrc}" alt="${def.name}" class="w-full h-full object-cover">`}
          </div>
          <div class="truncate">
            <h4 class="text-xs font-bold text-white truncate">${def.name}</h4>
            <p class="text-[10px] text-slate-400 truncate">${currentSrc}</p>
          </div>
        </div>
        <button type="button" class="btn-change-media shrink-0 px-2.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold transition-all border border-blue-500/30 flex items-center gap-1">
          <i class="ph ph-pencil-simple"></i>
          <span>Đổi</span>
        </button>
      `;

      item.querySelector('.btn-change-media').addEventListener('click', () => {
        openMediaModal(def.id, isVideo ? 'video' : 'image');
      });

      if (def.group === 'video') {
        videoContainer.appendChild(item);
      } else if (def.group === 'feature') {
        featureContainer.appendChild(item);
      } else if (def.group === 'feedback') {
        feedbackContainer.appendChild(item);
      }
    });
  }

  // Build and Inject Editor UI into the Page
  function injectEditorUI() {
    // 1. Floating Trigger Button
    const trigger = document.createElement('button');
    trigger.id = 'editor-trigger-btn';
    trigger.innerHTML = `
      <i class="ph ph-pencil-simple-line text-amber-400 text-lg"></i>
      <span>Chỉnh sửa trang</span>
    `;
    trigger.addEventListener('click', () => setEditMode(true));
    document.body.appendChild(trigger);

    // 2. Top Control Bar
    const topBar = document.createElement('div');
    topBar.id = 'editor-top-bar';
    topBar.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="flex items-center gap-2 text-xs font-black uppercase text-amber-400 tracking-wider">
          <i class="ph ph-paint-brush-broad text-base"></i>
          <span>Chế độ chỉnh sửa</span>
        </span>
        <span class="hidden sm:inline text-xs text-slate-400">| Bấm vào chữ để sửa, bấm nút trên ảnh/video để thay tệp</span>
      </div>

      <!-- Preview Switcher -->
      <div class="flex items-center gap-1 bg-slate-900 border border-slate-700 p-1 rounded-xl text-xs">
        <button id="preview-desktop-btn" class="px-2.5 py-1 rounded-lg font-bold text-white bg-blue-600 transition-all flex items-center gap-1.5">
          <i class="ph ph-desktop"></i>
          <span class="hidden sm:inline">Máy tính</span>
        </button>
        <button id="preview-mobile-btn" class="px-2.5 py-1 rounded-lg font-bold text-slate-400 hover:text-white transition-all flex items-center gap-1.5">
          <i class="ph ph-device-mobile"></i>
          <span class="hidden sm:inline">Điện thoại</span>
        </button>
      </div>

      <!-- Action buttons -->
      <div class="flex items-center gap-2">
        <button id="open-sidebar-btn" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold flex items-center gap-1.5 transition-all">
          <i class="ph ph-sliders text-sm text-blue-400"></i>
          <span>Tùy chỉnh</span>
        </button>
        <button id="save-config-btn" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all">
          <i class="ph ph-floppy-disk text-sm"></i>
          <span>Lưu</span>
        </button>
        <button id="export-html-btn" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all" title="Xuất file index.html mới đã sửa">
          <i class="ph ph-download-simple text-sm"></i>
          <span class="hidden sm:inline">Xuất file HTML</span>
        </button>
        <button id="exit-editor-btn" class="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-300 text-sm transition-all" title="Thoát chế độ sửa">
          <i class="ph ph-x-bold"></i>
        </button>
      </div>
    `;
    document.body.prepend(topBar);

    // 3. Editor Sidebar Drawer
    const backdrop = document.createElement('div');
    backdrop.id = 'editor-drawer-backdrop';
    document.body.appendChild(backdrop);

    const sidebar = document.createElement('aside');
    sidebar.id = 'editor-sidebar';
    sidebar.innerHTML = `
      <div class="editor-sidebar-header">
        <div class="flex items-center gap-2">
          <i class="ph ph-faders text-xl text-blue-400"></i>
          <h3 class="font-extrabold text-white text-sm">BẢNG TÙY CHỈNH LANDING PAGE</h3>
        </div>
        <button id="close-sidebar-btn" class="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
          <i class="ph ph-x text-base"></i>
        </button>
      </div>

      <!-- Navigation Tabs (5 Tabs) -->
      <div class="editor-tabs-nav">
        <button class="editor-tab-btn active" data-tab="tab-contact">Liên Hệ</button>
        <button class="editor-tab-btn" data-tab="tab-pricing">Bảng Giá</button>
        <button class="editor-tab-btn" data-tab="tab-media">Ảnh & Video</button>
        <button class="editor-tab-btn" data-tab="tab-sections">Ẩn / Hiện</button>
        <button class="editor-tab-btn" data-tab="tab-theme">Màu Sắc</button>
      </div>

      <!-- Tab 1: Contact & Brand -->
      <div id="tab-contact" class="editor-tab-content">
        <div class="editor-group">
          <div class="editor-group-title"><i class="ph ph-identification-badge text-blue-400"></i> Thương hiệu</div>
          <div class="editor-field">
            <label class="editor-label">Tên thương hiệu</label>
            <input type="text" id="cfg-brandName" class="editor-input">
          </div>
          <div class="editor-field">
            <label class="editor-label">Phụ đề thương hiệu</label>
            <input type="text" id="cfg-brandSub" class="editor-input">
          </div>
        </div>

        <div class="editor-group">
          <div class="editor-group-title"><i class="ph ph-phone-call text-emerald-400"></i> Thông tin liên hệ</div>
          <div class="editor-field">
            <label class="editor-label">Số điện thoại Hotline</label>
            <input type="text" id="cfg-hotline" class="editor-input" placeholder="0967.103.928">
          </div>
          <div class="editor-field">
            <label class="editor-label">Số điện thoại Zalo</label>
            <input type="text" id="cfg-zalo" class="editor-input" placeholder="0967103928">
          </div>
        </div>

        <div class="editor-group">
          <div class="editor-group-title"><i class="ph ph-megaphone text-amber-400"></i> Thông báo Flash Sale</div>
          <div class="editor-field">
            <label class="editor-label">Nội dung thanh thông báo</label>
            <textarea id="cfg-flashSaleText" rows="2" class="editor-input"></textarea>
          </div>
        </div>
      </div>

      <!-- Tab 2: Pricing -->
      <div id="tab-pricing" class="editor-tab-content" style="display:none;">
        <div class="editor-group">
          <div class="editor-group-title"><i class="ph ph-tag text-blue-400"></i> 1. Cặp 2 Rèm Trước</div>
          <div class="grid grid-cols-2 gap-2">
            <div class="editor-field">
              <label class="editor-label">Giá bán</label>
              <input type="text" id="cfg-frontPrice" class="editor-input">
            </div>
            <div class="editor-field">
              <label class="editor-label">Giá gốc (gạch)</label>
              <input type="text" id="cfg-frontOldPrice" class="editor-input">
            </div>
          </div>
        </div>

        <div class="editor-group">
          <div class="editor-group-title"><i class="ph ph-tag text-purple-400"></i> 2. Cặp 2 Rèm Sau</div>
          <div class="grid grid-cols-2 gap-2">
            <div class="editor-field">
              <label class="editor-label">Giá bán</label>
              <input type="text" id="cfg-rearPrice" class="editor-input">
            </div>
            <div class="editor-field">
              <label class="editor-label">Giá gốc (gạch)</label>
              <input type="text" id="cfg-rearOldPrice" class="editor-input">
            </div>
          </div>
        </div>

        <div class="editor-group border-amber-500/40 bg-amber-950/20">
          <div class="editor-group-title"><i class="ph ph-star text-amber-400"></i> 3. Combo Full 4 Rèm (Chính)</div>
          <div class="grid grid-cols-2 gap-2">
            <div class="editor-field">
              <label class="editor-label">Giá bán Combo</label>
              <input type="text" id="cfg-fullPrice" class="editor-input">
            </div>
            <div class="editor-field">
              <label class="editor-label">Giá gốc (gạch)</label>
              <input type="text" id="cfg-fullOldPrice" class="editor-input">
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 3: Media (Images & Videos) -->
      <div id="tab-media" class="editor-tab-content" style="display:none;">
        <div class="editor-group">
          <div class="editor-group-title"><i class="ph ph-video-camera text-red-400"></i> Video trên trang</div>
          <p class="text-xs text-slate-400 mb-3">Tải lên video mới hoặc chọn video thực tế trên xe.</p>
          <div id="sidebar-video-list"></div>
        </div>

        <div class="editor-group">
          <div class="editor-group-title"><i class="ph ph-image text-blue-400"></i> 5 Ảnh Tính Năng Nổi Bật</div>
          <p class="text-xs text-slate-400 mb-3">Bấm nút "Đổi" để thay ảnh mô tả tính năng.</p>
          <div id="sidebar-features-list"></div>
        </div>

        <div class="editor-group">
          <div class="editor-group-title"><i class="ph ph-chat-circle-text text-amber-400"></i> 6 Ảnh Đánh Giá Khách Hàng</div>
          <p class="text-xs text-slate-400 mb-3">Thay đổi ảnh chụp phản hồi khách và hóa đơn.</p>
          <div id="sidebar-feedbacks-list"></div>
        </div>
      </div>

      <!-- Tab 4: Section Visibility Toggles -->
      <div id="tab-sections" class="editor-tab-content" style="display:none;">
        <div class="editor-group">
          <div class="editor-group-title"><i class="ph ph-eye text-cyan-400"></i> Bật / Tắt Các Khối Trên Trang</div>
          <p class="text-xs text-slate-400 mb-4">Gạt công tắc để ẩn hoặc hiện bất kỳ phần nào trên trang landing page.</p>

          <div class="editor-switch-item">
            <span class="editor-switch-label">1. Thanh Flash Sale trên cùng</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-flashSale">
              <span class="editor-slider"></span>
            </label>
          </div>

          <div class="editor-switch-item">
            <span class="editor-switch-label">2. Khối Nỗi đau rèm cũ</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-pains">
              <span class="editor-slider"></span>
            </label>
          </div>

          <div class="editor-switch-item">
            <span class="editor-switch-label">3. Khối 5 Tính năng nổi bật</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-features">
              <span class="editor-slider"></span>
            </label>
          </div>

          <div class="editor-switch-item">
            <span class="editor-switch-label">4. Khối Video thực tế trên xe</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-videos">
              <span class="editor-slider"></span>
            </label>
          </div>

          <div class="editor-switch-item">
            <span class="editor-switch-label">5. Bảng so sánh với rèm thường</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-comparison">
              <span class="editor-slider"></span>
            </label>
          </div>

          <div class="editor-switch-item">
            <span class="editor-switch-label">6. Khối Dòng xe hỗ trợ</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-cars">
              <span class="editor-slider"></span>
            </label>
          </div>

          <div class="editor-switch-item">
            <span class="editor-switch-label">7. Khối 3 Bước lắp đặt</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-install">
              <span class="editor-slider"></span>
            </label>
          </div>

          <div class="editor-switch-item">
            <span class="editor-switch-label">8. Khối Bảng giá & Combo</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-pricing">
              <span class="editor-slider"></span>
            </label>
          </div>

          <div class="editor-switch-item">
            <span class="editor-switch-label">9. Khối Đánh giá khách hàng</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-feedback">
              <span class="editor-slider"></span>
            </label>
          </div>

          <div class="editor-switch-item">
            <span class="editor-switch-label">10. Khối Form đặt hàng</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-order">
              <span class="editor-slider"></span>
            </label>
          </div>

          <div class="editor-switch-item">
            <span class="editor-switch-label">11. Khối Câu hỏi thường gặp (FAQ)</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-faq">
              <span class="editor-slider"></span>
            </label>
          </div>

          <div class="editor-switch-item">
            <span class="editor-switch-label">12. Thông báo đơn hàng nhảy ngẫu nhiên</span>
            <label class="editor-switch">
              <input type="checkbox" id="sec-toast">
              <span class="editor-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Tab 5: Theme Colors -->
      <div id="tab-theme" class="editor-tab-content" style="display:none;">
        <div class="editor-group">
          <div class="editor-group-title"><i class="ph ph-palette text-amber-400"></i> Màu sắc giao diện</div>
          
          <div class="editor-field">
            <label class="editor-label">Màu chủ đạo (Primary Blue)</label>
            <div class="flex items-center gap-3">
              <input type="color" id="cfg-primaryColor" class="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none">
              <span id="cfg-primaryColor-val" class="text-xs font-mono text-slate-300">#2563EB</span>
            </div>
          </div>

          <div class="editor-field mt-4">
            <label class="editor-label">Màu điểm nhấn (Accent Gold)</label>
            <div class="flex items-center gap-3">
              <input type="color" id="cfg-accentColor" class="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none">
              <span id="cfg-accentColor-val" class="text-xs font-mono text-slate-300">#F59E0B</span>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-2">
          <p class="font-bold text-slate-300">Mẹo thiết kế ô tô:</p>
          <p>Màu xanh Electric Blue (#2563EB) phối cùng màu vàng kim (#F59E0B) mang lại cảm giác công nghệ cao và cao cấp cho phụ kiện xe hơi.</p>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="p-4 bg-[#111A2E] border-t border-slate-800 flex gap-2">
        <button id="sidebar-save-btn" class="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow">
          <i class="ph ph-floppy-disk text-base"></i>
          <span>Lưu Cấu Hình</span>
        </button>
        <button id="sidebar-reset-btn" class="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-red-300 font-semibold text-xs" title="Khôi phục mặc định">
          <i class="ph ph-arrow-counter-clockwise text-base"></i>
        </button>
      </div>
    `;
    document.body.appendChild(sidebar);

    // 4. Media Edit Modal Dialog
    const modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'editor-media-modal-backdrop';
    modalBackdrop.innerHTML = `
      <div class="editor-media-modal-card p-6">
        <div class="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-5">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center border border-blue-500/40">
              <i id="media-modal-icon" class="ph ph-image text-xl"></i>
            </div>
            <div>
              <h3 id="media-modal-title" class="font-extrabold text-base text-white">Thay Đổi Hình Ảnh / Video</h3>
              <span id="media-modal-subtitle" class="text-xs text-slate-400">Chọn tệp từ máy tính hoặc dán đường dẫn</span>
            </div>
          </div>
          <button id="media-modal-close-btn" type="button" class="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <i class="ph ph-x text-lg"></i>
          </button>
        </div>

        <!-- Live Preview Box -->
        <div class="mb-5">
          <label class="block text-xs font-bold text-slate-300 uppercase mb-2">Xem trước hiện tại:</label>
          <div id="media-modal-preview-box" class="rounded-xl overflow-hidden aspect-video bg-black flex items-center justify-center border border-slate-700 relative"></div>
        </div>

        <!-- Option 1: File Upload from Computer -->
        <div class="mb-4">
          <label class="block text-xs font-bold text-slate-300 uppercase mb-1.5">Cách 1: Tải tệp lên từ máy tính của bạn</label>
          <input type="file" id="media-modal-file-input" class="hidden" accept="image/*,video/*">
          <button type="button" id="media-modal-file-btn" class="w-full py-2.5 px-4 rounded-xl border border-dashed border-blue-500/60 bg-blue-950/30 hover:bg-blue-900/40 text-blue-300 font-bold text-xs flex items-center justify-center gap-2 transition-all">
            <i class="ph ph-upload-simple text-base"></i>
            <span id="media-modal-file-label">Bấm để chọn file ảnh hoặc video từ máy tính</span>
          </button>
        </div>

        <!-- Option 2: URL or Relative Path -->
        <div class="mb-4">
          <label class="block text-xs font-bold text-slate-300 uppercase mb-1.5">Cách 2: Nhập đường dẫn file hoặc link trực tiếp</label>
          <div class="flex items-center gap-2">
            <input type="text" id="media-modal-url-input" class="editor-input flex-1" placeholder="Ví dụ: assets/images/... hoặc https://...">
            <button type="button" id="media-modal-apply-url-btn" class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700">
              Xem thử
            </button>
          </div>
        </div>

        <!-- Option 3: Presets from Project Library -->
        <div class="mb-5">
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-bold text-slate-300 uppercase">Cách 3: Chọn nhanh từ thư viện có sẵn trong dự án</label>
            <span class="text-[11px] text-slate-400">Bấm để áp dụng</span>
          </div>
          <div id="media-modal-presets-grid" class="editor-preset-grid"></div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button type="button" id="media-modal-cancel-btn" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs">
            Hủy bỏ
          </button>
          <button type="button" id="media-modal-save-btn" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-500/30">
            <i class="ph ph-check-bold text-sm"></i>
            <span>Xác Nhận Thay Đổi</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);

    // Setup interactive inline media badges
    setupMediaEditingListeners();

    // Bind event listeners for UI controls
    bindEditorEvents();
    syncFormFields();
    renderMediaSidebar();
  }

  function openSidebar() {
    const sb = document.getElementById('editor-sidebar');
    const bd = document.getElementById('editor-drawer-backdrop');
    if (sb && bd) {
      sb.classList.add('active');
      bd.classList.add('active');
    }
  }

  function closeSidebar() {
    const sb = document.getElementById('editor-sidebar');
    const bd = document.getElementById('editor-drawer-backdrop');
    if (sb && bd) {
      sb.classList.remove('active');
      bd.classList.remove('active');
    }
  }

  // Populate inputs with current config
  function syncFormFields() {
    // Contact
    const bName = document.getElementById('cfg-brandName'); if (bName) bName.value = config.brandName;
    const bSub = document.getElementById('cfg-brandSub'); if (bSub) bSub.value = config.brandSub;
    const hl = document.getElementById('cfg-hotline'); if (hl) hl.value = config.hotline;
    const zl = document.getElementById('cfg-zalo'); if (zl) zl.value = config.zalo;
    const fs = document.getElementById('cfg-flashSaleText'); if (fs) fs.value = config.flashSaleText;

    // Pricing
    const fp = document.getElementById('cfg-frontPrice'); if (fp) fp.value = config.frontPrice;
    const fpo = document.getElementById('cfg-frontOldPrice'); if (fpo) fpo.value = config.frontOldPrice;
    const rp = document.getElementById('cfg-rearPrice'); if (rp) rp.value = config.rearPrice;
    const rpo = document.getElementById('cfg-rearOldPrice'); if (rpo) rpo.value = config.rearOldPrice;
    const fullP = document.getElementById('cfg-fullPrice'); if (fullP) fullP.value = config.fullPrice;
    const fullPo = document.getElementById('cfg-fullOldPrice'); if (fullPo) fullPo.value = config.fullOldPrice;

    // Sections
    for (const [key, val] of Object.entries(config.sections)) {
      const chk = document.getElementById('sec-' + key);
      if (chk) chk.checked = val;
    }

    // Colors
    const pColor = document.getElementById('cfg-primaryColor');
    const pColorVal = document.getElementById('cfg-primaryColor-val');
    if (pColor) { pColor.value = config.primaryColor; if (pColorVal) pColorVal.textContent = config.primaryColor; }

    const aColor = document.getElementById('cfg-accentColor');
    const aColorVal = document.getElementById('cfg-accentColor-val');
    if (aColor) { aColor.value = config.accentColor; if (aColorVal) aColorVal.textContent = config.accentColor; }
  }

  // Bind Event Listeners
  function bindEditorEvents() {
    // Top bar actions
    const openSbBtn = document.getElementById('open-sidebar-btn');
    if (openSbBtn) openSbBtn.addEventListener('click', openSidebar);

    const closeSbBtn = document.getElementById('close-sidebar-btn');
    if (closeSbBtn) closeSbBtn.addEventListener('click', closeSidebar);

    const bd = document.getElementById('editor-drawer-backdrop');
    if (bd) bd.addEventListener('click', closeSidebar);

    const exitBtn = document.getElementById('exit-editor-btn');
    if (exitBtn) exitBtn.addEventListener('click', () => setEditMode(false));

    const saveBtn = document.getElementById('save-config-btn');
    if (saveBtn) saveBtn.addEventListener('click', saveConfig);

    const sideSaveBtn = document.getElementById('sidebar-save-btn');
    if (sideSaveBtn) sideSaveBtn.addEventListener('click', saveConfig);

    const resetBtn = document.getElementById('sidebar-reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetConfig);

    const exportBtn = document.getElementById('export-html-btn');
    if (exportBtn) exportBtn.addEventListener('click', exportCleanHTML);

    // Desktop / Mobile preview switcher
    const pDesk = document.getElementById('preview-desktop-btn');
    const pMob = document.getElementById('preview-mobile-btn');

    if (pDesk && pMob) {
      pDesk.addEventListener('click', () => {
        isMobilePreview = false;
        document.body.classList.remove('preview-mobile-device');
        pDesk.classList.add('bg-blue-600', 'text-white');
        pDesk.classList.remove('text-slate-400');
        pMob.classList.remove('bg-blue-600', 'text-white');
        pMob.classList.add('text-slate-400');
      });

      pMob.addEventListener('click', () => {
        isMobilePreview = true;
        document.body.classList.add('preview-mobile-device');
        pMob.classList.add('bg-blue-600', 'text-white');
        pMob.classList.remove('text-slate-400');
        pDesk.classList.remove('bg-blue-600', 'text-white');
        pDesk.classList.add('text-slate-400');
      });
    }

    // Tab buttons switching
    document.querySelectorAll('.editor-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.editor-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.dataset.tab;
        document.querySelectorAll('.editor-tab-content').forEach(panel => {
          panel.style.display = panel.id === targetId ? 'block' : 'none';
        });
      });
    });

    // Real-time input listeners
    function bindInput(id, configProp) {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          config[configProp] = e.target.value;
          applyConfigToDOM();
        });
      }
    }

    bindInput('cfg-brandName', 'brandName');
    bindInput('cfg-brandSub', 'brandSub');
    bindInput('cfg-hotline', 'hotline');
    bindInput('cfg-zalo', 'zalo');
    bindInput('cfg-flashSaleText', 'flashSaleText');
    bindInput('cfg-frontPrice', 'frontPrice');
    bindInput('cfg-frontOldPrice', 'frontOldPrice');
    bindInput('cfg-rearPrice', 'rearPrice');
    bindInput('cfg-rearOldPrice', 'rearOldPrice');
    bindInput('cfg-fullPrice', 'fullPrice');
    bindInput('cfg-fullOldPrice', 'fullOldPrice');

    // Section toggles
    for (const key of Object.keys(config.sections)) {
      const chk = document.getElementById('sec-' + key);
      if (chk) {
        chk.addEventListener('change', (e) => {
          config.sections[key] = e.target.checked;
          applyConfigToDOM();
        });
      }
    }

    // Color pickers
    const pColor = document.getElementById('cfg-primaryColor');
    const pColorVal = document.getElementById('cfg-primaryColor-val');
    if (pColor) {
      pColor.addEventListener('input', (e) => {
        config.primaryColor = e.target.value;
        if (pColorVal) pColorVal.textContent = e.target.value;
        applyConfigToDOM();
      });
    }

    const aColor = document.getElementById('cfg-accentColor');
    const aColorVal = document.getElementById('cfg-accentColor-val');
    if (aColor) {
      aColor.addEventListener('input', (e) => {
        config.accentColor = e.target.value;
        if (aColorVal) aColorVal.textContent = e.target.value;
        applyConfigToDOM();
      });
    }

    // Media Modal Event Listeners
    const modalCloseBtn = document.getElementById('media-modal-close-btn');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeMediaModal);

    const modalCancelBtn = document.getElementById('media-modal-cancel-btn');
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeMediaModal);

    const modalSaveBtn = document.getElementById('media-modal-save-btn');
    if (modalSaveBtn) modalSaveBtn.addEventListener('click', saveMediaModal);

    // Modal File Input Upload
    const fileTriggerBtn = document.getElementById('media-modal-file-btn');
    const fileInput = document.getElementById('media-modal-file-input');
    if (fileTriggerBtn && fileInput) {
      fileTriggerBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const resultSrc = event.target.result;
          currentEditingMedia.tempSrc = resultSrc;
          
          const urlInput = document.getElementById('media-modal-url-input');
          if (urlInput) urlInput.value = resultSrc.startsWith('data:') ? `[Tệp máy tính: ${file.name}]` : resultSrc;
          
          const fileLabel = document.getElementById('media-modal-file-label');
          if (fileLabel) fileLabel.textContent = `✓ Đã chọn: ${file.name}`;

          updateModalPreview(resultSrc, currentEditingMedia.type);
        };
        reader.readAsDataURL(file);
      });
    }

    // Modal URL input
    const applyUrlBtn = document.getElementById('media-modal-apply-url-btn');
    const urlInput = document.getElementById('media-modal-url-input');
    if (applyUrlBtn && urlInput) {
      applyUrlBtn.addEventListener('click', () => {
        const val = urlInput.value.trim();
        if (val) {
          currentEditingMedia.tempSrc = val;
          updateModalPreview(val, currentEditingMedia.type);
        }
      });
      urlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyUrlBtn.click();
        }
      });
    }

    // Keyboard shortcut: Ctrl + Shift + E to toggle editor
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setEditMode(!isEditing);
      }
    });
  }

  // Export clean HTML directly to file
  function exportCleanHTML() {
    // Clone document
    const clone = document.documentElement.cloneNode(true);

    // Remove editor active styles and elements from export
    clone.classList.remove('editor-mode-active', 'preview-mobile-device');
    const bodyClone = clone.querySelector('body');
    if (bodyClone) {
      bodyClone.classList.remove('editor-mode-active', 'preview-mobile-device');
      bodyClone.style.paddingTop = '';
    }

    // Remove contenteditable attributes
    clone.querySelectorAll('[contenteditable]').forEach(el => {
      el.removeAttribute('contenteditable');
    });

    // Remove temporary editor elements
    const elementsToRemove = [
      '#editor-top-bar',
      '#editor-drawer-backdrop',
      '#editor-sidebar',
      '#editor-feedback-toast',
      '#editor-trigger-btn',
      '#editor-media-modal-backdrop'
    ];
    elementsToRemove.forEach(sel => {
      const el = clone.querySelector(sel);
      if (el) el.remove();
    });

    // Remove all media badges
    clone.querySelectorAll('.editor-media-badge').forEach(el => el.remove());

    // Serialize clean HTML
    let htmlContent = '<!DOCTYPE html>\n' + clone.outerHTML;

    // Create Download Blob
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Đã tải xuống file index.html mới thành công!');
  }

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    applyConfigToDOM();
    injectEditorUI();
    setupInlineEditingListeners();

    // Check URL param ?edit=1 or ?edit=true
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('edit') === '1' || urlParams.get('edit') === 'true') {
      setTimeout(() => setEditMode(true), 300);
    }
  });

})();
