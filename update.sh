#!/bin/bash

source .env

while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        --commit-message)
          COMMIT_MESSAGE="$2"
          shift
          shift
          ;;
        --version)
          VERSION="$2"
          shift
          shift
          ;;
        *)
          echo "Unknown option: $key"
          exit 1
          ;;
    esac
done

print_status() {
    echo "$(date +"%Y-%m-%d %T"): $1"
}

if [ -z "$COMMIT_MESSAGE" ]; then
    print_status "Commit message is required."
    exit 1
fi

if [ -z "$VERSION" ]; then
    print_status "version number is required."
    exit 1
fi

# Change directory to project directory
print_status "Changing directory to project directory ..."
cd "$PROJECT_DIRECTORY" || { print_status "Changing directory failed."; exit 1; }

# npm build
print_status "Running npm build ..."
npm run build >> /tmp/maven_clean_output.txt || { print_status "Maven clean failed."; exit 1; }


# Building docker image
print_status "Building $DOCKER_IMAGE_NAME:$VERSION ..."
docker build -t "$DOCKER_IMAGE_NAME:$VERSION" . >> /tmp/docker_build_output.txt || { print_status "Docker build failed."; exit 1; }

# Pushing docker image
print_status "Pushing $DOCKER_IMAGE_NAME:$VERSION ..."
docker push "$DOCKER_IMAGE_NAME:$VERSION" >> /tmp/docker_push_output.txt || { print_status "Docker push failed."; exit 1; }

# Tagging docker image as latest
print_status "Tagging docker image as latest ..."
docker tag "$DOCKER_IMAGE_NAME:$VERSION" "$DOCKER_IMAGE_NAME:latest" >> /tmp/docker_push_output.txt || { print_status "Docker tag failed."; exit 1; }

# Pushing docker image (latest)
print_status "Pushing $DOCKER_IMAGE_NAME:latest ..."
docker push "$DOCKER_IMAGE_NAME:latest" >> /tmp/docker_push_output.txt || { print_status "Docker push failed."; exit 1; }

# Add changes
print_status "Adding git changes ..."
git add . || { print_status "Git add failed."; exit 1; }

print_status "Committing git changes with message: $COMMIT_MESSAGE"
git commit -m "$COMMIT_MESSAGE" >> /tmp/git_commit_output.txt || { print_status "Git commit failed."; exit 1; }

# Push changes
print_status "Pushing git changes..."
git push >> /tmp/git_push_output.txt 2>&1 || { print_status "Git push failed."; exit 1; }

# SSH to remote server and run specific bash file
print_status "SSH to remote server and bash script ..."
ssh "$SSH_USERNAME@$SSH_HOST" "$SSH_COMMAND" >> /tmp/ssh_bash_output.txt || { print_status "SSH connection to remote server failed."; exit 1; }

print_status "Deployment completed successfully."
exit 0;