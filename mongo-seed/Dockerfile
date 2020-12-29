FROM mongo
COPY user.json /user.json

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && mongoimport --host mongo \
                         --db dms-development \
                         --collection users \
                         --file user.json \
