FROM node:8.11.3-stretch
COPY stockServer /src
ADD start.sh /start.sh
RUN chmod 755 /start.sh
EXPOSE 5000
CMD ["/start.sh"]
