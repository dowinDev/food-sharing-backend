# Sử dụng image Node.js làm base
FROM node:16

LABEL authors="DOWIN"

# Set thư mục làm việc bên trong container
WORKDIR /src

# Copy file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependency
RUN npm install

RUN npm install -g @nestjs/cli

# Copy toàn bộ source code vào container
COPY . .

# Build ứng dụng NestJS (nếu dự án đang ở chế độ production)
RUN npm run build

# Expose cổng mà NestJS lắng nghe
EXPOSE 3000

# Lệnh khởi động ứng dụng
CMD ["npm", "run", "start"]
