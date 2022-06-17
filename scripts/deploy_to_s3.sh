#!/bin/bash

# This script deteles the existing content in the assigned s3 bucket.
# and deploys the built code to assigned s3 bucket.

set -euo pipefail

# Unset AWS env vars from pipeline and use default profile
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY

# Variables from pipeline
bucket_name=$1
artifacts_folder=$2

aws s3 sync --acl public-read  --delete $artifacts_folder s3://$bucket_name

cloudfront_id=$(aws cloudfront list-distributions --query "DistributionList.Items[*].{id:Id,origin:Origins.Items[0].Id}[?origin==$bucket_name].id" --output text)

aws cloudfront create-invalidation --distribution-id $cloudfront_id --paths '/*'

echo "Deploy to S3 && cloudfront invalidate done."
