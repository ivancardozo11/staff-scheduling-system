FROM node:14

WORKDIR C:/JS/Invygo/staff-scheduling-system


COPY . .


RUN npm install


EXPOSE 8080 3306

CMD ["npm", "run", "start:dev"]