#!/bin/bash

# This script invalidates CDN retriving by the given tag name

set -euo pipefail

# Variables from pipeline
cloudfront_id=$1

# TODO:

# 1. invalidate /* for the given cdn if (https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-invalidation.html)
# e.g. aws create-invalidation --distribution-id $cloudfront_id --paths "/*"

