# SOSO AUTO Smart Car Sunshades Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

Building a high-converting, mobile-first, direct-response landing page for **SOSO. AUTO** (Rèm che nắng ô tô tự động thông minh) in `d:\Landing page`. Designed using **marketingskills** (CRO, direct-response copywriting, offer architecture) and **ui-ux-pro-max-skill** (automotive dark-accent design, fluid typography, touch targets, accessibility).

---

## Architecture & Asset Selection

```
d:\Landing page\
├── index.html                   # Core semantic landing page
├── assets\
│   ├── css\style.css            # Custom enhancements, animations & utilities
│   ├── js\app.js                # Interactivity: car filter, pricing switcher, order form, floating CTA
│   ├── videos\                  # Curated lightweight demonstration clips (< 5MB)
│   │   ├── demo-auto.mp4        # Automatic sync with glass
│   │   └── demo-cross.mp4       # Real car demonstration
│   └── images\                  # Curated product, comparison, fitment & feedback images
│       ├── hero-banner.jpg
│       ├── uv-blocking.jpg
│       ├── comparison-vs-traditional.jpg
│       ├── car-fitment-grid\
│       ├── tapli-solution.jpg
│       ├── install-steps\
│       └── feedback\
```

---

## Tasks

- [ ] **Task 1: Curation & Copying of Media Assets**
  - Extract and copy the highest impact photos and demo videos from `D:\Shopee\rèm che nắng` to `d:\Landing page\assets\`.
  - Copy hero visuals, mechanism visuals, UV test, comparison images, tapli curve solution photos, feedback screenshots, and demo MP4s.

- [ ] **Task 2: Build Landing Page Structure & Marketing Copy (`index.html`)**
  - **Top Announcement Bar**: Flash sale banner, free shipping countdown.
  - **Header / Navigation**: Brand logo SOSO. AUTO, Hotline `0967.103.928`, quick anchor links.
  - **Hero Section (CRO Above-the-Fold)**:
    - Headline: *Rèm Che Nắng Ô Tô Thông Minh SOSO. AUTO – Tự Động Nâng Hạ Đồng Bộ Theo Kính*.
    - Subhead: Cản 95% tia UV, may đo chuẩn form từng dòng xe, lắp đặt zin 10 phút tại nhà.
    - Quick trust badges: Freeship toàn quốc, Không cần cọc, Kiểm tra hàng trước khi thanh toán.
    - Hero Video/Image with floating social proof tag (*Đã bán 3.800+ bộ*).
  - **Pain Agitation Section**:
    - Nỗi ám ảnh của rèm nam châm & rèm hít truyền thống (rơi rụng khi hạ kính, che khuất gương chiếu hậu, lọt sáng).
  - **Core Features Showcase**:
    - 1. Nâng hạ tự động mượt mà.
    - 2. Chuẩn form từng milimet (có giải pháp tapli cong độc quyền).
    - 3. Lưới tổ ong nano cản UV 95%, giảm nhiệt 5-8°C.
    - 4. Góc vát thông minh không che gương hậu.
    - 5. Giữ kín đáo riêng tư tuyệt đối.
  - **Interactive Demonstration (Video & Real Clips)**.
  - **Interactive Supported Car Models Filter**:
    - Tabs: Toyota, Mazda, Honda, Hyundai, Kia, VinFast, Ford, Mitsubishi...
  - **Comparison Matrix (SOSO. AUTO vs Rèm thông thường)**.
  - **Easy 3-Step Installation Guide** (vệ sinh bệ cửa, dán keo 3M & kẹp ngàm, sử dụng sau 24h).
  - **Pricing & Exclusive Offers Section**:
    - Gói Cặp trước: 629.000đ
    - Gói Cặp sau: 669.000đ
    - Gói COMBO FULL 4 RÈM (Bán chạy nhất): 1.220.000đ (Tặng trọn bộ phụ kiện + Miễn phí vận chuyển + Giảm 10% bộ thứ 2).
  - **Real Customer Reviews & Feedback Carousel/Grid**.
  - **High-Converting Order Form**:
    - Tên, SĐT, Địa chỉ, Hãng xe & Đời xe, Chọn gói rèm.
    - Nút gửi đơn hàng với hiệu ứng loading và modal xác nhận.
  - **FAQ Section**: Giải đáp các thắc mắc phổ biến (có làm xước kính không, xe kính cong có dính chắc không, bảo hành bao lâu).
  - **Footer & Floating Action Buttons**:
    - Nút gọi nhanh `tel:0967103928`
    - Nút Zalo `https://zalo.me/0967103928`
    - Sticky bottom bar trên mobile.

- [ ] **Task 3: Modern UI/UX Styling & Animations (`assets/css/style.css`)**
  - Color palette: Automotive sleek dark `#0B0F19`, slate cards `#151E2E`, accents electric blue `#2563EB` & amber gold `#F59E0B`.
  - Micro-animations: Pulse button glow, smooth scrolling, badge sheen effect, responsive container padding.

- [ ] **Task 4: Interactive Client Logic (`assets/js/app.js`)**
  - Countdown timer (24h reset loop).
  - Car brand tabs filter.
  - Combo pricing selector that syncs with the order form.
  - Form validation with friendly feedback modal.
  - Floating mobile bar visibility controls.

- [ ] **Task 5: Verification & Quality Assurance**
  - Check local image/video asset paths.
  - Test responsiveness on mobile (< 480px), tablet (768px), and desktop (1280px).
  - Verify all CTA buttons, phone call links, and Zalo links.
