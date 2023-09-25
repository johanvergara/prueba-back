FROM node:18
WORKDIR /clientes-test/src/
COPY package.json /clientes-test/package.json
COPY tsconfig.build.json ./
COPY tsconfig.json ./
RUN npm install -g @nestjs/cli
RUN npm install
RUN nest build
ADD . /clientes-test/src/
COPY . .

EXPOSE 3000
CMD [ "yarn", "run", "start"]
