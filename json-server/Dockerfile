# Dùng node image nhẹ
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Cài đặt json-server toàn cục
RUN npm install -g json-server

# Copy file db.json vào container
COPY db.json /app/db.json

# Expose port 4000 (hoặc tuỳ bạn)
EXPOSE 4003

# Lệnh chạy
CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "4003"]
