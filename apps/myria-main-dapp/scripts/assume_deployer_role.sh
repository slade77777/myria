#!/bin/bash

# This script assumes the correct deployer role and writes to a default profile.
# Please add below 2 lines before any aws cli commands.
# unset AWS_ACCESS_KEY_ID
# unset AWS_SECRET_ACCESS_KEY

set -euo pipefail

# Variables from pipeline
account_name=$1
account_id=0

# Map aws account id
case $account_name in
  myria-sandbox)
    account_id=367745696482
    ;;

  myria-net-nonprod)
    account_id=423125429807
    ;;

  myria-net-prod)
    account_id=233573962028
    ;;

  *)
    exit 1
    ;;
esac

echo "Account Name is : $account_name, and Account Number is $account_id";

echo "Assuming Deployer role - arn:aws:iam::$account_id:role/DeployerRole"

ROLE_ARN="arn:aws:iam::$account_id:role/DeployerRole"

CREDENTIALS=$(aws sts assume-role --role-arn ${ROLE_ARN} --role-session-name "ServerlessDeployment")

AWS_ACCESS_KEY_ID=$(echo $CREDENTIALS | jq -r .Credentials.AccessKeyId)
AWS_SECRET_ACCESS_KEY=$(echo $CREDENTIALS | jq -r .Credentials.SecretAccessKey)
AWS_SESSION_TOKEN=$(echo $CREDENTIALS | jq -r .Credentials.SessionToken)

# Create AWS profile 
mkdir ~/.aws
touch ~/.aws/credentials
cat << EOF > ~/.aws/credentials
[default]
aws_access_key_id = $AWS_ACCESS_KEY_ID
aws_secret_access_key = $AWS_SECRET_ACCESS_KEY
aws_session_token = $AWS_SESSION_TOKEN
EOF

echo "Assumed Deployer role - arn:aws:iam::$account_id:role/DeployerRole"
