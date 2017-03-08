FROM mhart/alpine-node:6
WORKDIR /src
COPY server .
COPY build ./build
EXPOSE 3000
CMD ["node", "index.js"]
