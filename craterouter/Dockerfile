FROM dockerfile/nodejs
ADD app.js /data/app.js
ADD package.json /data/package.json
RUN npm install
EXPOSE 3000
CMD ["node","app.js"]