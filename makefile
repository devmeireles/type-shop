load-createAccount:
	aws sqs --endpoint-url=http://localhost:4566 receive-message --queue-url http://localhost:4566/000000000000/createAccount

urls-createAccount:
	aws sqs --endpoint-url=http://localhost:4566 get-queue-url --queue-name createAccount

purge-createAccount:
	aws sqs --endpoint-url=http://localhost:4566 purge-queue --queue-url http://localhost:4566/000000000000/createAccount

# Creating
    # aws sqs --endpoint-url=http://localhost:4566 send-message --queue-url http://localhost:4566/000000000000/createAccount --message-body "test: true"

# aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name createAccount


#➜  backoffice-seller-api git:(s3-implementation) ✗ aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket seller --region us-east-1                              

#➜  backoffice-seller-api git:(s3-implementation) ✗ aws --endpoint-url=http://localhost:4566 s3api put-bucket-acl --bucket seller --acl public-read                               
