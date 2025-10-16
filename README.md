# 🛍️ MobileShop – E-commerce Frontend (Next.js + Redux Toolkit + JSON Server)

## 🚀 Giới thiệu

**MobileShop** là một ứng dụng thương mại điện tử mô phỏng, xây dựng bằng **Next.js (App Router)** kết hợp với **Redux Toolkit** để quản lý trạng thái toàn cục, và **JSON Server** làm API giả lập phía backend.

Dự án được thiết kế nhằm mô phỏng luồng người dùng cơ bản: **đăng nhập, xem sản phẩm, thêm giỏ hàng, và thanh toán.**

---

## 🧩 Công nghệ sử dụng

| Thành phần           | Công nghệ                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Frontend**         | [Next.js 14](https://nextjs.org/) (App Router, TypeScript)                                                        |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) + AsyncThunk                                                       |
| **UI Library**       | [shadcn/ui](https://ui.shadcn.com/), [TailwindCSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/) |
| **Mock API**         | [JSON Server](https://github.com/typicode/json-server)                                                            |
| **Docker Support**   | Có (docker-compose cho Next.js + JSON Server)                                                                     |

---

## ⚙️ Chức năng chính

### 👤 Xác thực người dùng

- Đăng nhập / Đăng xuất bằng email & password (mock từ JSON Server)
- Lưu thông tin người dùng vào `localStorage` và Redux store

### 🛒 Giỏ hàng

- Hỗ trợ **local cart** cho user chưa đăng nhập
- Khi user login → **tự động merge local cart vào server cart**
- Tính tổng tiền, xoá sản phẩm, cập nhật số lượng

### 📱 Sản phẩm

- Danh sách sản phẩm (fetch từ `/products`)
- Phân trang
- Tìm kiếm sản phẩm theo tên
- Lọc sản phẩm theo giá, đánh giá
- Xem chi tiết sản phẩm, thêm vào giỏ

### 📱 Chi tiết sản phẩm

- Chi tiết sản phẩm, thêm vào giỏ
- Responsive giao diện

### 👤 Quản lý thông tin cá nhân

- Hiển thị thông tin
- Cập nhật thông tin

---

## 🧰 Cách chạy dự án

### 1️⃣ Cài đặt

Clone dự án

```bash
git clone https://github.com/ducpici/mobile-shop.git
cd mobile-shop
```

Tạo file .env.local trong thư mục front-end với nội dung

```bash
NEXT_PUBLIC_API_URL=http://localhost:4003
```

### 2️⃣ Cài dependencies

```bash
cd front-end
npm install
npm run dev
```

### 3️⃣ Chạy JSON Server

```bash
cd ../json-server
npm install
npm start
```

### 3️⃣🐳 Chạy bằng Docker (tùy chọn)

```bash
docker-compose up -d --build
```

Sau khi build thành công:

- Next.js app: http://localhost:4000
- JSON Server API: http://localhost:4003

---

## 🌐 Triển khai (Deployment)

Dự án đã được deploy và có thể truy cập trực tiếp tại:

- **Frontend (Next.js App)**: [https://mobileshop.westore.site](https://mobileshop.westore.site)
- **Mock API (JSON Server)**: [https://jsonserver.westore.site](https://jsonserver.westore.site)
