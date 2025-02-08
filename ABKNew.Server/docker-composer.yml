version: '3.8'

services:
  api:
    image: prarthnachauhan/abk-api:latest  # Replace with your actual image
    container_name: abk-api
    restart: always
    depends_on:
      - db
    environment:
      - ConnectionStrings__DefaultConnection=Server=db;Database=ABK;User=sa;Password=abk@123;
    ports:
      - "5000:5000"
    networks:
      - app-network

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: sql-server
    restart: always
    environment:
      SA_PASSWORD: "abk@123"
      ACCEPT_EULA: "Y"
    ports:
      - "1433:1433"
    networks:
      - app-network
    volumes:
      - sql-data:/var/opt/mssql

networks:
  app-network:

volumes:
  sql-data:
