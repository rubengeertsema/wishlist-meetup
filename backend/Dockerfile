FROM java:8-alpine
MAINTAINER Ruben Geertsema

# Create a directory where our app will live
RUN mkdir -p /app

# Change working directory
WORKDIR /app

# Add app to working dir
ADD target/wish*.jar /app/app.jar

# Expose port
EXPOSE 8080

# Container startup command
CMD ["java", "-jar", "app.jar"]