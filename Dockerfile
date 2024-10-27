# 1단계: 빌드 환경
FROM node:18 AS builder
WORKDIR /app

# package.json과 package-lock.json을 복사하고 패키지를 설치합니다.
COPY package.json package-lock.json ./
RUN npm install

# 나머지 소스 파일을 복사합니다.
COPY . .

# Next.js 앱을 빌드합니다.
RUN npm run build

# 2단계: 실행 환경
FROM node:18-alpine
WORKDIR /app

# 빌드 결과물만 복사하여 컨테이너의 크기를 최적화합니다.
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 포트 설정
EXPOSE 3000

# 앱을 시작합니다.
CMD ["npm", "run", "start"]
