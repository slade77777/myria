#!/bin/bash

# This script deteles the existing content in the assigned s3 bucket.
# and deploys the built code to assigned s3 bucket.

set -euo pipefail

# Variables from pipeline
bucket_name=$1
artifacts_folder=$2

# TODO:

# 1. delete existing contents in s3
# e.g. aws s3 rm "s3://$bucket_name" --recursive

# 2. upload folder to s3
# e.g. aws s3 sync $artifacts_folder "s3://$bucket_name"
aws ls

aws s3 sync --acl public-read  --delete $artifacts_folder s3://$bucket_name

cloudfront_id = aws cloudfront list-distributions --query "DistributionList.Items[*].{id:Id,origin:Origins.Items[0].Id}[?origin==$bucket_name].id" --output text

aws cloudfront create-invalidation --distribution-id $cloudfront_id --paths '/*'
