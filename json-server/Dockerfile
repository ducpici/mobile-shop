# Dùng node bản nhẹ
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Cài đặt json-server toàn cục
RUN npm install -g json-server

# Copy file mẫu (nếu mount thì file này sẽ bị ghi đè — không sao)
COPY db.json /app/db.json

# Đảm bảo quyền ghi để tránh lỗi permission denied
RUN chmod 666 /app/db.json || true

# Expose port 4003
EXPOSE 4003

# Dùng lệnh shell để chờ file sẵn sàng trước khi chạy server
CMD sh -c "echo 'Starting JSON Server...' && \
           [ -f db.json ] || echo '{\"products\":[]}' > db.json && \
           json-server --watch db.json --host 0.0.0.0 --port 4003"
